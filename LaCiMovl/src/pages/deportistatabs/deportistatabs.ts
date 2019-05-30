import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-deportistatabs',
  templateUrl: 'deportistatabs.html'
})
export class DeportistatabsPage {

  perfildepRoot = 'PerfildepPage'
  entrenamientoRoot = 'EntrenamientoPage'
  estadisticasdepRoot = 'EstadisticasdepPage'


  constructor(public navCtrl: NavController) {}

}
