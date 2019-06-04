import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.parametros.correo = this.navParams.get('correo');
  }

  

}
