import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";

import * as moment from 'moment';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.page.html',
  styleUrls: ['./filtro.page.scss'],
})
export class FiltroPage implements OnInit { 

  myDate: String = new Date().toISOString();
  numero_bl: any = '';
  date_init: any = '';
  date_end: any = '';

  date_init_frm: any = '';
  date_end_frm: any = '';

  constructor(private route: ActivatedRoute,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController, 
              private navCtrl: NavController,
              private router : Router,
              private modalController: ModalController) { }

  ngOnInit() {
    
  }

  btnSearch() {

    if(this.numero_bl == '' && this.date_init == '' && this.date_end == ''){

      this.presentAlert('Ingrese al menos un parámetro de búsqueda!!', 'Error');
      return false;
      
    }
    if(this.date_init != ''){
      this.date_init_frm = moment(this.date_init).format('DD-MM-YYYY');
    }
    if(this.date_end != ''){
      this.date_end_frm = moment(this.date_end).format('DD-MM-YYYY');
    }

    this.router.navigate(['/result-facturas', { numero_bl:  this.numero_bl, 
                                                date_init:  this.date_init_frm, 
                                                date_end:   this.date_end_frm
    }]);

    this.closeModal();
    
  }

  async presentAlert(mensaje, nState) {
    const alert = await this.alertCtrl.create({
    message: mensaje,
    subHeader: nState,
    buttons: ['Cerrar']
   });
   await alert.present(); 
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  backPage() {
    this.navCtrl.back();
  }

}
