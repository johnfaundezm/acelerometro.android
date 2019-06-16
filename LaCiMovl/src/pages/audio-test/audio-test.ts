import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { NativeAudio } from '@ionic-native/native-audio';
/**
 * Generated class for the AudioTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audio-test',
  templateUrl: 'audio-test.html',
})
export class AudioTestPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    private nativeAudio: NativeAudio) {

      this.platform.ready().then(() => { 
        console.log("platform ready");

        // This is used to unload the track. It's useful if you're experimenting with track locations
        this.nativeAudio.unload('trackID').then(function() {
            console.log("unloaded audio!");
        }, function(err) {
            console.log("couldn't unload audio... " + err);
        });

        // 'trackID' can be anything
        this.nativeAudio.preloadComplex('trackID', 'assets/audio/inicio.mp3', 1, 1, 0).then(function() {
            console.log("audio loaded!");
        }, function(err) {
            console.log("audio failed: " + err);
        });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AudioTestPage');
  }

  playAudio() {
    console.log("playing audio");

    this.nativeAudio.play('trackID').then(function() {
        console.log("playing audio!");
    }, function(err) {
        console.log("error playing audio: " + err);
    });
}
  
}
