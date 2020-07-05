import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from "../../../../environments/environment";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-pro-log-det',
  templateUrl: './pro-log-det.page.html',
  styleUrls: ['./pro-log-det.page.scss'],
})
export class ProLogDetPage implements OnInit {

  id: any;
  isLoading = false;
  list_array_result: any;
  list_array: any;

  booking: any = '';
  entrega: any = '';

  cant_nom: any = '';
  cant_ing: any = '';
  cant_emb: any = '';
  pend_emb: any = '';

  cant_sacos: any = '';
  cant_sac_emb: any = '';
  cant_sac_pen: any = '';
  total_exist: any = '';
  falt_carga: any = '';

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController, 
    private navCtrl: NavController,
    private storage: Storage) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getData(this.id);

  }

  getData(Detail) {

    this.presentLoading();

    //Obtengo el token y el id del usuario desde el local storage.
    Promise.all([this.storage.get('name_tkn'),this.storage.get('id_user')]).then(values => {
        
      let name_tkn = 'Bearer '+values[0];
      let id_user = values[1];

      const httpBody = new HttpParams()
      .set('type', 'entrega')
      .set('numero', Detail);

      let headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'idUsuario': ''+id_user,
        'Authorization': name_tkn });
        
      let options = { headers: headers };

      try {
        this.http.post(environment.url_site+'comercializadora/proceso/logistico/detalle', 
        httpBody, options).subscribe( 
          data => {

            this.list_array = data;
            console.log('this.list_array', this.list_array);

            if(this.list_array.success === true){
              
              this.booking = this.list_array.data.data.attributes[0].booking;
              this.entrega = this.list_array.data.data.attributes[0].entrega;

              this.cant_nom = this.list_array.data.data.attributes[0].contenedores.cantidadNominados;
              this.cant_ing = this.list_array.data.data.attributes[0].contenedores.cantidadDeContenedoresIngresados;
              this.cant_emb = this.list_array.data.data.attributes[0].contenedores.cantidadDeEmbalados;
              this.pend_emb = this.list_array.data.data.attributes[0].contenedores.pendientesPorEmbalar;

              this.cant_sacos = this.list_array.data.data.attributes[0].carga.cantidadDeSacosNominados;
              this.cant_sac_emb = this.list_array.data.data.attributes[0].carga.cantidadDeSacosEmbalados;
              this.cant_sac_pen = this.list_array.data.data.attributes[0].carga.cantidadTotalDeSacosPendientePorEmbalar;
              this.total_exist = this.list_array.data.data.attributes[0].carga.totalExistencia;
              this.falt_carga = this.list_array.data.data.attributes[0].carga.faltanteDeCarga;
              
              this.dismiss();

            }else{
              this.presentAlert("Ha ocurrido un error de datos en la consulta del servicio.", "Error!!");
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

  backPage() {
    this.navCtrl.back();
  }

}
