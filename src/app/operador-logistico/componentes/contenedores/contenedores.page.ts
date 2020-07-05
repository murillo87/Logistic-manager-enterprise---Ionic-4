import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AlertController, LoadingController, NavController, ModalController } from '@ionic/angular';

import { ActivatedRoute } from '@angular/router';
import { AgregarObservacionPage } from '../agregar-observacion/agregar-observacion.page';

import { environment } from "../../../../environments/environment";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-contenedores',
  templateUrl: './contenedores.page.html',
  styleUrls: ['./contenedores.page.scss'],
})
export class ContenedoresPage implements OnInit {

  isLoading = false;

  list_array: any;

  list_array_bl: any = [];
  list_array_cont: any = [];
  list_array_act: any = [];

  id: any;
  result_data: Array<any>;

  classNameTab1: string = '';
  classNameTab2: string = '';

  constructor(private http: HttpClient, 
              private navCtrl: NavController, 
              private route: ActivatedRoute,
              public modalController: ModalController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private storage: Storage) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
    //console.log(this.id);

    this.classNameTab1 = 'classNameTab1';
    setTimeout(function(){
      document.getElementById("defaultOpen").click();
    }, 1000);

    /* Consulta Contenedores */
    this.presentLoading();

    this.searchContenedores(this.id);
    

  }

  searchContenedores(busqueda) {
    //Obtengo el token y el id del usuario desde el local storage.
    Promise.all([this.storage.get('name_tkn'), this.storage.get('id_user')]).then(values => {
      let name_tkn = 'Bearer '+values[0];
      let id_user = values[1];

      const httpBody = new HttpParams()
      .set('id_contenedor', busqueda);

      let headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'idUsuario': ''+id_user,
        'Authorization': name_tkn });

      let options = { headers: headers };

      try {
        this.http.post(environment.url_site+'serviciosLogisticos/getDetalleContenedor', 
        httpBody, options).subscribe( 
          data => {
            this.list_array = data;
            console.log(this.list_array);
            
            if(this.list_array.success === true){

              this.list_array_cont = this.list_array.data.data.attributes[1].data[0];
              this.list_array_bl = this.list_array.data.data.attributes[0].data[0];
              this.list_array_act = this.list_array.data.data.relationships.tracking.data[0];

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

  openTab(evt, actionName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(actionName).style.display = "block";
    console.log(actionName);

    if(actionName == 'Tab1'){ 
      this.classNameTab1 = 'tab-detail1';
      this.classNameTab2 = ''; 
    }
    if(actionName == 'Tab2'){ 
      this.classNameTab1 = '';
      this.classNameTab2 = 'tab-detail2';
    }
  }  

  async openModal() {
    const modal = await this.modalController.create({
      component: AgregarObservacionPage,
      componentProps: {
        "paramID": this.id,
        "paramType": "cont"
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
 
    return await modal.present();
  }

  addObservation() {
    console.log('Observation');
    this.openModal();
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  backPage() {
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

}
