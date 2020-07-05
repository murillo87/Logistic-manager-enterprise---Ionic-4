import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router } from "@angular/router";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from "../../../../environments/environment";
import * as moment from 'moment';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.page.html',
  styleUrls: ['./filtro.page.scss'],
})
export class FiltroPage implements OnInit {

  list_array_result: any;

  radio_search: any = '';
  radio_detail: any = '';  
  list_array: any;

  myDate: String = new Date().toISOString();
  numero_bl: any = '';
  date_init: any = '';
  date_end: any = '';

  date_init_frm: any = '';
  date_end_frm: any = '';

  constructor(private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController, 
              private navCtrl: NavController,
              private http: HttpClient,
              private router : Router
              ) { }

  ngOnInit() {
    
  }

  cancelSearch() {
    this.navCtrl.navigateRoot('/operador-logistico');
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

  btnSearch() {

    if(this.radio_search == ''){
      this.presentAlert("Seleccione estado de búsqueda.", "Error!!");
      return false;
    }

    if(this.radio_detail == ''){
      this.presentAlert("Seleccione detalle de búsqueda.", "Error!!");
      return false;
    }

    var date_init = '';
    var date_end = '';

    if(this.date_init != '' && this.date_end != ''){

      this.date_init_frm = moment(this.date_init).format('DD-MM-YYYY');
      this.date_end_frm = moment(this.date_end).format('DD-MM-YYYY');

      if(date_init > date_end){
        this.presentAlert("La fecha inicial no puede ser superior a la final.", "Error!!");
        return false;
      }

    }

    console.log('Init Busqueda BL', this.numero_bl);

    this.router.navigate(['/result-logistico', { radio_search: this.radio_search, 
                                                radio_detail: this.radio_detail, 
                                                numero_bl: this.numero_bl, 
                                                date_init: this.date_init_frm, 
                                                date_end: this.date_end_frm 
                        }]);
    
  }

}
