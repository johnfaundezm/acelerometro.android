import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeportistasPage } from './deportistas';

@NgModule({
  declarations: [
    DeportistasPage,
  ],
  imports: [
    IonicPageModule.forChild(DeportistasPage),
  ],
})
export class DeportistasPageModule {}
