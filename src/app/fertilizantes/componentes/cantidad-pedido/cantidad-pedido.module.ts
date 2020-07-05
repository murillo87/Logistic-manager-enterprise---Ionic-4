import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CantidadPedidoPage } from './cantidad-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: CantidadPedidoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CantidadPedidoPage]
})
export class CantidadPedidoPageModule {}
