import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, NavController, IonInfiniteScroll } from '@ionic/angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from "../../../../environments/environment";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-despacho-mercancia',
  templateUrl: './despacho-mercancia.page.html',
  styleUrls: ['./despacho-mercancia.page.scss'],
})
export class DespachoMercanciaPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  isLoading = false;
  list_array_result: any;
  list_array: any;

  idUsuario: any = 1;
  slice: number = 3;

  constructor(private http: HttpClient,
              private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController, 
              private navCtrl: NavController,
              private storage: Storage) { }

  ngOnInit() {    

    this.presentLoading();

    Promise.all([this.storage.get('name_tkn'), this.storage.get('id_user')]).then(values => {
        let name_tkn = 'Bearer '+values[0];
        let id_user = values[1];

      const httpBody = new HttpParams()
        .set('fechainicial', '')
        .set('fechafinal', '');

      let headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'idUsuario': ''+id_user,
        'Authorization': name_tkn });

        let options = { headers: headers };

        try {
          this.http.post(environment.url_site+'serviciosLogisticos/despachoMercancia', 
          httpBody, options).subscribe( 
            data => {
              
              this.list_array = data;
              console.log(this.list_array);

              if(this.list_array.success === true){
                this.list_array_result = this.list_array.data.data.attributes;
                console.log('list_array_result', this.list_array_result);
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
          this.presentAlert(err, "ERROR!");
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
      duration: 15000
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
      this.slice += 3;
      infiniteScroll.target.complete();
    }, 1300);    
  }

}
