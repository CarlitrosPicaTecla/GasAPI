import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, catchError, of, Observable } from 'rxjs';
import { GasStation, GasStationResponse } from 'src/app/interfaces/gas-station.interface';
import { GasStationsServiceService } from 'src/app/service/gas-stations-service.service';

@Component({
  selector: 'app-gas-stations',
  templateUrl: './gas-stations.component.html',
  styleUrls: ['./gas-stations.component.css']
})
export class GasStationsComponent implements OnInit {
  valor : number = 0;

  selected : string[]=["Gasolina 95","Diesel","Hidrogeno" ];

 // const result = this.valor.filter(word => word.length > 6);

 


  gasStationsList : GasStation[]=[];

  constructor(private gasStationService : GasStationsServiceService, httpClient: HttpClient) {

   }

  ngOnInit(): void {
    this.getGasStations();
  }

  getGasStations(){
    this.gasStationService.getGasStations().subscribe((res)=>{
      this.gasStationsList=res.ListaEESSPrecio;
    });
  }

}
