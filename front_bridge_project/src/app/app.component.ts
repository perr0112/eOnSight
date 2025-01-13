import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SvgShapeComponent } from './svg-shape/svg-shape.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SvgShapeComponent,
    LeafletMapComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = "Hydrometrica";
  purpose = "Visualisez et analysez les données hydrométriques de notre région!";
  region = "Alpes-Maritimes (06)";
}
