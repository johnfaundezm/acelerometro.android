import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmintabsPage } from './admintabs';

@NgModule({
  declarations: [
    AdmintabsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmintabsPage),
  ]
})
export class AdmintabsPageModule {}
