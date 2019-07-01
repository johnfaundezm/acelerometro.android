import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FourierPage } from './fourier';

@NgModule({
  declarations: [
    FourierPage,
  ],
  imports: [
    IonicPageModule.forChild(FourierPage),
  ],
})
export class FourierPageModule {}
