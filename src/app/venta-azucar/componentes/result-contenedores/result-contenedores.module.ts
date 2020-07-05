import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResultContenedoresPage } from './result-contenedores.page';

const routes: Routes = [
  {
    path: '',
    component: ResultContenedoresPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResultContenedoresPage]
})
export class ResultContenedoresPageModule {}
