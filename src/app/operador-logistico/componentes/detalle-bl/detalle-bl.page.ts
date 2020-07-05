import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AlertController, LoadingController, NavController, ModalController } from '@ionic/angular';

import { Router } from '@angular/router';

import { environment } from "../../../../environments/environment";
import { Storage } from '@ionic/storage';

import { ActivatedRoute } from '@angular/router';
import { AgregarObservacionPage } from '../agregar-observacion/agregar-observacion.page';

@Component({
  selector: 'app-detalle-bl',
  templateUrl: './detalle-bl.page.html',
  styleUrls: ['./detalle-bl.page.scss'],
})
export class DetalleBlPage implements OnInit {

  dataReturned:any;

  list_array: any;
  id: any;
  result_data: Array<any>;
  list_array_result: Array<any>;
  list_array_cont: Array<any>;
  list_array_track: Array<any>;

  isLoading = false;

  classNameTab1: string = '';
  classNameTab2: string = '';
  classNameTab3: string = '';

  constructor(private http: HttpClient,
              private loadingCtrl: LoadingController, 
              private navCtrl: NavController, 
              private router: Router,
              private storage: Storage,
              private alertCtrl: AlertController, 
              private route: ActivatedRoute,
              private modalController: ModalController) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
    //console.log(this.id);

    this.classNameTab1 = 'classNameTab1';
    setTimeout(function(){
      document.getElementById("defaultOpen").click();
    }, 1000);

    /* Consult */
    this.presentLoading();
    this.searchService(this.id);

  }

  searchService(busqueda) {
    //Obtengo el token y el id del usuario desde el local storage.
    Promise.all([this.storage.get('name_tkn'), this.storage.get('id_user')]).then(values => {
      let name_tkn = 'Bearer '+values[0];
      let id_user = values[1];

      const httpBody = new HttpParams()
      .set('id_bl', busqueda);

      let headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'idUsuario': ''+id_user,
        'Authorization': name_tkn });

      let options = { headers: headers };

      try {
        this.http.post(environment.url_site+'serviciosLogisticos/getDetalleBl', 
        httpBody, options).subscribe( 
          data => {
            this.list_array = data;
            console.log(this.list_array);
            
            if(this.list_array.success === true){
              console.log(this.list_array.data.data.attributes[0].data);

              this.list_array_result = this.list_array.data.data.attributes[0].data;
              this.list_array_cont = this.list_array.data.data.attributes[1].data;
              console.log('this.list_array_cont ', this.list_array_cont);
              this.list_array_track = this.list_array.data.data.relationships.tracking.data;
              
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

  async openModal() {
    const modal = await this.modalController.create({
      component: AgregarObservacionPage,
      componentProps: {
        "paramID": this.id,
        "paramType": "bl"
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
 
    return await modal.present();
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
      this.classNameTab3 = '';  
    }
    if(actionName == 'Tab2'){ 
      this.classNameTab1 = '';
      this.classNameTab2 = 'tab-detail2';
      this.classNameTab3 = '';  
    }
    if(actionName == 'Tab3'){ 
      this.classNameTab1 = '';
      this.classNameTab2 = '';
      this.classNameTab3 = 'tab-detail3';  
    }
  }

  addObservation() {

    console.log('Observation');
    this.openModal();

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

  detailBL(res){    
    console.log('Entraste Contenedores', res);
    this.navCtrl.navigateRoot('operador-contenedores/'+res);
  }

  backSearch(){    
    this.navCtrl.back();
  }

}
