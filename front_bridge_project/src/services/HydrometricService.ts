import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HydrometricStationsService {
  private baseUrl = 'https://hubeau.eaufrance.fr/api/v1/hydrometrie';

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
}
