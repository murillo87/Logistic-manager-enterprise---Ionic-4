import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-filtro-pro-log',
  templateUrl: './filtro-pro-log.page.html',
  styleUrls: ['./filtro-pro-log.page.scss'],
})
export class FiltroProLogPage implements OnInit {

  myDate: String = new Date().toISOString();
  radio_detail: any = ''; 
  numero: string = '';

  constructor(private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController, 
              private navCtrl: NavController,
              private router : Router) { }

  ngOnInit() {

  }

  cancelSearch() {
    this.navCtrl.navigateRoot('/proceso-logistico');
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
      this.presentAlert("Seleccione el tipo de búsqueda.", "Error!!");
      return false;
    }
    
    /*if(this.numero == ''){
      this.presentAlert("Ingrese el número.", "Error!!");
      return false;
    }*/

    this.router.navigate(['/result-pro-log', {radio_detail: this.radio_detail, 
                                              numero: this.numero
                        }]);                        

  }

  backSearch(){    
    this.navCtrl.back();
  }

}
