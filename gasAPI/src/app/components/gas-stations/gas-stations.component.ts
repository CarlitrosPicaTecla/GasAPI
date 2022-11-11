import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { map, catchError, of, Observable } from 'rxjs';
import { GasStation, GasStationResponse } from 'src/app/interfaces/gas-station.interface';
import { GasStationsServiceService } from 'src/app/service/gas-stations-service.service';

@Component({
  selector: 'app-gas-stations',
  templateUrl: './gas-stations.component.html',
  styleUrls: ['./gas-stations.component.css']
})
export class GasStationsComponent implements OnInit {

  valor : number = 3;

  selected : string[]=["Todos","Gasolina 95","Diesel","Hidrogeno"];

  select : string="Todos";


 // const result = this.valor.filter(word => word.length > 6);

  gasStationsList : GasStation[]=[];
  gasStationsListAux : GasStation[]=[];
  

  gasStationSelect = this.gasStationsList.filter(gas => {
     Number( gas['Precio Gasolina 95 E5'][1].split('.')) && Number( gas['Precio Gasoleo A'][1].split('.')) || Number(gas['Precio Hidrogeno'][1].split('.')) < this.valor });
  
  constructor(private gasStationService : GasStationsServiceService, httpClient: HttpClient) {

   }

  ngOnInit(): void {
    this.getGasStations();
   // this.gasStationSelect;
   
  }


  mostrarListaAux(precio : number, combustible : string){

    switch (combustible) {
      case "Todos":
        this.gasStationsListAux=this.gasStationsList.filter(gas =>   +gas['Precio Gasolina 95 E5'].replace(",",".") &&  +gas['Precio Gasoleo A'].replace(",",".")  < precio);
        break;
    
        case "Gasolina 95":
        this.gasStationsListAux= this.gasStationsList.filter(gas =>  +gas['Precio Gasolina 95 E5'].replace(",",".") < precio);
        break;
        case "Diesel":
          this.gasStationsListAux= this.gasStationsList.filter(gas => +gas['Precio Gasoleo A'].replace(",",".") < precio);
          break;
        case "Hidrogeno":
          this.gasStationsListAux= this.gasStationsList.filter(gas =>  +gas['Precio Hidrogeno'].replace(",",".") < precio);
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
