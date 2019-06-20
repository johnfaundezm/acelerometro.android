import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CronometroPage } from './cronometro';

@NgModule({
  declarations: [
    CronometroPage,
  ],
  imports: [
    IonicPageModule.forChild(CronometroPage),
  ],
})
export class CronometroPageModule {}
