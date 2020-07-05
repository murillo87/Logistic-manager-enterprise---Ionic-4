import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertController, LoadingController, NavController, IonInfiniteScroll } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';

import { environment } from "../../../../environments/environment";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-result-nominaciones',
  templateUrl: './result-nominaciones.page.html',
  styleUrls: ['./result-nominaciones.page.scss'],
})
export class ResultNominacionesPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  isLoading = false;
  list_array_result: any;
  list_array: any;

  radio_detail: any = '';  
  numero: any = '';
  date_init: any = '';
  date_end: any = '';

  slice: number = 5;
  cant: number = 0;

  constructor(private http: HttpClient,
              private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController, 
              private navCtrl: NavController,
              private storage: Storage,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.radio_detail = this.route.snapshot.paramMap.get('radio_detail');
    this.numero    = this.route.snapshot.paramMap.get('numero');
    this.date_init    = this.route.snapshot.paramMap.get('date_init');
    this.date_end     = this.route.snapshot.paramMap.get('date_end');

    this.getData(this.radio_detail, this.numero, this. date_init, this.date_end);

  }

  getData(detail, numero, date_ini, date_end) {

    this.presentLoading();

    //Obtengo el token, el id del usuario y la identificacion del usuario desde el local storage.
    Promise.all([this.storage.get('name_tkn'),this.storage.get('id_user')]).then(values => {
        
      let name_tkn = 'Bearer '+values[0];
      let id_user = values[1];

      const httpBody = new HttpParams()
      .set('type', detail)
      .set('numero', numero)
      .set('fechainicial', date_ini)
      .set('fechafinal', date_end);

      let headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'idUsuario': ''+id_user,
        'Authorization': name_tkn });
        
      let options = { headers: headers };

      try {
        this.http.post(environment.url_site+'comercializadora/nominaciones', 
        httpBody, options).subscribe( 
          data => {

            this.list_array = data;
            console.log('this.list_array', this.list_array);

            if(this.list_array.success === true){
              this.list_array_result = this.list_array.data.data[0].attributes[0].data;
              console.log('sol ',this.list_array_result);
              this.cant = this.list_array_result.length; 
              this.dismiss();

            }else{
              this.presentAlert("Ha ocurrido un error de datos en la consulta del servicio.", "Error!!");
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

  radicadoData(detail){
    console.log('Radicado ',detail);
    this.navCtrl.navigateRoot('detalle-entrega/'+detail);
  }

  bookingData(detail){
    console.log('Booking ',detail);
    this.navCtrl.navigateRoot('detalle-nominacion/'+detail);
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.slice += 5;
      infiniteScroll.target.complete();
    }, 10000);    
  }

  backSearch(){    
    this.navCtrl.back();
  }

}
