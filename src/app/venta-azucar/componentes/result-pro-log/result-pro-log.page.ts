import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, NavController, IonInfiniteScroll } from '@ionic/angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from "../../../../environments/environment";
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-result-pro-log',
  templateUrl: './result-pro-log.page.html',
  styleUrls: ['./result-pro-log.page.scss'],
})
export class ResultProLogPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  isLoading = false;
  list_array_result: any;
  list_array: any;

  radio_detail: any = '';  
  numero: string = '';

  cant_reg: number = 0;

  slice: number = 10;

  constructor(private route: ActivatedRoute,
              private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private http: HttpClient,
              private storage: Storage) { }

  ngOnInit() {

    this.radio_detail = this.route.snapshot.paramMap.get('radio_detail');
    this.numero = this.route.snapshot.paramMap.get('numero');

    this.searchData(this.radio_detail, this.numero);

  }

  searchData(detail, numero) {

    this.presentLoading();

    //Obtengo el token, y el id del usuario desde el local storage.
    Promise.all([this.storage.get('name_tkn'),this.storage.get('id_user')]).then(values => {
        
      let name_tkn = 'Bearer '+values[0];
      let id_user = values[1];

      const httpBody = new HttpParams()
        .set('type', detail)
        .set('numero', numero);

      let headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'idUsuario': ''+id_user,
        'Authorization': name_tkn });
        
      let options = { headers: headers };

      try {
        this.http.post(environment.url_site+'comercializadora/proceso/logistico', 
        httpBody, options).subscribe( 
          data => {

            this.list_array = data;
            console.log('this.list_array', this.list_array);

            if(this.list_array.success === true){
              this.list_array_result = this.list_array.data.data.attributes;
              console.log('sol ',this.list_array_result);
              this.cant_reg = this.list_array_result.length;
              this.dismiss();

            }else{
              this.presentAlert("Ha ocurrido un error de datos en la consulta del servicio.", "Alerta!!");
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

  backSearch() {
    this.navCtrl.back();
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  entrega(dataRes) {
    console.log('Entrega ', dataRes);
    this.navCtrl.navigateRoot('pro-log-det/'+dataRes);
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.slice += 10;
      infiniteScroll.target.complete();
    }, 1300);    
  }

}
