import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AudioTestPage } from './audio-test';

@NgModule({
  declarations: [
    AudioTestPage,
  ],
  imports: [
    IonicPageModule.forChild(AudioTestPage),
  ],
})
export class AudioTestPageModule {}
