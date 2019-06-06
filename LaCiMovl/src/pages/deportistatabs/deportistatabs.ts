import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-deportistatabs',
  templateUrl: 'deportistatabs.html'
})
export class DeportistatabsPage {

  perfildepRoot = 'PerfildepPage'
  entrenamientoRoot = 'EntrenamientoPage'
  estadisticasdepRoot = 'EstadisticasdepPage'

  parametros = {
    correo: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
    this.parametros.correo = this.navParams.get('correo');
  }

  ionViewCanEnter() {
    this.menuCtrl.enable(true, 'Menu');
  }

  

}
