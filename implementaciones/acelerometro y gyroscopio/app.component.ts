import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AdministradorPage } from '../pages/administrador/administrador';
import { EntrenadorPage } from '../pages/entrenador/entrenador';
//import { DeportistaPage } from '../pages/deportista/deportista';
import { DeportistatabsPage} from '../pages/deportistatabs/deportistatabs';
import { AdmintabsPage } from '../pages/admintabs/admintabs';
import { DatabaseProvider } from '../providers/database/database';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public db: DatabaseProvider,public gyroscope: Gyroscope,public deviceMotion: DeviceMotion) {
    this.initializeApp();
    this.getCurrent();
    this.getCurrentAcceleration();


    this.pages = [
      { title: 'Home', component: HomePage },
      //{ title: 'Administrador', component: AdministradorPage },
      { title: 'Entrenador', component: EntrenadorPage },
      { title: 'Deportistatabs', component: DeportistatabsPage},
      { title: 'Admintabs', component: AdmintabsPage},
      //{ title: 'Deportista', component: DeportistaPage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.db.abrirbd();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
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
// db.executeSql('create table if not exists usuario(id INTEGER PRIMARY KEY, correo VARCHAR(20), contraseña VARCHAR(16), nombre VARCHAR(20), apellido VARCHAR(20), genero VARCHAR(9), fecha_n DATE, edad INTEGER, masa VARCHAR(5), estatura VARCHAR(5), IMC VARCHAR(5), tipo INTEGER, estado VARCHAR(9), fecha_r DATE, pais VARCHAR(20), ciudad VARCHAR(20)', [])
