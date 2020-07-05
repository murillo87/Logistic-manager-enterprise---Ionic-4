import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router } from "@angular/router";

import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-filtro-operador-bl',
  templateUrl: './filtro-operador-bl.page.html',
  styleUrls: ['./filtro-operador-bl.page.scss'],
})
export class FiltroOperadorBlPage implements OnInit {

  id: string = '';

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
    private router : Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  cancelSearch() {
    this.navCtrl.back();
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

    this.router.navigate(['/result-search', { radio_detail: this.radio_detail, 
                                              numero_bl: this.numero_bl, 
                                              date_init: this.date_init_frm, 
                                              date_end: this.date_end_frm,
                                              id_site: this.id 
                        }]);
    
  }

}
