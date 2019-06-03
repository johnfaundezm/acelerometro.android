import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { AdminEntrenadorPage } from '../admin-entrenador/admin-entrenador';

/**
 * Generated class for the EntrenadoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entrenadores',
  templateUrl: 'entrenadores.html',
})
export class EntrenadoresPage {

  entrenador: Array<{email:string}>=[{email:''}];

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider) {
  }

  ionViewDidLoad() {
    while(this.entrenador.length>0){
      this.entrenador.pop();
    }

    this.vista_entrenador();
  }

  vista_entrenador(){
    this.webservices.vista_entrenador().then(
      (datos) =>{
        let largo=Object.keys(datos).length;
        for(var i=0;i<largo;i++){
          var email= datos[i].CORREO;

          this.entrenador.push({"email":email});           
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  detalle(email){
    this.navCtrl.push(AdminEntrenadorPage, {correo:email})
  }

}
