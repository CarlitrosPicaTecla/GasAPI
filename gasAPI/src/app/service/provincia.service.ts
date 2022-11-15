import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Municipio } from '../interfaces/municipios.interface';
import { Provincia } from '../interfaces/provincia.interface';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor(private http: HttpClient) { }


  public getProvincias():Observable<Provincia[]>{
    return this.http.get<Provincia[]>(`${environment.apiProv}`);
  }

  public getMunicipios(id : number):Observable<Municipio[]>{
    return this.http.get<Municipio[]>(`${environment.apiMun}/${id}`);
  }

}
