import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DevolucionContenedoresPage } from './devolucion-contenedores.page';

const routes: Routes = [
  {
    path: '',
    component: DevolucionContenedoresPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DevolucionContenedoresPage]
})
export class DevolucionContenedoresPageModule {}
