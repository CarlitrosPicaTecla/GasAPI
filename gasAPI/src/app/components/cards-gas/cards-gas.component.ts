import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { GasStation } from 'src/app/interfaces/gas-station.interface';
import { Municipio } from 'src/app/interfaces/municipios.interface';
import { Provincia } from 'src/app/interfaces/provincia.interface';
import { GasStationsServiceService } from 'src/app/service/gas-stations-service.service';
import { ProvinciaService } from 'src/app/service/provincia.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cards-gas',
  templateUrl: './cards-gas.component.html',
  styleUrls: ['./cards-gas.component.css']
})
export class CardsGasComponent implements OnInit {

  valor : number = 3;

  selected : string[]=["Todos","Gasolina 95","Diesel","Hidrogeno"];





  select : string="Todos";


 // const result = this.valor.filter(word => word.length > 6);

  gasStationsList : GasStation[]=[];
  gasStationsListAux : GasStation[]=[];
  gasStationProv : string[]=[];

  provinciasList : Provincia[]=[];
  provinciasSelect : string[]=[];

  municipioList : Municipio[]=[];
  municipioSelect : string="";

  
  apiLoaded: Observable<boolean>;

  

  constructor(private gasStationService : GasStationsServiceService, httpClient: HttpClient, private provinciaservice : ProvinciaService) {
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.apiKey}`, 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
   }

  ngOnInit(): void {
    this.getGasStations();
   // this.gasStationSelect;
   this.getProvincias();


   
  }



  filtarProvincias(){
    this.gasStationsListAux=this.gasStationsList;

    if(this.provinciasSelect.length !=0 ){
      this.gasStationsListAux = this.gasStationsList.filter((gas) => 
      this.provinciasSelect.includes(gas.IDProvincia));
     // this.gasStationsListAux = this.gasStationsListAux.filter((gas =>  +gas['Precio Gasolina 95 E5'].replace(",",".") &&  +gas['Precio Gasoleo A'].replace(",",".")  < precio)); 
    }
    }


  mostrarListaAux(precio : number, combustible : string){
    //this.gasStationsListAux=[];

    this.filtarProvincias();

    switch (combustible) {
      case "Todos":
        this.gasStationsListAux=this.gasStationsListAux.filter(gas =>   +gas['Precio Gasolina 95 E5'].replace(",",".") &&  +gas['Precio Gasoleo A'].replace(",",".")  < precio);
        break;

        case "Gasolina 95":
        this.gasStationsListAux= this.gasStationsListAux.filter(gas =>  +gas['Precio Gasolina 95 E5'].replace(",",".") < precio);
        break;
        case "Diesel":
          this.gasStationsListAux= this.gasStationsListAux.filter(gas => +gas['Precio Gasoleo A'].replace(",",".") < precio);
          break;
        case "Hidrogeno":
          this.gasStationsListAux= this.gasStationsListAux.filter(gas =>  +gas['Precio Hidrogeno'].replace(",",".") < precio);
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

  getProvincias(){
    this.provinciaservice.getProvincias().subscribe((res)=>{
     this.provinciasList=res;
    });

  }

  getMunicipios(id : number){

    this.provinciaservice.getMunicipios(id).subscribe((res)=>{
      this.municipioList=res;
    });
  }
}
