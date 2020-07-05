import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertController, LoadingController, NavController, IonInfiniteScroll } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from "../../../../environments/environment";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-contenedores-pendientes',
  templateUrl: './contenedores-pendientes.page.html',
  styleUrls: ['./contenedores-pendientes.page.scss'],
})
export class ContenedoresPendientesPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  isLoading = false;
  list_array_result: any;
  list_array: any;
  
  slice: number = 7;

  constructor(private http: HttpClient,
              private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController, 
              private navCtrl: NavController,
              private storage: Storage) { }

  ngOnInit() {

    this.getData();
    
  }

  getData() {

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
        this.http.post(environment.url_site+'comercializadora/contenedores/quedados', 
        null, options).subscribe( 
          data => {

            this.list_array = data;
            console.log('this.list_array', this.list_array);

            if(this.list_array.success === true){
              this.list_array_result = this.list_array.data.data.attributes[0].data;
              console.log('cont-pend ',this.list_array_result);
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

  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.slice += 7;
      infiniteScroll.target.complete();
    }, 1300);    
  }

  reprogramados() {
    this.navCtrl.navigateRoot('/contenedores-reprogramados');
  }

}
