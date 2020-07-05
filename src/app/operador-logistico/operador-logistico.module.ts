import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OperadorLogisticoPage } from './operador-logistico.page';

const routes: Routes = [
  {
    path: '',
    component: OperadorLogisticoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OperadorLogisticoPage]
})
export class OperadorLogisticoPageModule {}
