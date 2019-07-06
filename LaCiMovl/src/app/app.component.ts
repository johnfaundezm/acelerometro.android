import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as math from 'mathjs'; // don't named as Math, this will conflict with Math in JS
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

  //pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
    public db: DatabaseProvider,private gyroscope: Gyroscope,private deviceMotion: DeviceMotion) {
    this.initializeApp();
    this.getCurrent();
    this.getCurrentAcceleration();

    /*
    this.pages = [
      { title: 'Salir', component: HomePage },
      { title: 'Cronometro', component: CronometroPage },
      { title: 'Cronometroent', component: CronometroentPage },
      //{ title: 'infoentrenamiento', component: InfoentrenamientoPage },
      //{ title: 'Administrador', component: AdministradorPage },
      //{ title: 'Deportistatabs', component: DeportistatabsPage},
      //{ title: 'Entrenadortabs', component: EntrenadortabsPage},
      //{ title: 'Admintabs', component: AdmintabsPage},
      //{ title: 'Deportista', component: DeportistaPage },
      //{ title: 'List', component: ListPage }
    ];
*/
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.db.abrirbd();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  /*
  metodosalir(){
    this.nav.popToRoot();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
*/
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
