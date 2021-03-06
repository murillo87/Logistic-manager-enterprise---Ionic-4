import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProcesoLogisticoPage } from './proceso-logistico.page';

const routes: Routes = [
  {
    path: '',
    component: ProcesoLogisticoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProcesoLogisticoPage]
})
export class ProcesoLogisticoPageModule {}
