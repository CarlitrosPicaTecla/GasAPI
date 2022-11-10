import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GasStation, GasStationResponse } from '../interfaces/gas-station.interface';

@Injectable({
  providedIn: 'root'
})
export class GasStationsServiceService {

  constructor(private http: HttpClient) { }

  public getGasStations(): Observable<GasStationResponse>{

   return this.http.get<GasStationResponse>(`${environment.apiBase}`);
  }

  
}
