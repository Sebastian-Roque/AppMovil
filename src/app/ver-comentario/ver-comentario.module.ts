import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerComentarioPageRoutingModule } from './ver-comentario-routing.module';

import { VerComentarioPage } from './ver-comentario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerComentarioPageRoutingModule
  ],
  declarations: [VerComentarioPage]
})
export class VerComentarioPageModule {}
