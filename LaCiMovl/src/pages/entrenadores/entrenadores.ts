import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { AdminEntrenadorPage } from '../admin-entrenador/admin-entrenador';
import { AdmininsertentPage } from '../admininsertent/admininsertent';


@IonicPage()
@Component({
  selector: 'page-entrenadores',
  templateUrl: 'entrenadores.html',
})
export class EntrenadoresPage {

  entrenador: Array<{email:string, estado:string, fecha_r:string}>=[{email:'', estado:'', fecha_r:''}];

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider) {
  }

  ionViewCanEnter() {
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
          var estado= datos[i].ESTADO;
          var fecha_r= datos[i].FECHA_R;

          this.entrenador.push({"email":email, "estado":estado, "fecha_r":fecha_r});           
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  detalle(email){
    this.navCtrl.push(AdminEntrenadorPage, {correo:email});
  }

  crear_usuario(){
    this.navCtrl.push(AdmininsertentPage);
  }

  

}
