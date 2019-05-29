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
import {DatabaseProvider} from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public db: DatabaseProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Administrador', component: AdministradorPage },
      { title: 'Entrenador', component: EntrenadorPage },
      { title: 'Deportistatabs', component: DeportistatabsPage},
      //{ title: 'Deportista', component: DeportistaPage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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

  

}

// db.executeSql('create table if not exists usuario(id INTEGER PRIMARY KEY, correo VARCHAR(20), contraseña VARCHAR(16), nombre VARCHAR(20), apellido VARCHAR(20), genero VARCHAR(9), fecha_n DATE, edad INTEGER, masa VARCHAR(5), estatura VARCHAR(5), IMC VARCHAR(5), tipo INTEGER, estado VARCHAR(9), fecha_r DATE, pais VARCHAR(20), ciudad VARCHAR(20)', [])
