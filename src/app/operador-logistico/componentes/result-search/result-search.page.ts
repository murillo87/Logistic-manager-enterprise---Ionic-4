import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, NavController, IonInfiniteScroll } from '@ionic/angular';
import { Router } from "@angular/router";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from "../../../../environments/environment";
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.page.html',
  styleUrls: ['./result-search.page.scss'],
})
export class ResultSearchPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  isLoading = false;
  list_array_result: any;
  list_array: any;

  radio_search: any = '';
  radio_detail: any = '';  
  numero_bl: any = '';
  date_init: any = '';
  date_end: any = '';

  end_point: any = '';

  content_mercancia:  boolean = false;
  content_despacho:   boolean = false;
  content_devolucion: boolean = false;

  cant_reg: number = 0;

  slice: number = 10;

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
    let id_site       = this.route.snapshot.paramMap.get('id_site');

    if(id_site == 'existencia-mercancia'){
      this.end_point = 'serviciosLogisticos/existenciaMercancia';

      this.searchMercancia(this.radio_search, 
        this.radio_detail, 
        this.numero_bl, 
        this.date_init, 
        this.date_end, 
        this.end_point);

    }if(id_site == 'despacho-mercancia'){
      this.end_point = 'serviciosLogisticos/despachoMercancia';

      this.searchDespacho(this.radio_search, 
        this.radio_detail, 
        this.numero_bl, 
        this.date_init, 
        this.date_end, 
        this.end_point);

    }if(id_site == 'devolucion-contenedores'){
      this.end_point = 'serviciosLogisticos/fechaLimiteDevolucionContenedor';

      this.searchContenedores(this.radio_search, 
        this.radio_detail, 
        this.numero_bl, 
        this.date_init, 
        this.date_end, 
        this.end_point);

    }

  }

  searchMercancia(busqueda, tipo, numero, fechainicial, fechafinal, end_point) {
      
    Promise.all([this.storage.get('name_tkn'), this.storage.get('id_user')]).then(values => {
      let name_tkn = 'Bearer '+values[0];
      let id_user = values[1];

      const httpBody = new HttpParams()
      .set('numero', numero)
      .set('fechainicial', fechainicial)
      .set('fechafinal', fechafinal);

      let headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'idUsuario': ''+id_user,
        'Authorization': name_tkn });

        let options = { headers: headers };

        try {
          this.http.post(environment.url_site+end_point, 
          httpBody, options).subscribe( 
            data => {
              this.list_array = data;
              console.log('Exist Mercan', this.list_array);

              if(this.list_array.success === true){
                this.list_array_result = this.list_array.data.data.attributes[0].data;
                console.log('list_array_result', this.list_array_result);
                this.cant_reg = this.list_array_result.length;
                this.content_mercancia = true;
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
              //this.presentAlert(err, "ERROR!");
            }
          );
        }catch (err) {
          console.log('Lo sentimos hay problemas de conexión', err);
          this.dismiss();
        }

    });

  }

  searchDespacho(busqueda, tipo, numero, fechainicial, fechafinal, end_point) {

    Promise.all([this.storage.get('name_tkn'), this.storage.get('id_user')]).then(values => {
      let name_tkn = 'Bearer '+values[0];
      let id_user = values[1];

      const httpBody = new HttpParams()
      .set('numero', numero)
      .set('type', tipo)
      .set('fechainicial', fechainicial)
      .set('fechafinal', fechafinal);

    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
      'idUsuario': ''+id_user,
      'Authorization': name_tkn });

      let options = { headers: headers };

      try {
        this.http.post(environment.url_site+end_point, 
        httpBody, options).subscribe( 
          data => {
            
            this.list_array = data;
            console.log(this.list_array);

            if(this.list_array.success === true){
              this.list_array_result = this.list_array.data.data.attributes;
              console.log('list_array_result', this.list_array_result);
              this.cant_reg = this.list_array_result.length;
              this.content_despacho = true;
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
        this.presentAlert(err, "ERROR!");
      }
    });

  }

  searchContenedores(busqueda, tipo, numero, fechainicial, fechafinal, end_point) {

    Promise.all([this.storage.get('name_tkn'), this.storage.get('id_user')]).then(values => {
      let name_tkn = 'Bearer '+values[0];
      let id_user = values[1];

      const httpBody = new HttpParams()
      .set('numero', numero)
      .set('type', tipo)
      .set('fechainicial', fechainicial)
      .set('fechafinal', fechafinal);

      let headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'idUsuario': ''+id_user,
        'Authorization': name_tkn });

        let options = { headers: headers };

        try {
          this.http.post(environment.url_site+end_point, 
          httpBody, options).subscribe( 
            data => {
              this.list_array = data;
              console.log(this.list_array);

              if(this.list_array.success === true){              
                this.list_array_result = this.list_array.data.data.attributes[0].data;
                //console.log('list_array_result', this.list_array_result);
                this.cant_reg = this.list_array_result.length;
                this.content_devolucion = true;
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
          this.presentAlert(err, "ERROR!");
        }

    });

  }

  backSearch() {
    this.navCtrl.back();
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
      this.slice += 10;
      infiniteScroll.target.complete();
    }, 1300);    
  }

}
