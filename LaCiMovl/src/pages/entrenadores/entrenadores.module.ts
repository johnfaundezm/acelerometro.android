import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntrenadoresPage } from './entrenadores';

@NgModule({
  declarations: [
    EntrenadoresPage,
  ],
  imports: [
    IonicPageModule.forChild(EntrenadoresPage),
  ],
})
export class EntrenadoresPageModule {}
