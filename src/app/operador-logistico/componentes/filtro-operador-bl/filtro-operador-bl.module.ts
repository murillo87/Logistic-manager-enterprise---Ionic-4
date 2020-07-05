import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FiltroOperadorBlPage } from './filtro-operador-bl.page';

const routes: Routes = [
  {
    path: '',
    component: FiltroOperadorBlPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FiltroOperadorBlPage]
})
export class FiltroOperadorBlPageModule {}
