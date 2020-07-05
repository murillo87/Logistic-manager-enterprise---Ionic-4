import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  var_token: any = '';

  constructor(private router: Router, private storage: Storage){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.storage.get('name_tkn').then((val) => {
        this.var_token = val;
        //console.log('Your token is', this.var_token);
        if(this.var_token == ''){

          this.router.navigate(['/login']);
          return false;

        }else{
          return true;
        }
      });    
  
  }

}
