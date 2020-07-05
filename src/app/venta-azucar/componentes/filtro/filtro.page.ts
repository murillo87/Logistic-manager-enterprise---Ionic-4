import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController,  NavController } from '@ionic/angular';
import { Router } from "@angular/router";

import * as moment from 'moment';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.page.html',
  styleUrls: ['./filtro.page.scss'],
})
export class FiltroPage implements OnInit {
  
  list_array: any;
  list_array_result: any;

  myDate: String = new Date().toISOString();
  
  radio_detail: any = '';
  numero: any = '';
  date_init: any = '';
  date_end: any = '';

  date_init_frm: any = '';
  date_end_frm: any = '';

  constructor(private navCtrl: NavController,
              private alertCtrl: AlertController,
              private router : Router) { }

  ngOnInit() {
  }

  async presentAlert(mensaje, nState) {
    const alert = await this.alertCtrl.create({
    message: mensaje,
    subHeader: nState,
    buttons: ['Cerrar']
   });
   await alert.present(); 
  }

  cancelSearch() {
    this.navCtrl.back();
  }

  btnSearch() {

    if(this.radio_detail === ''){
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

    console.log('Init Busqueda BL', this.numero);

    this.router.navigate(['/result-nominaciones', {radio_detail: this.radio_detail, 
                                                  numero: this.numero, 
                                                  date_init: this.date_init_frm, 
                                                  date_end: this.date_end_frm 
                        }]);

  }

  backSearch(){    
    this.navCtrl.back();
  }

}
