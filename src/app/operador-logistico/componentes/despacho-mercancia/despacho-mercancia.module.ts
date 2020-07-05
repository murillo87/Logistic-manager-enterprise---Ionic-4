import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DespachoMercanciaPage } from './despacho-mercancia.page';

const routes: Routes = [
  {
    path: '',
    component: DespachoMercanciaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DespachoMercanciaPage]
})
export class DespachoMercanciaPageModule {}
