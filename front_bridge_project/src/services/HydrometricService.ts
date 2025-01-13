import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class HydrometricStationsService {
  private baseUrl = environment.hubeauApi;

  constructor(private http: HttpClient) {}

    getAllStations(bbox: string, inService: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/referentiel/stations?`, {
        params: {
          // code_region: '06',
          code_departement: '06',
          bbox,
          format: 'json',
          size: '20',
          en_service: inService.toString(),
        },
      });
    }

    getObservationsForStation(codeStation: string, date_debut_obs: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/observations_tr?`, {
        params: {
          code_station: codeStation,
          date_debut_obs,
          format: 'json',
        },
      });
    }
}
