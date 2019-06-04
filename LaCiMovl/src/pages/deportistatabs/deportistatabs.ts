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

  correo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.correo = this.navParams.get('correo');
    this.parametros.correo = this.correo;
  }

  

}
