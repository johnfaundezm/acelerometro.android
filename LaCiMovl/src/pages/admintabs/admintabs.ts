import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';

/**
 * Generated class for the AdmintabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admintabs',
  templateUrl: 'admintabs.html'
})
export class AdmintabsPage {

  deportistasRoot = 'DeportistasPage'
  entrenadoresRoot = 'EntrenadoresPage'
  estadisticasRoot = 'EstadisticasPage'


  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
  }

  ionViewCanEnter() {
    this.menuCtrl.enable(true, 'Menu');
  }
  
}
