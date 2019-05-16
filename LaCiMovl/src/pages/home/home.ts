import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistroPage} from '../registro/registro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  registrar(){
  	this.navCtrl.push(RegistroPage);
  }

}
