import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the EntrenadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entrenador',
  templateUrl: 'entrenador.html',
})
export class EntrenadorPage {

  ListUser : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntrenadorPage');
  }

  
}
