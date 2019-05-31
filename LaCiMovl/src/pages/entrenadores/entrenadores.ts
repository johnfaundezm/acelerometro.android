import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';

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

  entrenador: Array<{email:string,pass:string,nombre:string,apellido_p:string,apellido_m:string,genero:string,edad:string,pais:string,estado:string,fecha_r:string}>=[{email:'',pass:'',nombre:'',apellido_p:'',apellido_m:'',genero:'',edad:'',pais:'',estado:'',fecha_r:''}];

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
          var pass= datos[i].PASS;
          var nombre= datos[i].NOMBRE;
          var apellido_p= datos[i].APELLIDO_P;
          var apellido_m= datos[i].APELLIDO_M;
          var genero= datos[i].GENERO;
          var edad= datos[i].EDAD;
          var pais= datos[i].PAIS;
          var estado= datos[i].ESTADO;
          var fecha_r= datos[i].FECHA_R;

          this.entrenador.push({"email":email,"pass":pass,"nombre":nombre,"apellido_p":apellido_p,"apellido_m":apellido_m,"genero":genero,"edad":edad,"pais":pais,"estado":estado,"fecha_r":fecha_r});           
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  detalle(email){
    alert(email);
  }

}
