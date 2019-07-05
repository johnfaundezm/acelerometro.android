import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { DatabaseProvider } from '../providers/database/database';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage: any = HomePage;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
    public db: DatabaseProvider,private gyroscope: Gyroscope,private deviceMotion: DeviceMotion) {
    this.initializeApp();
    this.getCurrent();
    this.getCurrentAcceleration();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.db.abrirbd();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  //gyroscopio-------------------------------------------------------------------------------
  getCurrent(){
    let options: GyroscopeOptions = {
      frequency: 1000
   }
   
    this.gyroscope.getCurrent(options)
     .then((orientation: GyroscopeOrientation) => {
        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
      })
     .catch()
   
   
    this.gyroscope.watch()
      .subscribe((orientation: GyroscopeOrientation) => {
         console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
      });
  }
//accelerometro----------------------------------------------------------------------------
  getCurrentAcceleration(){
  // Get the device current acceleration
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
      (error: any) => console.log(error)
    );

// Watch device acceleration
    var subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
    console.log(acceleration);
    });

// Stop watch
    subscription.unsubscribe();
  }


}
