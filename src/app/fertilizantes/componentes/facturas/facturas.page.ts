import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertController, LoadingController, NavController, ModalController, IonInfiniteScroll } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from "../../../../environments/environment";
import { Storage } from '@ionic/storage';

import { FiltroPage } from '../filtro/filtro.page';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.page.html',
  styleUrls: ['./facturas.page.scss'],
})
export class FacturasPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  options: boolean = false;
  googleChartLibrary: any;

  isLoading = false;
  list_array: any;
  list_array_result: any;

  slice: number = 7;

  constructor(private http: HttpClient,
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController, 
    private navCtrl: NavController,
    private storage: Storage,
    private modalController: ModalController) { }

  ngOnInit() {

    this.presentLoading();

    //Obtengo el token y el id del usuario desde el local storage.
    Promise.all([this.storage.get('name_tkn'),this.storage.get('id_user')]).then(values => {
        
      let name_tkn = 'Bearer '+values[0];
      let id_user = values[1];

      let headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'idUsuario': ''+id_user,
        'Authorization': name_tkn });
        
      let options = { headers: headers };

      try {
        this.http.post(environment.url_site+'agricola/historial/facturas', 
        null, options).subscribe( 
          data => {

            this.list_array = data;
            console.log(this.list_array);

            if(this.list_array.success === true){
              this.list_array_result = this.list_array.data.data.attributes[0].data;
              console.log(this.list_array_result);
              //this.presentAlert(this.list_array.message, "Felicitaciones!!");
              this.dismiss();
            }else{
              this.presentAlert(this.list_array.message, "Alerta!!");
              this.dismiss();
            }

          }, 
          err => {
            console.log("ERROR!: ", err);
            this.presentAlert('No hay conexión!!', 'Alerta');
            this.dismiss();
          }
        );
      }catch (err) {
        console.log('Lo sentimos hay problemas de conexión', err);
        this.dismiss();
      }
    
    });
    
  }

  async presentAlert(mensaje, nState) {
    const alert = await this.alertCtrl.create({
    message: mensaje,
    subHeader: nState,
    buttons: ['Cerrar']
   });
   await alert.present(); 
  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: 'Espere un momento...',
      duration: 10000
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async presentLoadingDownload() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: 'Descargando factura...',
      duration: 10000
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  ferOptions() {
    if(this.options === false){
      this.options = true;
    }else if(this.options === true){
      this.options = false;
    }
  }

  getInvoices(invoice){

    console.log('Get fact', invoice);

    this.downloadInvoce(invoice);

  }

  downloadInvoce(invoice) {

    this.presentLoadingDownload();

    //Obtengo el token y el id del usuario desde el local storage.
    Promise.all([this.storage.get('name_tkn'),this.storage.get('id_user')]).then(values => {
        
      let name_tkn = 'Bearer '+values[0];
      let id_user = values[1];

      let headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'idUsuario': ''+id_user,
        'Authorization': name_tkn });
        
      let options = { headers: headers };

      try {
        this.http.get(environment.url_site+'agricola/descargar-factura/'+invoice, 
        options).subscribe( 
          data => {

            this.list_array = data;
            console.log('Array Factura Descargada',this.list_array);

            if(this.list_array.success === true){
              window.open(this.list_array.data, '_blank', 'location=yes');
              this.dismiss();
            }else{
              this.presentAlert(this.list_array.message, "Alerta!!");
              this.dismiss();
            }

          }, 
          err => {
            console.log("ERROR!: ", err);
            this.presentAlert('No hay conexión!!', 'Alerta');
            this.dismiss();
          }
        );
      }catch (err) {
        console.log('Lo sentimos hay problemas de conexión', err);
        this.dismiss();
      }
    
    });

  }

  async presentAlertConfirm(ionvoice) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar!',
      message: '<strong>Desea descargar factura?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {

            this.getInvoices(ionvoice);


          }
        }
      ]
    });

    await alert.present();
  }

  searchService(busqueda) {
    //Obtengo el token y el id del usuario desde el local storage.
    Promise.all([this.storage.get('name_tkn'), this.storage.get('id_user')]).then(values => {
      let name_tkn = 'Bearer '+values[0];
      let id_user = values[1];

      let headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'idUsuario': ''+id_user,
        'Authorization': name_tkn });
        
      let options = { headers: headers };

      try {
        this.http.get(environment.url_site+'agricola/descargar-factura/'+busqueda, 
        options).subscribe( 
          data => {
            this.list_array = data;

            if(this.list_array.success === true){
              console.log(this.list_array);
              this.dismiss();
            }else{
              this.presentAlert(this.list_array.message, "Error!!");
              this.dismiss();
            }

          }, 
          err => {
            console.log("ERROR!: ", err);
            this.presentAlert('No hay conexión!!', 'Alerta');
            this.dismiss();
          }
        );
      }catch (err) {
        console.log('Lo sentimos hay problemas de conexión', err);
        this.dismiss();
      }
    
    });
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.slice += 7;
      infiniteScroll.target.complete();
    }, 1300);    
  }

  async openModal() {

    const modal = await this.modalController.create({
      component: FiltroPage,
      componentProps: {
      }
    });    

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {

      }
    });
 
    return await modal.present();
  } 

}
