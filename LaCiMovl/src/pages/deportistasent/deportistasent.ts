import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';

/**
 * Generated class for the DeportistasentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deportistasent',
  templateUrl: 'deportistasent.html',
})
export class DeportistasentPage {

  enlace: Array<{email:string, nombre_t:string, fecha:string}>=[{email:'', nombre_t:'', fecha:''}];
  correo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider) {
    this.correo = this.navParams.get('correo');
  }

  ionViewCanEnter() {
    while(this.enlace.length>0){
      this.enlace.pop();
    }

    this.consulta_enlace();
  }

  consulta_enlace(){
    this.webservices.consulta_enlace(this.correo).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        let largo=Object.keys(datos).length;
        for(var i=0;i<largo;i++){
          var email= datos[i].DEPORTISTA;
          var nombre_t= datos[i].NOMBRE_T;
          var fecha= datos[i].FECHA;
          alert(email)
          alert(nombre_t)
          alert(fecha)
          this.enlace.push({"email":email, "nombre_t":nombre_t, "fecha":fecha});
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

}
