import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import * as L from 'leaflet';

import * as wellknown from 'wellknown';

import { BridgesService } from '../../services/BridgesService';
import { HydrometricStationsService } from '../../services/HydrometricService';
import { CommonModule, DatePipe } from '@angular/common';
import TypeItem from '../../types/TypeItem';
import { capitalizeWord } from '../../utils/string';

@Component({
  selector: 'app-leaflet-map',
  imports: [CommonModule],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
})
export class LeafletMapComponent implements OnInit {
  httpClient = inject(HttpClient);
  private map!: any;
  selectedItem: TypeItem | null = null;
  hideNonOperational = false;

  private markers: L.Marker[] = [];

  constructor(
    private hydrometricStationsService: HydrometricStationsService,
    private bridgesService: BridgesService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.initMap();
    this.loadBridges();

    this.map.whenReady(() => {
      // northEast, southWest => {lat, lng}
      console.log('Map bounds:', this.map.getBounds());
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [43.7, 7.3],
      zoom: 10,
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    this.map.on('moveend', () => {
      const bounds = this.map.getBounds();
      // const bbox = `${bounds.getWest()};${bounds.getSouth()};${bounds.getEast()};${bounds.getNorth()}`;
      const bbox = `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;

      console.log('bbox', bbox);
      this.loadHydrometricStations(bbox);
    });

    // loading properly the map
    setTimeout(() => {
      this.map.invalidateSize();
    }, 800);
  }

  private loadHydrometricStations(bbox: string): void {

    const inService = this.hideNonOperational ? 0 : 1;

    if (this.markers.length > 0) {
      this.markers.forEach((marker) => {
        this.map.removeLayer(marker);
      });
      this.markers = [];
    }

    this.hydrometricStationsService.getAllStations(bbox, inService).subscribe((data) => {
      // console.log('dt', data);
      data['data'].forEach((station: any) => {
        console.log('s', station);
        const [longitude, latitude] = station.geometry.coordinates;

        const marker = L.marker([latitude, longitude], {
          icon: L.icon({
            iconUrl:
              station.en_service ? './icons/station-icon.png' : './icons/station-non-operational.png',
            iconSize: [30, 40],
            iconAnchor: [12, 40],
          }),
        });

        marker.on('click', () => {
          console.log('Station clicked:', station);
          this.selectedItem = {
            name: station.libelle_site,
            type: 'station',
            latitude,
            longitude,
            dateOuverture: station.date_ouverture_station,
            commune: station.libelle_commune,
            isOperational: station.en_service,
          };

          console.log('Selected item:', this.selectedItem);
        });

        marker.addTo(this.map);

        this.markers.push(marker);
      });
    });
  }

  private loadBridges(): void {
    this.bridgesService.getBridges().subscribe((data) => {
      console.log(data);

      data.features.forEach((bridge: any) => {
        console.log('bridge', bridge);

        const geometry = bridge.geometry;
        const wkt = geometry.split(';')[1];

        const parsedCoord = wellknown.parse(wkt);

        if (parsedCoord && parsedCoord.type === 'Point') {
          const coordinates = parsedCoord.coordinates;
          console.log('Coordinates:', coordinates);

          const marker = L.marker([coordinates[1], coordinates[0]], {
            icon: L.icon({
              iconUrl: './icons/bridge-icon.png',
              iconSize: [30, 40],
              iconAnchor: [12, 40],
            }),
          });

          marker.on('click', () => {
            this.selectedItem = {
              name: bridge.properties.name,
              type: 'bridge',
              latitude: coordinates[1],
              longitude: coordinates[0],
            };

            console.log('Selected item:', this.selectedItem);
          });

          marker.addTo(this.map);
        } else {
          console.warn('Géométrie invalide ou coords absentes', parsedCoord);
        }
      });
    });
  }

  closeSidebar(): void {
    this.selectedItem = null;
  }

  get formattedCommune() {
    if (!this.selectedItem || this.selectedItem.type !== 'station') return null;
    return capitalizeWord(this.selectedItem?.commune || '');
  }

  toggleStations(): void {
    this.selectedItem = null;
    this.hideNonOperational = !this.hideNonOperational;
    
    setTimeout(() => {
      this.loadHydrometricStations(this.map.getBounds().toBBoxString());
    }, 200);
  }  
}
