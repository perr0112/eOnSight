import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { HydrometricStationsService } from '../../services/HydrometricService';
import { Chart, registerables } from 'chart.js';
import { formatDate } from '../../utils/date';

@Component({
  selector: 'app-hydrometric-graph',
  templateUrl: './hydrometric-graph.component.html',
  styleUrls: ['./hydrometric-graph.component.scss'],
  imports: [CommonModule],
})
export class HydrometricGraphComponent implements OnChanges {
  constructor(private hydrometricStationsService: HydrometricStationsService) {
    Chart.register(...registerables);
  }

  // @Input() selectedItem: TypeItem | null = null;
  @Input() selectedItem: any;
  chart: any;
  isModalOpen = false;

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['selectedItem']) {
  //     console.log('selectedItem - graph ====', this.selectedItem);

  //     if (this.selectedItem) {
  //       this.loadGraph();
  //     }
  //   }
  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedItem'] && changes['selectedItem'].currentValue !== changes['selectedItem'].previousValue) {
      console.log('------- station sélectionnée : ', this.selectedItem);
      if (this.selectedItem) {
        this.loadGraph();
      }
    }
  }

  openModal(): void {
    this.isModalOpen = true;
    setTimeout(() => this.loadGraph(), 0);
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  loadGraph(): void {
    console.log('loadGraph');
    const startDate = new Date();

    const date_debut_obs = startDate.toISOString().split('T')[0];

    this.hydrometricStationsService.getObservationsForStation(this.selectedItem.codeStation, date_debut_obs).subscribe(
      (response) => {
        console.log('data', response);
        this.createGraph(response.data);
      },
      (error) => {
        console.error('error', error);
      }
    );
  }

  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef;

  private createGraph(data: any): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    const res = data.slice(0, 100);

    const labels = res.map((obs: any) => obs.date_obs);
    const values = res.map((obs: any) => obs.resultat_obs);
  
    console.log(labels, values);

    const ctx = document.getElementById('hydrometricChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Niveau d’eau',
            data: values,
            borderColor: 'blue',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date et heure',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Niveau d’eau',
            },
          },
        },
      },
    });
  }
}
