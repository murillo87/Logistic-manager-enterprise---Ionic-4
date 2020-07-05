import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { AgregarObservacionPageModule } from './operador-logistico/componentes/agregar-observacion/agregar-observacion.module';
import { CantidadPedidoPageModule } from './fertilizantes/componentes/cantidad-pedido/cantidad-pedido.module';
import { FiltroPageModule } from './fertilizantes/componentes/filtro/filtro.module';
import { RastreoPedidoPageModule } from './fertilizantes/componentes/rastreo-pedido/rastreo-pedido.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AgregarObservacionPageModule,
    CantidadPedidoPageModule,
    FiltroPageModule,
    RastreoPedidoPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
