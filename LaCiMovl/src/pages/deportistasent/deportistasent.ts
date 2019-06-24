import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';

@IonicPage()
@Component({
  selector: 'page-deportistasent',
  templateUrl: 'deportistasent.html',
})
export class DeportistasentPage {

  enlaces: Array<{email:string, entrenamiento_n:string, fecha:string}>=[{email:'', entrenamiento_n:'', fecha:''}];
  correo:any;

  items: Array<{email_dep:string}>=[{email_dep:''}];

  actividades: string ='deportistas';

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider) {
    this.correo = this.navParams.get('correo');
  }

  ionViewCanEnter() {
    while(this.items.length>0){
      this.items.pop();
    }
    while(this.enlaces.length>0){
      this.enlaces.pop();
    }
    this.consulta_deportistas()
    this.consulta_enlace();
  }

  consulta_enlace(){
    this.webservices.consulta_enlace(this.correo).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        let largo=Object.keys(datos).length;
        for(var i=0;i<largo;i++){
          var email= datos[i].DEPORTISTA;
          var entrenamiento_n= datos[i].NOMBRE_T;
          var fecha= datos[i].FECHA;
          this.enlaces.push({"email":email, "entrenamiento_n":entrenamiento_n, "fecha":fecha});
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  consulta_deportistas(){
    this.webservices.vista_deportista().then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        let largo=Object.keys(datos).length;
        for(var i=0;i<largo;i++){
          var email_dep= datos[i].CORREO;
          this.items.push({"email_dep":email_dep});
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

}
