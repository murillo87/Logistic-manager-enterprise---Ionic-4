import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, AlertController, LoadingController, 
NavController, Events, IonInfiniteScroll } from '@ionic/angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

import { environment } from "../../../../environments/environment";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-cantidad-pedido',
  templateUrl: './cantidad-pedido.page.html',
  styleUrls: ['./cantidad-pedido.page.scss'],
})
export class CantidadPedidoPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  slice: number = 5;
  isLoading = false;
  list_array: any;

  place  : any = ''; 
  pay_data  : any = ''; 
  pay_data_value  : any = ''; 
  pro_data_name  : any = ''; 
  pro_data_cod_mat  : any = ''; 
  val_cant  : any = ''; 
  unid  : any = ''; 
  price  : any = ''; 
  pro_data_type  : any = ''; 

  val_test: any;

  pro_code: any = [];
  pro_cant: any = [];
  pro_type: any = [];

  val1: any = [];

  val_ind: number;

  result_arr: any = [];

  action: number;

  subtotal: number = 0;
  descuentos: number = 0;
  total: number = 0;

  subtotal_end: any = 0;
  descuentos_end: any = 0;
  total_end: any = 0;

  pay_data_str: any = '';

  constructor(private modalController: ModalController,
    private navParams: NavParams,
    private http: HttpClient,
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController, 
    private navCtrl: NavController,
    private storage: Storage,
    public router: Router,
    public events: Events) {

    }

  ionViewWillEnter() {
  
    this.presentLoading();

    console.table(this.navParams);

    this.action = this.navParams.data.action;

    if(this.action == 1){

      this.val_ind = this.navParams.data.val_ind;
      this.place = this.navParams.data.place;
      this.pay_data = this.navParams.data.pay_data;
      this.pay_data_value = this.navParams.data.pay_data_value;
      this.pro_data_name = this.navParams.data.pro_data_name;
      this.pro_data_cod_mat = this.navParams.data.pro_data_cod_mat;
      this.val_cant = this.navParams.data.val_cant;
      this.unid = this.navParams.data.unid;
      this.price = this.navParams.data.price;
      this.pro_data_type = this.navParams.data.pro_data_type;

      this.storage.set('val_ind'+this.val_ind, this.val_ind);
      this.storage.set('place'+this.val_ind, this.place);
      this.storage.set('pay_data'+this.val_ind, this.pay_data);
      this.storage.set('pay_data_value'+this.val_ind, this.pay_data_value);
      this.storage.set('pro_data_name'+this.val_ind, this.pro_data_name);
      this.storage.set('pro_data_cod_mat'+this.val_ind, this.pro_data_cod_mat);
      this.storage.set('val_cant'+this.val_ind, this.val_cant);
      this.storage.set('unid'+this.val_ind, this.unid);
      this.storage.set('price'+this.val_ind, this.price);
      this.storage.set('pro_data_type'+this.val_ind, this.pro_data_type);
      this.storage.set('state'+this.val_ind, 1);

      let TIME_IN_MS = 2500;
      let hideFooterTimeout = setTimeout( () => {

        this.getDataCart();
        this.dismiss();

      }, TIME_IN_MS);

    }else{

      let TIME_IN_MS = 2500;
      let hideFooterTimeout = setTimeout( () => {

        this.getDataCart();
        this.dismiss();

      }, TIME_IN_MS);

    }

  }  

  ngOnInit() { 

  }

  getDataCart() {    

    for(var i=0; i<=30; i++) {

      Promise.all([this.storage.get('val_ind'+i), 
      this.storage.get('place'+i), 
      this.storage.get('pay_data'+i), 
      this.storage.get('pay_data_value'+i), 
      this.storage.get('pro_data_name'+i), 
      this.storage.get('pro_data_cod_mat'+i), 
      this.storage.get('val_cant'+i), 
      this.storage.get('unid'+i), 
      this.storage.get('price'+i), 
      this.storage.get('pro_data_type'+i), 
      this.storage.get('state'+i)]).then(values => {

        if(values[10] == 1){
        
            this.result_arr.push({ val_ind: values[0], 
                    place: values[1],
                    pay_data: values[2],
                    pay_data_value: values[3],
                    pro_data_name: values[4],
                    pro_data_cod_mat: values[5],
                    val_cant: values[6],
                    unid: values[7],
                    price: values[8],
                    pro_data_type: values[9],
                    state: values[10]
            });

            this.pay_data_str = values[2];

            //console.log('values[0] ',values[0]);
            console.log('mmm ',this.result_arr);
                  
        }

      });

    }

  }

  reCalculate(_arr){

    var tot = 0;

    _arr.forEach(function(element) {
      tot += element.price * element.val_cant;
    });
    
    this.subtotal = tot;
    this.total = this.subtotal - this.descuentos;

  }

  addFinish() {

    if(this.result_arr.length == 0){
      this.presentAlert("No tiene productos agregados.", "Error!!");
      return false;
    }

    this.reCalculate(this.result_arr);

    var ciudad = "BUGA"; //Quemado

    var data =  {
                  "subtotal":this.subtotal,
                  "descuentos":this.descuentos,
                  "total":this.total,
                  "Ciudad":ciudad,
                  "condicionpago":this.pay_data_str,
                  "productos":[]
                };

    this.result_arr.forEach(function(element) {
      data.productos.push({
                          "cod_material": element.pro_data_cod_mat,
                          "cantidad": ''+element.val_cant,
                          "tipo": element.pro_data_type
                        });
    });

    this.presentAlertConfirmExecuteBuy(data);

  }

  async presentAlertConfirmExecuteBuy(element) {

    this.subtotal_end = new Intl.NumberFormat().format(this.subtotal);
    this.total_end = new Intl.NumberFormat().format(this.total);
    this.descuentos_end = new Intl.NumberFormat().format(this.descuentos);

    if(this.total_end == 0){
     this.presentAlert('Espere mientras cargan valores o agregue productos e intente nuevamente.', 'Alerta!!');
     return false;
    }

    const alert = await this.alertCtrl.create({
      header: 'Confirmar Pedido!',
      message: 'Subtotal: <b>'+this.subtotal_end+'</b><br/> Descuento: <b>'+this.descuentos_end+'</b><br/> Total: <b>'+this.total_end+'</b>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Hacer pedido',
          handler: () => {

            //console.log('json confirm ', element);
            const json = JSON.stringify(element);
            console.log('json String Prod', json); 

            this.presentLoading();

            //Obtengo el token del usuario y el id del usuario desde el local storage.
            Promise.all([this.storage.get('name_tkn'),this.storage.get('id_user')]).then(values => {
              
              const httpBody = new HttpParams()
              .set('productos', json);

              let name_tkn = 'Bearer '+values[0];
              let id_user = values[1];

              let headers = new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest',
                'idUsuario': ''+id_user,
                'Authorization': name_tkn });
                
              let options = { headers: headers };

              try {
                this.http.post(environment.url_site+'agricola/radicar/pedido', 
                httpBody, options).subscribe(data => {

                    this.list_array = data;

                    console.log('this.list_array_order', this.list_array);

                    if(this.list_array.success === true){
                      
                      this.presentAlert(this.list_array.message, "Felicitaciones!!");
                      this.dismiss();

                      let TIME_IN_MS = 2500;
                      let hideFooterTimeout = setTimeout( () => {

                        var code = 'success';

                        this.closeModalSuccessOrder(code);

                      }, TIME_IN_MS);

                    }else{
                      this.presentAlert(this.list_array.message, "Error!!");
                      this.dismiss();

                      let TIME_IN_MS = 2500;
                      let hideFooterTimeout = setTimeout( () => {

                        var code = 'false';

                        this.closeModalSuccessOrder(code);

                      }, TIME_IN_MS);

                    }

                  }, 
                  err => {
                    console.log("ERROR!: ", err);
                    this.presentAlert('No hay conexión!!', 'Alerta');
                    this.dismiss();
                  }
                );
              }catch (error) {
                console.log('Lo sentimos hay problemas de conexión', error);
                this.dismiss();
              }
            
            });

          }
        }
      ]
    });

    await alert.present();
  }

  async closeModalSuccessOrder(code) {
    await this.modalController.dismiss(code);
  }

  async closeModal() {
    //const onClosedData: string = "Wrapped Up!";
    this.val_ind = this.result_arr.length;
    await this.modalController.dismiss(this.val_ind);
  }

  delItem(item) {

    this.presentAlertConfirmDel('Desea eliminar este producto?', item);

  }

  addMore(){
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

  async presentAlertConfirmDel(textM, item) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar!',
      message: textM,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Continuar',
          handler: () => {

            this.presentLoading();
            
            console.log('item ', item);
            this.storage.set('state'+item, 0);
            this.result_arr = [];

            let TIME_IN_MS = 2500;
              let hideFooterTimeout = setTimeout( () => {

                this.getDataCart();
                this.dismiss();

            }, TIME_IN_MS);

            let TIME_IN_MS2 = 3500;
              let hideFooterTimeout2 = setTimeout( () => {

                  this.reCalculate(this.result_arr);

            }, TIME_IN_MS2);
            
            console.log('Confirm Okay');

          }
        }
      ]
    });

    await alert.present();
  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: 'Espere un momento...',
      duration: 15000
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
      this.slice += 5;
      infiniteScroll.target.complete();
    }, 1300);    
  }

}
