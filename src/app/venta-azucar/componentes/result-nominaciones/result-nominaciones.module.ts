import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResultNominacionesPage } from './result-nominaciones.page';

const routes: Routes = [
  {
    path: '',
    component: ResultNominacionesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResultNominacionesPage]
})
export class ResultNominacionesPageModule {}
