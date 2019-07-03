import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-datosentrenamiento',
  templateUrl: 'datosentrenamiento.html',
})
export class DatosentrenamientoPage {

  tabBarElement: any; //variable que almacena el elemento tabbar

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar'); //se pasa el elemento tabbar a la variable antes declarada

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosentrenamientoPage');
  }

  //antes de entrar a la vista se oculta el tabbar
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
  //cuando va a salir de la vista se le agrega el tabbar nuevamente
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  volver(){
    this.navCtrl.pop();
  }

}
