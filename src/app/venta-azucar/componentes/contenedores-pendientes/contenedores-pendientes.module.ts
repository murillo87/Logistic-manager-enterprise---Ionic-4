import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContenedoresPendientesPage } from './contenedores-pendientes.page';

const routes: Routes = [
  {
    path: '',
    component: ContenedoresPendientesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContenedoresPendientesPage]
})
export class ContenedoresPendientesPageModule {}
