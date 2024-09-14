import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerComentarioPage } from './ver-comentario.page';

const routes: Routes = [
  {
    path: 'id',
    component: VerComentarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerComentarioPageRoutingModule {}
