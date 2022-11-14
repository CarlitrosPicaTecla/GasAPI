import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GasStationsComponent } from './components/gas-stations/gas-stations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { MaterialsImportModule } from './materials-import/materials-import.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GasStationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialsImportModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
    FormsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
