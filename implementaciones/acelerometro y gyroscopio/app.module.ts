import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistroPage } from '../pages/registro/registro';
import { ListPage } from '../pages/list/list';
import { AdministradorPage } from '../pages/administrador/administrador';
import { EntrenadorPage } from '../pages/entrenador/entrenador';
import { DeportistaPage } from '../pages/deportista/deportista';
import { AdminDeportistaPage } from '../pages/admin-deportista/admin-deportista';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PopoverComponent } from '../components/popover/popover';
import { PopovercoachComponent } from '../components/popovercoach/popovercoach';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicStorageModule } from '@ionic/storage';
import { DatabaseProvider } from '../providers/database/database';
import { HttpModule } from '@angular/http';
import { WebservicesProvider } from '../providers/webservices/webservices';
import { HTTP } from '@ionic-native/http';
import { HttpClientModule } from '@angular/common/http';

import { DeportistatabsPage } from '../pages/deportistatabs/deportistatabs';
import { AdmintabsPage } from '../pages/admintabs/admintabs';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistroPage,
    ListPage,
    AdministradorPage,
    EntrenadorPage,
    DeportistaPage,
    AdminDeportistaPage,
    PopoverComponent,
    PopovercoachComponent,
    DeportistatabsPage,
    AdmintabsPage
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistroPage,
    ListPage,
    AdministradorPage,
    EntrenadorPage,
    DeportistaPage,
    AdminDeportistaPage,
    PopoverComponent,
    PopovercoachComponent,
    DeportistatabsPage,
    AdmintabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    WebservicesProvider,
    HTTP,
    Gyroscope,
    DeviceMotion
  ]
})
export class AppModule {}
