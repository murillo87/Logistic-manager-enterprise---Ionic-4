import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, NavController, IonInfiniteScroll } from '@ionic/angular';
import { Router } from "@angular/router";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from "../../../../environments/environment";
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-result-facturas',
  templateUrl: './result-facturas.page.html',
  styleUrls: ['./result-facturas.page.scss'],
})
export class ResultFacturasPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  isLoading = false;
  list_array_result: any;
  list_array: any;

  numero_bl: any = '';
  date_init: any = '';
  date_end: any = '';

  cant_reg: number = 0;

  slice: number = 7;

  constructor(private route: ActivatedRoute,
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController, 
    private navCtrl: NavController,
    private http: HttpClient,
    private router : Router,
    private storage: Storage) { }

  ngOnInit() {

    this.presentLoading();

    this.numero_bl    = this.route.snapshot.paramMap.get('numero_bl');
    this.date_init    = this.route.snapshot.paramMap.get('date_init');
    this.date_end     = this.route.snapshot.paramMap.get('date_end');

    //Obtengo el token y el id del usuario del usuario desde el local storage.
    Promise.all([this.storage.get('name_tkn'),this.storage.get('id_user')]).then(values => {

      const httpBody = new HttpParams()
      .set('numero', this.numero_bl)
      .set('fechainicial', this.date_init)
      .set('fechafinal', this.date_end);
        
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
        httpBody, options).subscribe( 
          data => {

            this.list_array = data;
            console.log(this.list_array);

            if(this.list_array.success === true){
              this.list_array_result = this.list_array.data.data.attributes[0].data;
              console.log(this.list_array_result);
              this.cant_reg = this.list_array_result.length;
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

  getInvoices(invoice){

    console.log('Get fact', invoice);

    //var ref = window.open('http://bdigital.bnjm.cu/docs/libros/PROC2-435/Cien%20anos%20de%20soledad.pdf', '_blank', 'location=yes');

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
      duration: 3000
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

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.slice += 7;
      infiniteScroll.target.complete();
    }, 1500);    
  }

  backSearch(){    
    this.navCtrl.back();
  }

}
