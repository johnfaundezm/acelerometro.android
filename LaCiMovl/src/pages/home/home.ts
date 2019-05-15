import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistroPage} from '../registro/registro';
import { LoginPage } from '../login/login';

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

  iniciar_sesion(){
  	this.navCtrl.push(LoginPage);
  }

}
