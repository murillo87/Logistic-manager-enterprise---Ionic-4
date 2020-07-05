import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertController, LoadingController, NavController, ModalController, NavParams } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';

import { environment } from "../../../../environments/environment";
import { Storage } from '@ionic/storage';

import { FiltroPage } from '../filtro/filtro.page';

@Component({
  selector: 'app-rastreo-pedido',
  templateUrl: './rastreo-pedido.page.html',
  styleUrls: ['./rastreo-pedido.page.scss'],
})
export class RastreoPedidoPage implements OnInit {

  id: any;
  options: boolean = false;

  factura:   any = '';
  pedido:    any = '';
  cantidad:  any = '';
  entregado: any = '';
  saldo:     any = '';
  estado:    any = '';

  isLoading = false;
  list_array_result: any;
  list_array: any;

  constructor(private http: HttpClient,
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController, 
    private navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private modalController: ModalController,
    private navParams: NavParams) { }

  ngOnInit() {

    /*this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);*/

    console.table(this.navParams);
    this.id = this.navParams.data.order;

    this.presentLoading();

    //Obtengo el token, el id del usuario y la identificacion del usuario desde el local storage.
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
        this.http.get(environment.url_site+'agricola/consulta/detalle-pedido/'+this.id, 
        options).subscribe( 
          data => {
            this.list_array = data;

            //console.log('this.list_array', this.list_array);

            if(this.list_array.success === true){

              this.factura    = this.list_array.data.data.attributes[0].data[0][0];
              this.pedido     = this.list_array.data.data.attributes[0].data[0][1];
              this.cantidad   = this.list_array.data.data.attributes[0].data[0][2];
              this.entregado  = this.list_array.data.data.attributes[0].data[0][3];
              this.saldo      = this.list_array.data.data.attributes[0].data[0][4];
              this.estado     = this.list_array.data.data.attributes[0].data[0][5];
              
              this.list_array_result = this.list_array.data.data.relationships.tracking.data;
              //console.log('list_array_result', this.list_array_result);

              this.dismiss();
            }else{
              this.presentAlert("Ha ocurrido un error de datos en la consulta del servicio.", "Alerta!!");
              this.dismiss();
            }

          }, 
          err => {
            //console.log("ERROR!: ", err);
            this.presentAlert('No hay conexión!!', 'Alerta');
            this.dismiss();
          }
        );
      }catch (err) {
        this.presentAlert(err, 'Alerta');
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
      duration: 30000
    }).then(a => {
      a.present().then(() => {
        //console.log('presented');
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

  async closeModal() {
    await this.modalController.dismiss();
  }

}
