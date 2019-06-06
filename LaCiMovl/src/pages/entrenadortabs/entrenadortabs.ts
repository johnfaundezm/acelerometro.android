import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the EntrenadortabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entrenadortabs',
  templateUrl: 'entrenadortabs.html'
})
export class EntrenadortabsPage {

  perfilentRoot = 'PerfilentPage'
  deportistasentRoot = 'DeportistasentPage'

  parametros = {
    correo: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
    this.parametros.correo = this.navParams.get('correo')
  }

  ionViewCanEnter() {
    this.menuCtrl.enable(true, 'Menu');
  }

}
