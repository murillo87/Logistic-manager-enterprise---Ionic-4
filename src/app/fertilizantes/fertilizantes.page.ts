import { Component, OnInit } from '@angular/core';

import { AlertController, LoadingController, NavController, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from "../../environments/environment";
import { Storage } from '@ionic/storage';

import { FiltroPage } from '../fertilizantes/componentes/filtro/filtro.page';

@Component({
  selector: 'app-fertilizantes',
  templateUrl: './fertilizantes.page.html',
  styleUrls: ['./fertilizantes.page.scss'],
})
export class FertilizantesPage implements OnInit {

  options: boolean = false;
  googleChartLibrary: any;

  isLoading = false;
  list_array: any;

  credito_aprobado: any         = '';
  per_credito_aprobado: any     = '';
  credito_utilizado: any        = '';
  per_credito_utilizado: any    = '';
  credito_disponible: any       = '';
  per_credito_disponible: any   = '';

  constructor(private http: HttpClient,
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController, 
    private navCtrl: NavController,
    private storage: Storage,
    private modalController: ModalController) { }

  ngOnInit() {

    this.presentLoading();

    //Obtengo el token, el id del usuario y la identificacion del usuario desde el local storage.
    Promise.all([this.storage.get('name_tkn'),this.storage.get('id_user')]).then(values => {
        
      let name_tkn = 'Bearer '+values[0];
      let id_user = values[1];

      let headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'idUsuario': ''+id_user,
        'Authorization': name_tkn });
        
      let options = { headers: headers };

      try {
        this.http.get(environment.url_site+'agricola/cupo-credito', 
        options).subscribe( 
          data => {

            this.list_array = data;
            console.log(this.list_array);

            if(this.list_array.success === true){

              this.credito_aprobado        = this.list_array.data.credito_aprobado;
              this.per_credito_aprobado    = this.list_array.data.per_credito_aprobado;
              this.credito_utilizado       = this.list_array.data.credito_utilizado;
              this.per_credito_utilizado   = this.list_array.data.per_credito_utilizado;
              this.credito_disponible      = this.list_array.data.credito_disponible;
              this.per_credito_disponible  = this.list_array.data.per_credito_disponible;

              if(this.per_credito_disponible == 0 && this.per_credito_utilizado == 0){
                this.presentAlert("No se pueden graficar los datos porque los valores están nulos.", "Alerta!!");
              }else{
                this.useVanillaJSLibrary();
              }

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
      }
    
    });

  }

  useVanillaJSLibrary() {
    this.googleChartLibrary = (<any>window).google;
    // Load the Visualization API and the corechart package.
    this.googleChartLibrary.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    this.googleChartLibrary.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  drawChart () {
    // Create the data table.
    var data = new this.googleChartLibrary.visualization.DataTable();
    data.addColumn('string', 'Activity Name');
    data.addColumn('number', 'Hours');
    data.addRows([
      ['Por pagar', this.per_credito_utilizado],
      ['Disponible', this.per_credito_disponible]
    ]);

    // Instantiate and draw our chart, passing in some options.
    var chart = new this.googleChartLibrary.visualization
      .PieChart(document.getElementById('pie-chart-div'));

    chart.draw(data, {
      'title': 'Creditos',
      'width': 400,
      'height': 250,
        slices: {
          0: { color: '#3a673c' },
          1: { color: '#5a9c5e' }
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

  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  ferOptions() {
    if(this.options === false){
      this.options = true;
    }else if(this.options === true){
      this.options = false;
    }
  }

  async openModal() {

    const modal = await this.modalController.create({
      component: FiltroPage,
      componentProps: {
      }
    });    

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {

      }
    });
 
    return await modal.present();
  } 

}
