import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController, LoadingController, NavController } from '@ionic/angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from "../../../../environments/environment";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-agregar-observacion',
  templateUrl: './agregar-observacion.page.html',
  styleUrls: ['./agregar-observacion.page.scss'],
})
export class AgregarObservacionPage implements OnInit {

  observation:string = '';
  list_array: any;

  modelId:string;
  modalType:string;

  isLoading = false;

  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private http: HttpClient,
              private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController, 
              private navCtrl: NavController,
              private storage: Storage) { }

  ngOnInit() {
    console.table(this.navParams);
    this.modalType = this.navParams.data.paramType;
    this.modelId = this.navParams.data.paramID;
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

  btnSearch(){

    if(this.observation == ''){
      alert('Por favor digite observación');
    }else{

      this.presentLoading();
      //Obtengo el token, el id del usuario y la identificacion del usuario desde el local storage.
      Promise.all([this.storage.get('name_tkn'),this.storage.get('id_user'),this.storage.get('identification')]).then(values => {
        
        let name_tkn = 'Bearer '+values[0];
        let id_user = values[1];
        let identification = values[2];
      
        const httpBody = new HttpParams()
          .set('id_cliente', identification)
          .set('observacion', this.observation)
          .set('tipo', this.modalType)
          .set('id', this.modelId);

        let headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest',
          'idUsuario': ''+id_user,
          'Authorization': name_tkn });
          
        let options = { headers: headers };

        try {
          this.http.post(environment.url_site+'bl/cont/observaciones', 
          httpBody, options).subscribe( 
            data => {

              this.list_array = data;
              console.log(this.list_array);

              if(this.list_array.success === true){
                this.presentAlert(this.list_array.message, "Felicitaciones!!");
                this.dismiss();
                this.closeModal();
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

  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
