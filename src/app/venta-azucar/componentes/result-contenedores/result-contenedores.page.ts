import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, NavController, IonInfiniteScroll } from '@ionic/angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from "../../../../environments/environment";
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-result-contenedores',
  templateUrl: './result-contenedores.page.html',
  styleUrls: ['./result-contenedores.page.scss'],
})
export class ResultContenedoresPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  isLoading = false;
  numero: string = '';
  type: string = '';

  end_point: any = '';

  list_array_result: any;
  list_array: any;

  cant_reg: number = 0;
  slice: number = 10;

  constructor(private route: ActivatedRoute,
              private alertCtrl: AlertController, 
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private http: HttpClient,
              private storage: Storage) { }

  ngOnInit() {

    this.numero = this.route.snapshot.paramMap.get('numero');
    this.type = this.route.snapshot.paramMap.get('type');

    console.log('busq', this.numero, this.type);

    if(this.type === 'pendientes'){
      this.end_point = 'quedados';
      this.searchData(this.numero, this.end_point)
    }else{
      this.end_point = 'reprogramados';
      this.searchData(this.numero, this.end_point)
    }

  }

  searchData(num, end_point){

    this.presentLoading();

    //Obtengo el token, el id del usuario y la identificacion del usuario desde el local storage.
    Promise.all([this.storage.get('name_tkn'),this.storage.get('id_user')]).then(values => {
        
      let name_tkn = 'Bearer '+values[0];
      let id_user = values[1];

      const httpBody = new HttpParams()
      .set('numero', num);

      let headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'idUsuario': ''+id_user,
        'Authorization': name_tkn });
        
      let options = { headers: headers };

      try {
        this.http.post(environment.url_site+'comercializadora/contenedores/'+end_point, 
        httpBody, options).subscribe( 
          data => {

            this.list_array = data;
            console.log('this.list_array', this.list_array);

            if(this.list_array.success === true){
              this.list_array_result = this.list_array.data.data.attributes[0].data;
              console.log('sol ',this.list_array_result);
              this.cant_reg = this.list_array_result.length;
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

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.slice += 10;
      infiniteScroll.target.complete();
    }, 1300);    
  }

  backSearch() {
    this.navCtrl.back();
  }

}
