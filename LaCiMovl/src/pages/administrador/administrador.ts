import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdministradorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class AdministradorPage {

  correo:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.correo = this.navParams.get('correo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdministradorPage');
  }

}
