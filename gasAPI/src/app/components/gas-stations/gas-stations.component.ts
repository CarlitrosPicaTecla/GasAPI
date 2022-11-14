import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { map, catchError, of, Observable } from 'rxjs';
import { GasStation, GasStationResponse } from 'src/app/interfaces/gas-station.interface';
import { GasStationsServiceService } from 'src/app/service/gas-stations-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gas-stations',
  templateUrl: './gas-stations.component.html',
  styleUrls: ['./gas-stations.component.css']
})
export class GasStationsComponent implements OnInit {

  valor : number = 3;

  selected : string[]=["Todos","Gasolina 95","Diesel","Hidrogeno"];

  provincias : string[]=["Sevilla","Cádiz","Huelva","Jaen","Granada","Cordoba","Almeria","Malaga"];




  select : string="Todos";


 // const result = this.valor.filter(word => word.length > 6);

  gasStationsList : GasStation[]=[];
  gasStationsListAux : GasStation[]=[];
  gasStationProv : string[]=[];
  
  apiLoaded: Observable<boolean>;

  
  constructor(private gasStationService : GasStationsServiceService, httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.apiKey}`, 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
   }

  ngOnInit(): void {
    this.getGasStations();
   // this.gasStationSelect;
   
  }

  filtarProvincias(){

    if(this.gasStationProv.length!=0){
      this.gasStationsListAux = this.gasStationsListAux.filter((gas) => 
      this.gasStationProv.includes(gas.Provincia));

    }
  }


  mostrarListaAux(precio : number, combustible : string){

    switch (combustible) {
      case "Todos":
        this.gasStationsListAux=this.gasStationsList.filter(gas =>   +gas['Precio Gasolina 95 E5'].replace(",",".") &&  +gas['Precio Gasoleo A'].replace(",",".")  < precio);
        this.filtarProvincias();
        break;
    
        case "Gasolina 95":
        this.gasStationsListAux= this.gasStationsList.filter(gas =>  +gas['Precio Gasolina 95 E5'].replace(",",".") < precio);
        this.filtarProvincias();
        break;
        case "Diesel":
          this.gasStationsListAux= this.gasStationsList.filter(gas => +gas['Precio Gasoleo A'].replace(",",".") < precio);
          this.filtarProvincias();
          break;
        case "Hidrogeno":
          this.gasStationsListAux= this.gasStationsList.filter(gas =>  +gas['Precio Hidrogeno'].replace(",",".") < precio);
          this.filtarProvincias();
          break;  
      default:
        break;
    }
  }

  getGasStations(){
    this.gasStationService.getGasStations().subscribe((res)=>{
      this.gasStationsList=res.ListaEESSPrecio;
      this.gasStationsListAux=this.gasStationsList;
    });
  }


}
