import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OperadorProterminadoPage } from './operador-proterminado.page';

const routes: Routes = [
  {
    path: '',
    component: OperadorProterminadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OperadorProterminadoPage]
})
export class OperadorProterminadoPageModule {}
