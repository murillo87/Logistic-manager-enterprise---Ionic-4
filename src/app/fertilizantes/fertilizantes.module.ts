import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FertilizantesPage } from './fertilizantes.page';

const routes: Routes = [
  {
    path: '',
    component: FertilizantesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FertilizantesPage]
})
export class FertilizantesPageModule {}
