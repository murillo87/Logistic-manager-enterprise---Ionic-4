import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';

import { AlertController, LoadingController, NavController, ModalController, IonInfiniteScroll } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from "../../../../environments/environment";
import { Storage } from '@ionic/storage';

import { FiltroPage } from '../filtro/filtro.page';
import { RastreoPedidoPage } from '../rastreo-pedido/rastreo-pedido.page';

@Component({
  selector: 'app-rastreo-pedido-home',
  templateUrl: './rastreo-pedido-home.page.html',
  styleUrls: ['./rastreo-pedido-home.page.scss'],
})
export class RastreoPedidoHomePage implements OnInit {

  options: boolean = false;

  isLoading = false;
  list_array: any;
  list_array_result: any;

  slice: number = 5;

  constructor(private http: HttpClient,
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController, 
    private navCtrl: NavController,
    private storage: Storage,
    private modalController: ModalController) { }

  ngOnInit() {

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
        this.http.post(environment.url_site+'agricola/consulta/pedido', 
        null, options).subscribe( 
          data => {
            this.list_array = data;

            //console.log('this.list_array', this.list_array);

            if(this.list_array.success === true){
              this.list_array_result = this.list_array.data.data.attributes[0].data;
              //console.log('list_array_result', this.list_array_result);
              this.dismiss();
            }else{
              this.presentAlert("Ha ocurrido un error de datos en la consulta del servicio.", "Error!!");
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
      duration: 20000
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

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.slice += 5;
      infiniteScroll.target.complete();
    }, 1300);    
  }

  detailRastreo(res){
    //console.log('Entraste Rastreo', res);
    this.navCtrl.navigateRoot('rastreo-pedido/'+res);
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
  
  async openModalOrder(res) {

    const modal = await this.modalController.create({
      component: RastreoPedidoPage,
      componentProps: {
        "order": res
      }
    });    

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {

      }
    });
 
    return await modal.present();
  }

}
