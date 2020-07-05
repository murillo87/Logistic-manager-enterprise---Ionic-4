import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router } from "@angular/router";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from "../../../../environments/environment";
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-result-logistico',
  templateUrl: './result-logistico.page.html',
  styleUrls: ['./result-logistico.page.scss'],
})
export class ResultLogisticoPage implements OnInit {

  isLoading = false;
  list_array_result: any;
  list_array: any;

  radio_search: any = '';
  radio_detail: any = '';  
  numero_bl: any = '';
  date_init: any = '';
  date_end: any = '';

  cant_reg: number = 0;

  constructor(private route: ActivatedRoute,
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController, 
    private navCtrl: NavController,
    private http: HttpClient,
    private router : Router,
    private storage: Storage) { }

  ngOnInit() {

    this.presentLoading();

    this.radio_search = this.route.snapshot.paramMap.get('radio_search');
    this.radio_detail = this.route.snapshot.paramMap.get('radio_detail');
    this.numero_bl    = this.route.snapshot.paramMap.get('numero_bl');
    this.date_init    = this.route.snapshot.paramMap.get('date_init');
    this.date_end     = this.route.snapshot.paramMap.get('date_end');

    console.log(this.radio_search, this.radio_detail, this.numero_bl, this.date_init, this.date_end);
    //return false;

    this.searchService(this.radio_search, this.radio_detail, this.numero_bl, this.date_init, this.date_end);

  }

  searchService(busqueda, tipo, numero, fechainicial, fechafinal) {

    Promise.all([this.storage.get('name_tkn'), this.storage.get('id_user')]).then(values => {
      let name_tkn = 'Bearer '+values[0];
      let id_user = values[1];

      const httpBody = new HttpParams()
        .set('estado', busqueda)
        .set('tipo', tipo)
        .set('numero', numero)
        .set('fechainicial', fechainicial)
        .set('fechafinal', fechafinal);

      /*const httpBody = new HttpParams()
        .set('estado', 'TRANSITO');*/

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
              this.list_array_result = this.list_array.data.data[0].attributes[0].data;
              this.cant_reg = this.list_array_result.length;
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

  detailBL(res){
    console.log('Entraste BL', res);
    this.navCtrl.navigateRoot('operador-detalle-bl/'+res);
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

  backSearch() {
    this.navCtrl.back();
  }


}
