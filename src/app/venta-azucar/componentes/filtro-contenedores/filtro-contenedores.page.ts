import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router } from "@angular/router";

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-contenedores',
  templateUrl: './filtro-contenedores.page.html',
  styleUrls: ['./filtro-contenedores.page.scss'],
})
export class FiltroContenedoresPage implements OnInit {

  numero: string = '';
  type: string = '';

  constructor(private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController, 
              private navCtrl: NavController,
              private router : Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.type = this.route.snapshot.paramMap.get('type');
    console.log(this.type);

  }

  cancelSearch() {
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
    
    if(this.numero == ''){
      this.presentAlert("Ingrese el número.", "Error!!");
      return false;
    }

    this.router.navigate(['/result-contenedores', {numero: this.numero, type: this.type} ]);                        

  }

}
