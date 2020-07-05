import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, NavController, IonInfiniteScroll } from '@ionic/angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

import { Router } from '@angular/router';

import { environment } from "../../environments/environment";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-operador-logistico',
  templateUrl: './operador-logistico.page.html',
  styleUrls: ['./operador-logistico.page.scss'],
})
export class OperadorLogisticoPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  isLoading = false;

  list_array_trans: any;

  list_array: any;
  result_data: Array<any>;
  idUsuario: number = 1;

  Mydata:any;
  var_token:any = '';

  classNameTab: string = 'classNameTab';
  slice: number = 5;

  constructor(private http: HttpClient,
              private loadingCtrl: LoadingController, 
              private navCtrl: NavController, 
              private router: Router,
              private alertCtrl: AlertController,
              private storage: Storage) { }

  ngOnInit() {

    this.storage.get('name_tkn').then((val) => {
      this.var_token = val;
      //console.log('Your tkn is', this.var_token);
    });

    this.presentLoading();

    this.searchService('TRANSITO');

  }

  searchService(busqueda) {
    //Obtengo el token y el id del usuario desde el local storage.
    Promise.all([this.storage.get('name_tkn'), this.storage.get('id_user')]).then(values => {
      let name_tkn = 'Bearer '+values[0];
      let id_user = values[1];
    
      const httpBody = new HttpParams()
        .set('estado', busqueda);

      let headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'idUsuario': ''+id_user,
        'Authorization': name_tkn });
        
      let options = { headers: headers };

      try {
        this.http.post(environment.url_site+'serviciosLogisticos/rastreoList?', 
        httpBody, options).subscribe( 
          data => {
            this.list_array = data;

            if(this.list_array.success === true){
              console.log(this.list_array);
              this.list_array_trans = this.list_array.data.data[0].attributes[0].data;
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

  async presentAlert(mensaje, nState) {
    const alert = await this.alertCtrl.create({
    message: mensaje,
    subHeader: nState,
    buttons: ['Cerrar']
   });
   await alert.present(); 
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  detailBL(res){
    console.log('Entraste BL', res);
    this.navCtrl.navigateRoot('operador-detalle-bl/'+res);
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.slice += 5;
      infiniteScroll.target.complete();
    }, 1300);    
  }

}
