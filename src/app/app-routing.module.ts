import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { NoLoginGuard } from "./guards/nologin.guard";

const routes: Routes = [

  /*{
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },*/
  {
    path: '',
    loadChildren: './login/login.module#LoginPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  /* Rutas Servicios Logisticos */
  {
    path: 'operador-logistico',
    loadChildren: './operador-logistico/operador-logistico.module#OperadorLogisticoPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'operador-enproceso',
    loadChildren: './operador-logistico/componentes/operador-enproceso/operador-enproceso.module#OperadorEnprocesoPageModule'
  },
  {
    path: 'operador-proterminado',
    loadChildren: './operador-logistico/componentes/operador-proterminado/operador-proterminado.module#OperadorProterminadoPageModule'
  },
  {
    path: 'operador-filtro',
    loadChildren: './operador-logistico/componentes/filtro/filtro.module#FiltroPageModule'
  },
  {
    path: 'filtro-operador-bl/:id',
    loadChildren: './operador-logistico/componentes/filtro-operador-bl/filtro-operador-bl.module#FiltroOperadorBlPageModule'
  },
  {
    path: 'result-logistico',
    loadChildren: './operador-logistico/componentes/result-logistico/result-logistico.module#ResultLogisticoPageModule'
  },
  {
    path: 'result-search',
    loadChildren: './operador-logistico/componentes/result-search/result-search.module#ResultSearchPageModule'
  },
  {
    path: 'operador-detalle-bl/:id',
    loadChildren: './operador-logistico/componentes/detalle-bl/detalle-bl.module#DetalleBlPageModule'
  },
  {
    path: 'existencia-mercancia',
    loadChildren: './operador-logistico/componentes/existencia-mercancia/existencia-mercancia.module#ExistenciaMercanciaPageModule'
  },
  {
    path: 'despacho-mercancia',
    loadChildren: './operador-logistico/componentes/despacho-mercancia/despacho-mercancia.module#DespachoMercanciaPageModule'
  },
  {
    path: 'devolucion-contenedores',
    loadChildren: './operador-logistico/componentes/devolucion-contenedores/devolucion-contenedores.module#DevolucionContenedoresPageModule'
  },
  {
    path: 'operador-contenedores/:id',
    loadChildren: './operador-logistico/componentes/contenedores/contenedores.module#ContenedoresPageModule'
  },
  {
    path: 'agregar-observacion',
    loadChildren: './operador-logistico/componentes/agregar-observacion/agregar-observacion.module#AgregarObservacionPageModule'
  },
  /* Rutas Fertilizantes */
  {
    path: 'fertilizantes',
    loadChildren: './fertilizantes/fertilizantes.module#FertilizantesPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'filtro-fertilizantes',
    loadChildren: './fertilizantes/componentes/filtro/filtro.module#FiltroPageModule'
  },
  {
    path: 'result-facturas',
    loadChildren: './fertilizantes/componentes/result-facturas/result-facturas.module#ResultFacturasPageModule'
  },
  {
    path: 'rastreo-pedido-home',
    loadChildren: './fertilizantes/componentes/rastreo-pedido-home/rastreo-pedido-home.module#RastreoPedidoHomePageModule'
  },
  {
    path: 'rastreo-pedido/:id',
    loadChildren: './fertilizantes/componentes/rastreo-pedido/rastreo-pedido.module#RastreoPedidoPageModule'
  },
  {
    path: 'facturas-fertilizantes',
    loadChildren: './fertilizantes/componentes/facturas/facturas.module#FacturasPageModule'
  },
  {
    path: 'pedidos-fertilizantes',
    loadChildren: './fertilizantes/componentes/pedidos/pedidos.module#PedidosPageModule'
  },
  {
    path: 'cantidad-pedido',
    loadChildren: './fertilizantes/componentes/cantidad-pedido/cantidad-pedido.module#CantidadPedidoPageModule'
  },
  /* Rutas Comercializadora */
  {
    path: 'venta-azucar',
    loadChildren: './venta-azucar/venta-azucar.module#VentaAzucarPageModule'
  },
  {
    path: 'filtro-nominaciones',
    loadChildren: './venta-azucar/componentes/filtro/filtro.module#FiltroPageModule'
  },
  { 
    path: 'result-nominaciones', 
    loadChildren: './venta-azucar/componentes/result-nominaciones/result-nominaciones.module#ResultNominacionesPageModule' 
  },
  {
    path: 'detalle-nominacion/:id',
    loadChildren: './venta-azucar/componentes/detalle-nominacion/detalle-nominacion.module#DetalleNominacionPageModule'
  },
  {
    path: 'detalle-entrega/:id',
    loadChildren: './venta-azucar/componentes/detalle-entrega/detalle-entrega.module#DetalleEntregaPageModule'
  },
  /*{
    path: 'detalle-booking',
    loadChildren: './venta-azucar/componentes/detalle-booking/detalle-booking.module#DetalleBookingPageModule'
  },*/
  {
    path: 'proceso-logistico',
    loadChildren: './venta-azucar/componentes/proceso-logistico/proceso-logistico.module#ProcesoLogisticoPageModule'
  },
  {
    path: 'pro-log-det/:id',
    loadChildren: './venta-azucar/componentes/pro-log-det/pro-log-det.module#ProLogDetPageModule'
  },
  {
    path: 'filtro-pro-log',
    loadChildren: './venta-azucar/componentes/filtro-pro-log/filtro-pro-log.module#FiltroProLogPageModule'
  },
  {
    path: 'result-pro-log',
    loadChildren: './venta-azucar/componentes/result-pro-log/result-pro-log.module#ResultProLogPageModule'
  },
  {
    path: 'contenedores-pendientes',
    loadChildren: './venta-azucar/componentes/contenedores-pendientes/contenedores-pendientes.module#ContenedoresPendientesPageModule'
  },
  {
    path: 'contenedores-reprogramados',
    loadChildren: './venta-azucar/componentes/contenedores-reprogramados/contenedores-reprogramados.module#ContenedoresReprogramadosPageModule'
  },
  {
    path: 'filtro-contenedores/:type',
    loadChildren: './venta-azucar/componentes/filtro-contenedores/filtro-contenedores.module#FiltroContenedoresPageModule'
  },
  {
    path: 'result-contenedores',
    loadChildren: './venta-azucar/componentes/result-contenedores/result-contenedores.module#ResultContenedoresPageModule'
  }  

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]

})

export class AppRoutingModule { }
