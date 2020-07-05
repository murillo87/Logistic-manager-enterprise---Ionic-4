import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertController, LoadingController, NavController, ModalController, IonContent, Events } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from "../../../../environments/environment";
import { Storage } from '@ionic/storage';

import { CantidadPedidoPage } from '../cantidad-pedido/cantidad-pedido.page';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  isLoading = false;
  list_array: any;

  list_array_pay: any;
  list_array_city: any;
  list_array_products: any;

  list_array_pay_res: any;

  result_ok: boolean = false;
  result_error: boolean = false;
  result_warning: boolean = false;

  data_view: number = 0;
  btn_cart: boolean = true;

  place: string = 'Buga';
  pay_data  : any = '';  
  pay_data_type  : any = '';  
  pay_data_value  : any = '';  

  pro_data  : any = '';  
  pro_data_name  : any = '';  
  pro_data_cod_mat  : any = '';  
  pro_data_und  : any = '';  
  pro_data_price  : any = '';  
  pro_data_type  : any = '';  

  type  : any = '';  

  cont_type_1: boolean = false;
  cont_type_2: boolean = false;

  dataReturned:any; 

  pay_method: any[] = [
    {
      id: 1,
      first: 30
    },
    {
      id: 2,
      first: 45
    },
    {
      id: 3,
      first: 60
    },
    {
      id: 4,
      first: 'Factoring'
    },
    {
      id: 5,
      first: 'Contado'
    }
  ];

  val_ind: number = 0;
  val_cant: number = 1;

  subtotal: number = 0;
  descuentos: number = 0;
  total: number = 0;

  pay_data_str: any = '';

  result_arr: any = [];

  action: number;

  constructor(private http: HttpClient,
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController, 
    private navCtrl: NavController,
    private storage: Storage,
    private modalController: ModalController,
    public events: Events) { }

  ngOnInit() {

    /*const obj = {"0004": "Pagadero inmediatamente sin DPP, Fecha base el Fin del mes",
    "0005": "Pagadero inmediatamente sin DPP, Fecha base el 10 de m
    
    es siguiente",
    "0006": "Hasta el Fin del mes 4 % descuento, al 15 del mes siguiente 2 % descuento, hasta el 15. en el mes 2 sin DPP"};

    const mapped = Object.entries(obj).map(([type, value]) => ({type, value}));
    console.log('mapped', mapped);*/

    this.productos();
    //this.ciudades();

    if(this.data_view == 1){
      this.result_ok = true;
      this.btn_cart = false;
    }else if(this.data_view == 2){
      this.result_error = true;
      this.btn_cart = false;
    }else if(this.data_view == 3){
      this.result_warning = true;
      this.btn_cart = false;
    }

  }

  ionViewWillEnter() {
    
    this.getDataCart();

  }

  ionViewWillLeave() {

    if(this.result_arr.length  > 0){

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

      //console.log('Array Leave ', data);
      const json = JSON.stringify(data);

      //Obtengo el token, el token del usuario y el id del usuario desde el local storage.
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
          this.http.post(environment.url_site+'agricola/notificar/pedido', 
          httpBody, options).subscribe(data => {

              this.list_array = data;

              //console.log('this.list_array_leave', this.list_array);

              if(this.list_array.success === true){               
                
              }else{
                
              }

            }, 
            err => {
              console.log("ERROR!: ", err);
              this.presentAlert('No hay conexión!!', 'Alerta');
              //this.dismiss();
            }
          );
        }catch (error) {
          this.presentAlert(error, 'Error');
          //this.dismiss();
        }
      
      });

      //Limpio los productos almacenados en el carrito de pedidos.
      this.cleanCart();

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

  getDataCart() {

    this.result_arr = [];
    this.val_cant = 1;

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

        //if(values[0] !== null){
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
                
        }

      });

    }

  }

  cleanCart(){
    //Función para limipiar los productos en el carrito de pedidos.
    for(var i=0; i<=30; i++) {
      this.storage.set('state'+i, '');
      this.storage.set('val_ind'+i, '');
      this.storage.set('place'+i, '');
      this.storage.set('pay_data'+i, '');
      this.storage.set('pay_data_value'+i, '');
      this.storage.set('pro_data_name'+i, '');
      this.storage.set('pro_data_cod_mat'+i, '');
      this.storage.set('val_cant'+i, '');
      this.storage.set('unid'+i, '');
      this.storage.set('price'+i, '');
      this.storage.set('pro_data_type'+i, '');
    } 

  }

  scrollToBottom() {
    this.content.scrollToBottom();
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  formasPago(){

    //Obtengo el token del usuario y el id del usuario desde el local storage.
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
        this.http.post(environment.url_site+'agricola/consulta/formasDePago', 
        null, options).subscribe(data => {

            this.list_array = data;

            console.log('this.list_array_pay', this.list_array);

            if(this.list_array.success === true){
              this.list_array_pay = this.list_array.data.data.attributes[0]['data'][0];
              //console.log('form pay ',this.list_array_pay);
              //Convierto objeto de datos a array
              this.list_array_pay_res = Object.entries(this.list_array_pay).map(([type, value]) => ({type, value}));
              //this.dismiss();

            }else{
              this.presentAlert("Ha ocurrido un error de datos en la consulta del servicio.", "Alerta!!");
              //this.dismiss();
            }

          }, 
          err => {
            console.log("ERROR!: ", err);
            this.presentAlert('No hay conexión!!', 'Alerta');
            //this.dismiss();
          }
        );
      }catch (error) {
        console.log('Lo sentimos hay problemas de conexión', error);
        //this.dismiss();
      }
    
    });

  }

  ciudades(){

    //Obtengo el token del usuario y el id del usuario desde el local storage.
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
        this.http.get(environment.url_site+'agricola/consulta/ciudades', 
        options).subscribe( 
          data => {
            this.list_array = data;

            //console.log('this.list_array_cities', this.list_array);

            if(this.list_array.success === true){
              //this.list_array_city = this.list_array.data.data[0].attributes[0]['data'][0];
              //this.list_array_city = this.list_array.data.data.attributes[0]['data'];
              //console.log('list_array_city', this.list_array_city);
              //this.dismiss();
            }else{
              this.presentAlert("Ha ocurrido un error de datos en la consulta del servicio.", "Error!!");
              //this.dismiss();
            }

          }, 
          err => {
            console.log("ERROR!: ", err);
            this.presentAlert('No hay conexión!!', 'Alerta');
            //this.dismiss();
          }
        );
      }catch (error) {
        console.log('Lo sentimos hay problemas de conexión', error);
        //this.dismiss();
      }
    
    });

  }

  productos(){

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
        this.http.get(environment.url_site+'agricola/consulta/productos', 
        options).subscribe( 
          data => {
            this.list_array = data;

            console.log('this.list_array', this.list_array);

            if(this.list_array.success === true){
              this.list_array_products = this.list_array.data.data[0].attributes[0]['data'];
              console.log('list_array_products', this.list_array_products);
              this.formasPago();
              //this.ciudades();
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
      }catch (error) {
        console.log('Lo sentimos hay problemas de conexión', error);
        this.dismiss();
      }
    
    });

  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: 'Espere un momento...',
      duration: 20000
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
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

  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  payChange(){
    this.pay_data_type = this.pay_data.type;
    this.pay_data_value = this.pay_data.value;
    //console.log('pay fk ',this.pay_data_type, this.pay_data_value);
  }

  onChange(){

    var mayor = 0;
    var data_cont = this.result_arr.length;
 
    for(var i = 0; i < data_cont; i++){
      //console.log('(this.result_arr[i]', this.result_arr[i]);
      if (this.result_arr[i].val_ind >= mayor)
      {
        mayor = this.result_arr[i].val_ind + 1;
      };
    }

    this.val_ind = mayor;

    if(this.val_ind > 0){

      var msg = 'Acabas de cambiar el tipo de pedido? Perderás los cambios que has hecho hasta el momento.';

      this.presentAlertConfirmSelect(msg, this.type); 

    }else{

      if( this.type === 'Estandar' ){
        this.cont_type_1 = false;
        this.cont_type_2 = true;
      }else if( this.type === 'Sencillo' ){
        this.cont_type_1 = true;
        this.cont_type_2 = false;
      }else{
        this.cont_type_1 = false;
        this.cont_type_2 = false;
      }

    }

  }

  changeProd(){
    
    this.pro_data_name = this.pro_data.nombre;
    this.pro_data_und = this.pro_data.atributos['0']['und'];
    this.pro_data_price = this.pro_data.atributos['0']['precio_saco'];
    this.pro_data_type = this.pro_data.atributos['0']['tipo'];

    //console.log(this.pro_data_price, this.pro_data_type);

    setTimeout(()=>{this.scrollToBottom();}, 300); 

  }

  async presentAlertConfirmSelect(textM, type) {
    const alert = await this.alertCtrl.create({
      header: 'Información!',
      message: textM,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Continuar',
          handler: () => {

            if(type === 'Estandar'){
              this.cont_type_1 = false;
              this.cont_type_2 = true;
            }else if(type === 'Sencillo'){
              this.cont_type_1 = true;
              this.cont_type_2 = false;
            }else{
              this.cont_type_1 = false;
              this.cont_type_2 = false;
            }

            this.cleanCart();

            let TIME_IN_MS = 1500;
              let hideFooterTimeout = setTimeout( () => {
                this.getDataCart();
            }, TIME_IN_MS);

          }
        }
      ]
    });

    await alert.present();
  }

  addCart() { 
    
    var mayor = 0;
    var data_cont = this.result_arr.length;
 
    for(var i = 0; i < data_cont; i++){
      //console.log('(this.result_arr[i]', this.result_arr[i]);
      if (this.result_arr[i].val_ind >= mayor)
      {
        mayor = this.result_arr[i].val_ind + 1;
      };
    }

    this.val_ind = mayor;
        
    console.log('mayor', this.val_ind);

    if(this.place == ''){
      this.presentAlert("Seleccione lugar de entrega", "Error!!");
      return false;
    }

    if(this.pay_data == ''){
      this.presentAlert("Seleccione forma de pago.", "Error!!");
      return false;
    }

    if(this.type == ''){
      this.presentAlert("Seleccione el tipo.", "Error!!");
      return false;
    }

    if(this.pro_data == ''){
      this.presentAlert("Seleccione el tipo.", "Error!!");
      return false;
    }

    if(this.val_cant == 0 || this.val_cant === null){
      this.presentAlert("Seleccione la cantidad.", "Error!!");
      return false;
    }

    if(this.pro_data_price == 0){
      this.presentAlert("El precio del producto no tiene valor asignado.", "Error!!");
      return false;
    }

    this.pro_data_cod_mat = this.pro_data.atributos['0']['cod_material'];

    this.openModal(this.place, this.pro_data_cod_mat, this.val_cant, this.action = 1);

  }

  async openModal(place, pro_data_cod_mat, val_cant, action) {

    const modal = await this.modalController.create({
      component: CantidadPedidoPage,
      componentProps: {
        "action": this.action,
        "val_ind": this.val_ind,
        "place": this.place,
        "pay_data": this.pay_data_type,
        "pay_data_value": this.pay_data_value,
        "pro_data_name": this.pro_data_name,
        "pro_data_cod_mat": pro_data_cod_mat,
        "val_cant": val_cant,
        "unid": this.pro_data_und,
        "price": this.pro_data_price,
        "pro_data_type": this.pro_data_type
      }
    });    

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        //Pedido Satisfactorio
        if(dataReturned.data === 'success'){

          this.result_ok = true;

          this.pro_data_und = '';
          this.pro_data_price = '';
          this.pro_data_type = '';
          this.pro_data = '';

          setTimeout(()=>{this.scrollToTop();}, 200);
          this.cleanCart();

          let TIME_IN_MS = 1500;
            let hideFooterTimeout = setTimeout( () => {
            this.getDataCart();
          }, TIME_IN_MS);

          //Pedido con errores
        }else if(dataReturned.data === 'false'){

          this.result_error = true;

          this.pro_data_und = '';
          this.pro_data_price = '';
          this.pro_data_type = '';
          this.pro_data = '';

          setTimeout(()=>{this.scrollToTop();}, 200);
          this.getDataCart();

          //Solo agrego más productos
        }else {

          //this.val_ind = dataReturned.data;
          this.pro_data = '';
          //this.pay_data = '';
          //this.type = '';
          this.pro_data_und = '';
          this.pro_data_price = '';
          this.pro_data_type = '';

          setTimeout(()=>{this.scrollToTop();}, 200);
          
          this.getDataCart();

          let TIME_IN_MS = 2000;
            let hideFooterTimeout = setTimeout( () => {
            this.reCalculate(this.result_arr);
          }, TIME_IN_MS);

        }

      }
    });
 
    return await modal.present();
  }  

  goCart(){

    var mayor = 0;
    var data_cont = this.result_arr.length;
 
    for(var i = 0; i < data_cont; i++){
      //console.log('(this.result_arr[i]', this.result_arr[i]);
      if (this.result_arr[i].val_ind >= mayor)
      {
        mayor = this.result_arr[i].val_ind + 1;
      };
    }

    this.val_ind = mayor;

    if(this.val_ind == 0){
      this.presentAlert("Debe agregar productos antes!!.", "Error!!");
    }else{
      this.openModal(null, null, null, this.action = 0);
    }

  }

  addVal() {
    //console.log(this.val_cant);
    this.val_cant++;
  }

  removeVal() {
    //console.log(this.val_cant);
    if(this.val_cant != 1){
      this.val_cant--;
    }    
  }

}
