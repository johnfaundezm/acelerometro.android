import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeportistaPage } from './deportista';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    DeportistaPage,
  ],
  imports: [
    NgxChartsModule,
    IonicPageModule.forChild(DeportistaPage),
  ],
})
export class DeportistaPageModule {}
