import { Component } from '@angular/core';

import { Platform, AlertController, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

import { ActivatedRoute } from '@angular/router';
import { Events } from '@ionic/angular';
import { Router } from "@angular/router";
//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['menu-component.scss'],
})
export class AppComponent { 

  public appPages = [];    
  //public appPages = [    
    /*{
      title: 'Login',
      url: '',
      icon: 'list'
    },*/
    /*{
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },*/
    /*{
      title: 'Ratreo de carga',
      url: '/operador-logistico',
      icon: 'list'
    },
    {
      title: 'Existencia de mercancia',
      url: '/existencia-mercancia',
      icon: 'list'
    },
    {
      title: 'Despacho de mercancia',
      url: '/despacho-mercancia',
      icon: 'list'
    },
    {
      title: 'Devolución de contenedores',
      url: '/devolucion-contenedores',
      icon: 'list'
    },
    {
      title: 'Consultar cupo de crédito',
      url: '/fertilizantes',
      icon: 'list'
    },
    {
      title: 'Ratreo del pedido',
      url: '/rastreo-pedido',
      icon: 'list'
    },
    {
      title: 'Facturas',
      url: '/facturas-fertilizantes',
      icon: 'list'
    },
    {
      title: 'Solicitar pedidos',
      url: '/pedidos-fertilizantes',
      icon: 'list'
    },
    {
      title: 'Nominaciones',
      url: '/venta-azucar',
      icon: 'list'
    },
    {
      title: 'Proceso logistico',
      url: '/proceso-logistico',
      icon: 'list'
    },
    {
      title: 'Estado de contenedores',
      url: '/contenedores-pendientes',
      icon: 'list'
    },*/
    /*{
      title: 'Servicios logísticos',
      children: [
        {
          title: 'Ratreo de carga',
          url: '/operador-logistico',
          icon: 'list'
        },
        {
          title: 'Existencia de mercancia',
          url: '/existencia-mercancia',
          icon: 'list'
        },
        {
          title: 'Despacho de mercancia',
          url: '/despacho-mercancia',
          icon: 'list'
        },
        {
          title: 'Devolución de contenedores',
          url: '/devolucion-contenedores',
          icon: 'list'
        }
      ]
    },
    {
      title: 'Agricola',
      children: [
        {
          title: 'Consultar cupo de crédito',
          url: '/fertilizantes',
          icon: 'list'
        },
        {
          title: 'Ratreo del pedido',
          url: '/rastreo-pedido',
          icon: 'list'
        },
        {
          title: 'Facturas',
          url: '/facturas-fertilizantes',
          icon: 'list'
        },
        {
          title: 'Solicitar pedidos',
          url: '/pedidos-fertilizantes',
          icon: 'list'
        }
      ]
    },
    {
      title: 'Comercializadora',
      children: [
        {
          title: 'Nominaciones',
          url: '/venta-azucar',
          icon: 'list'
        },
        {
          title: 'Proceso logistico',
          url: '/proceso-logistico',
          icon: 'list'
        },
        {
          title: 'Estado de contenedores',
          url: '/contenedores-pendientes',
          icon: 'list'
        }
      ]
    }
  ];*/

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController: AlertController,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private storage: Storage,
    private route: ActivatedRoute,
    public events: Events,
    public router: Router
  ) {
    this.initializeApp();
  }

  perfilComercializadora(){
    this.appPages = [

      {
        title: 'Comercializadora',
        children: [
          {
            title: 'Nominaciones',
            url: '/venta-azucar',
            icon: 'list',
            visible: true
          },
          {
            title: 'Proceso logistico',
            url: '/proceso-logistico',
            icon: 'list',
            visible: true
          },
          {
            title: 'Estado de contenedores',
            url: '/contenedores-pendientes',
            icon: 'list',
            visible: true
          }
        ]
      }

    ];
  }

  perfilOperario(Rastreo_de_carga, Existencia_de_mercancia, Despacho_de_mercancia, Fecha_limite_devolucion){
    this.appPages = [

      {
        title: 'Servicios logísticos',
        children: [
          {
            title: 'Ratreo de carga',
            url: '/operador-logistico',
            icon: 'list',
            visible: Rastreo_de_carga
          },
          {
            title: 'Existencia de mercancia',
            url: '/existencia-mercancia',
            icon: 'list',
            visible: Existencia_de_mercancia
          },
          {
            title: 'Despacho de mercancia',
            url: '/despacho-mercancia',
            icon: 'list',
            visible: Despacho_de_mercancia
          },
          {
            title: 'Devolución de contenedores',
            url: '/devolucion-contenedores',
            icon: 'list',
            visible: Fecha_limite_devolucion
          }
        ]
      }

    ];
  }

  perfilAgricola(Cupo_credito, Rastreo_de_pedido, Facturas, Solicitar_pedidos){
    this.appPages = [

      {
        title: 'Agricola',
        children: [
          {
            title: 'Consultar cupo de crédito',
            url: '/fertilizantes',
            icon: 'list',
            visible: Cupo_credito
          },
          {
            title: 'Ratreo del pedido',
            url: '/rastreo-pedido-home',
            icon: 'list',
            visible: Rastreo_de_pedido
          },
          {
            title: 'Facturas',
            url: '/facturas-fertilizantes',
            icon: 'list',
            visible: Facturas
          },
          {
            title: 'Solicitar pedidos',
            url: '/pedidos-fertilizantes',
            icon: 'list',
            visible: Solicitar_pedidos
          }
        ]
      }

    ];
  }

  initializeApp() {

    this.events.subscribe('role:created:permissions', (role, time, permissions) => {
      
      // role and time are the same arguments passed in `events.publish(role, time)`
      console.log('Welcome role', role, 'at', time, 'permissions', permissions);

      //Permisos Ciamsa 2
      var Rastreo_de_carga = permissions.filter(permissions => permissions.name == 'Rastreo_de_carga');
      if(Rastreo_de_carga.length == 1){
        Rastreo_de_carga = true;
      }else{
        Rastreo_de_carga = false;
      }

      var Existencia_de_mercancia = permissions.filter(permissions => permissions.name == 'Existencia_de_mercancia');
      if(Existencia_de_mercancia.length == 1){
        Existencia_de_mercancia = true;
      }else{
        Existencia_de_mercancia = false;
      }

      var Despacho_de_mercancia = permissions.filter(permissions => permissions.name == 'Despacho_de_mercancia');
      if(Despacho_de_mercancia.length == 1){
        Despacho_de_mercancia = true;
      }else{
        Despacho_de_mercancia = false;
      }

      var Fecha_limite_devolucion = permissions.filter(permissions => permissions.name == 'Fecha_limite_devolucion');
      if(Fecha_limite_devolucion.length == 1){
        Fecha_limite_devolucion = true;
      }else{
        Fecha_limite_devolucion = false;
      }
      //Fin Ciamsa 2

      //Permisos Agricola
      var Cupo_credito = permissions.filter(permissions => permissions.name == 'Cupo_credito');
      if(Cupo_credito.length == 1){
        Cupo_credito = true;
      }else{
        Cupo_credito = false;
      }

      var Rastreo_de_pedido = permissions.filter(permissions => permissions.name == 'Rastreo_de_pedido');
      if(Rastreo_de_pedido.length == 1){
        Rastreo_de_pedido = true;
      }else{
        Rastreo_de_pedido = false;
      }

      var Facturas = permissions.filter(permissions => permissions.name == 'Facturas');
      if(Facturas.length == 1){
        Facturas = true;
      }else{
        Facturas = false;
      }

      var Solicitar_pedidos = permissions.filter(permissions => permissions.name == 'Solicitar_pedidos');
      if(Solicitar_pedidos.length == 1){
        Solicitar_pedidos = true;
      }else{
        Solicitar_pedidos = false;
      }
      //Fin Agricola

      if(role === 'Admin_ciamsa_1' || role === 'Usuario_ciamsa_1' || role === 'Cliente_ciamsa_1'){
        this.perfilComercializadora();
      }else if(role === 'Admin_ciamsa_2' || role === 'Usuario_ciamsa_2' || role === 'Cliente_ciamsa_2'){
        this.perfilOperario(Rastreo_de_carga, Existencia_de_mercancia, Despacho_de_mercancia, Fecha_limite_devolucion);
      }else if(role === 'Admin_ciamsa_fertilizantes' || role === 'Usuario_ciamsa_fertilizantes' || role === 'Cliente_ciamsa_fertilizantes'){
        this.perfilAgricola(Cupo_credito, Rastreo_de_pedido, Facturas, Solicitar_pedidos);
      }

    });

    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });

  }
  async presentAlert(mensaje, nState) {
    const alert = await this.alertController.create({
    message: mensaje,
    subHeader: nState,
    buttons: ['Cerrar']
   });
   await alert.present(); 
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmar!',
      message: '<strong>Desea salir?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Continuar',
          handler: () => {

            this.storage.set('name_tkn', '');
            this.storage.set('role_user', '');
            this.storage.set('id_user', '');
            this.storage.set('identification', '');
            this.storage.set('array_permissions', '');
            
            console.log('Confirm Okay');

            this.menuCtrl.enable(false);
           // this.navCtrl.navigateRoot('/login');
           //this.router.navigate(['/login']);

           let TIME_IN_MS = 1300;
            let hideFooterTimeout = setTimeout( () => {
              this.router.navigate(['/login']);
            }, TIME_IN_MS);

          }
        }
      ]
    });

    await alert.present();
  }
  evet(event, status_dat) {
    //console.log('status_dat', status_dat);
  }
  closeUser() {
    this.presentAlertConfirm();
  }
}
