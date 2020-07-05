import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

import { Router } from "@angular/router";
import { isNullOrUndefined } from 'util';

import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NoLoginGuard implements CanActivate {
  var_token: any = '';
  role_user: any = '';

  constructor(private router: Router, private storage: Storage, public events: Events){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      /*return this.storage.get('name_tkn').then((val) => {
        this.var_token = val;

        if(isNullOrUndefined(this.var_token)){

          return true;

        }else{
          this.router.navigate(['/operador-logistico']);
          return false;
        }

      });*/
      
     return Promise.all([this.storage.get('name_tkn'), this.storage.get('role_user')]).then(values => {
        this.var_token = values[0];
        this.role_user = values[1];
  
        if(isNullOrUndefined(this.var_token)){
          return true;
        }else{
          if(this.role_user === 'Usuario_ciamsa'){
            this.router.navigate(['/fertilizantes']);
            this.events.publish('role:created', this.role_user, Date.now());
            return false;
          }else{
            this.router.navigate(['/operador-logistico']);
            this.events.publish('role:created', this.role_user, Date.now());
            return false;
          }
        }
  
      });
  
  }

}
