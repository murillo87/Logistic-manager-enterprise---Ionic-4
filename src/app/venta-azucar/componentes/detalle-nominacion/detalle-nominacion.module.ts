import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalleNominacionPage } from './detalle-nominacion.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleNominacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalleNominacionPage]
})
export class DetalleNominacionPageModule {}
