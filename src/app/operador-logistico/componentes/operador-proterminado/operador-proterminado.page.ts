import { Component, OnInit } from '@angular/core';

import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';

import { environment } from "../../../../environments/environment";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-operador-proterminado',
  templateUrl: './operador-proterminado.page.html',
  styleUrls: ['./operador-proterminado.page.scss'],
})
export class OperadorProterminadoPage implements OnInit {

  isLoading = false;

  list_array_trans: any;

  list_array: any;
  result_data: Array<any>;
  idUsuario: number = 1;

  Mydata:any;
  var_token:any = '';

  classNameTab: string = 'classNameTab';

  constructor(private http: HttpClient,
    private loadingCtrl: LoadingController, 
    private navCtrl: NavController, 
    private router: Router,
    private storage: Storage,
    private alertCtrl: AlertController) { }

  ngOnInit() {

    this.presentLoading();
    this.searchService('PROC_FINAL');
    
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
            console.log(this.list_array);
            
            if(this.list_array.success === true){
              console.log(this.list_array.data.data[0].attributes[0].data);
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

  detailBL(res){
    console.log('Entraste BL', res);
    this.navCtrl.navigateRoot('operador-detalle-bl/'+res);
  }

}
