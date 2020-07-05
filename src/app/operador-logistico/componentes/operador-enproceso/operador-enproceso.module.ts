import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OperadorEnprocesoPage } from './operador-enproceso.page';

const routes: Routes = [
  {
    path: '',
    component: OperadorEnprocesoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OperadorEnprocesoPage]
})
export class OperadorEnprocesoPageModule {}
