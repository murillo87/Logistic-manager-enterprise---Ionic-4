import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { Storage } from '@ionic/storage';

import { isNullOrUndefined } from 'util';

import { Events } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoading = false;

  email: string = '';
  password: string = '';
  login_response: any;

  var_token: any = '';
  role_user: any = '';
  id_user: any = '';
  user_identification: any = ''; 
  array_permissions: any = []; 

  constructor(private alertCtrl: AlertController,
     private loadingCtrl: LoadingController, 
     private navCtrl: NavController,
     private http: HttpClient,
     private menuCtrl: MenuController,
     private storage: Storage,
     public router: Router,
     public events: Events) { }

  ngOnInit() {

    console.log('Entraste al Login');

    Promise.all([this.storage.get('name_tkn'), this.storage.get('role_user'), this.storage.get('array_permissions')]).then(values => {
      this.var_token = values[0];
      this.role_user = values[1];
      this.array_permissions = values[2];

      console.log('this.array_permissions ', this.array_permissions);

      if(!isNullOrUndefined(this.var_token)){
        if(this.role_user === 'Admin_ciamsa_fertilizantes' || this.role_user === 'Usuario_ciamsa_fertilizantes' || this.role_user === 'Cliente_ciamsa_fertilizantes'){
          this.navCtrl.navigateRoot('/fertilizantes');
          this.events.publish( 'role:created:permissions', this.role_user, Date.now(), this.array_permissions );
        }else if(this.role_user === 'Admin_ciamsa_1' || this.role_user === 'Usuario_ciamsa_1' || this.role_user === 'Cliente_ciamsa_1'){
          this.navCtrl.navigateRoot('/venta-azucar');
          this.events.publish( 'role:created:permissions', this.role_user, Date.now(), this.array_permissions );
        }
        else{
          this.navCtrl.navigateRoot('/operador-logistico');
          this.events.publish( 'role:created:permissions', this.role_user, Date.now(), this.array_permissions );
        }
      }

    });
  
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

  async presentAlert(mensaje) {
    const alert = await this.alertCtrl.create({
    message: mensaje,
    subHeader: 'Error!!',
    buttons: ['OK']
   });
   await alert.present();
  }

  submitLogin(){
    console.log('Hola Email', this.email);

    var texto = (<HTMLInputElement>document.getElementById("correo")).value;
    var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if(this.email == '' || this.password == ''){

      this.presentAlert('Ingrese Email Y Contraseña');
      return false;

    }else if (!regex.test(texto)) {

      this.presentAlert('Ingrese correo valido.');
      return false;

    }else{

      try{

        this.presentLoading();

        this.http.post(environment.url_site+'auth/login', {
        email: this.email,
        password: this.password,
        remember_me: 1
        }).subscribe((response) => {
          console.log(response);
          this.login_response = response;

          if(this.login_response.success === true){

            this.var_token =this.login_response.data.access_token;
            this.role_user =this.login_response.data.roles[0].name;
            this.id_user =this.login_response.data.user.id;
            this.user_identification =this.login_response.data.user.identificacion;

            this.array_permissions = this.login_response.data.permissions;
            
            //console.log('id_user ',this.id_user);

            this.storage.set('name_tkn', this.var_token);
            this.storage.set('role_user', this.role_user);
            this.storage.set('id_user', this.id_user);
            this.storage.set('identification', this.user_identification);
            this.storage.set('array_permissions', this.array_permissions);

            let TIME_IN_MS = 1300;
            let hideFooterTimeout = setTimeout( () => {

              if(this.role_user === 'Admin_ciamsa_fertilizantes' || this.role_user === 'Usuario_ciamsa_fertilizantes' || this.role_user === 'Cliente_ciamsa_fertilizantes'){
                this.menuCtrl.enable(true);
                this.router.navigate(['/fertilizantes']);
                this.events.publish( 'role:created:permissions', this.role_user, Date.now(), this.array_permissions );
                this.dismiss();
              }else if(this.role_user === 'Admin_ciamsa_1' || this.role_user === 'Usuario_ciamsa_1' || this.role_user === 'Cliente_ciamsa_1'){
                this.menuCtrl.enable(true);
                this.router.navigate(['/venta-azucar']);
                this.events.publish( 'role:created:permissions', this.role_user, Date.now(), this.array_permissions );
                this.dismiss();
              }else{
                this.menuCtrl.enable(true);
                this.router.navigate(['/operador-logistico']);
                this.events.publish( 'role:created:permissions', this.role_user, Date.now(), this.array_permissions );           
                this.dismiss();
              }

            }, TIME_IN_MS);
            
          }else{

            this.presentAlert('Credenciales Inválidas.');
            this.dismiss();
            return false;             
                               
          }
        }, 
        err => {
          console.log("ERROR!: ", err);
          this.presentAlert('No hay conexión!!');
          this.dismiss();
        });
      }catch(error){
        this.dismiss();
        this.presentAlert('Lo sentimos hay un problema' + error);
        console.log('Lo sentimos hay un problema', error);
      }

    }
    
  }

}
