import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class BridgesService {

  constructor(private http: HttpClient) {}

  getBridges(): Observable<any> {
    return this.http.get(environment.bridgesApi);
  }
}
