import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RastreoPedidoPage } from './rastreo-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: RastreoPedidoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RastreoPedidoPage]
})
export class RastreoPedidoPageModule {}
