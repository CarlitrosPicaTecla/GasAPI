import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GasStation } from '../interfaces/gas-station.interface';

@Injectable({
  providedIn: 'root'
})
export class GasStationsServiceService {

  constructor(private http: HttpClient) { }

  public getGasStations(): Observable<GasStation>{

   return this.http.get<GasStation>(`${environment.apiBase}`);
  }

  
}
