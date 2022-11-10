import { Component, OnInit } from '@angular/core';
import { GasStation, GasStationResponse } from 'src/app/interfaces/gas-station.interface';
import { GasStationsServiceService } from 'src/app/service/gas-stations-service.service';

@Component({
  selector: 'app-gas-stations',
  templateUrl: './gas-stations.component.html',
  styleUrls: ['./gas-stations.component.css']
})
export class GasStationsComponent implements OnInit {


  gasStationsList : GasStation[]=[];
  constructor(private gasStationService : GasStationsServiceService) { }

  ngOnInit(): void {
  }

  getGasStations(){
    this.gasStationService.getGasStations().subscribe((res)=>{
      this.gasStationsList=res.ListaEESSPrecio;
    });
  }

}
