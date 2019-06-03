import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { AdminDeportistaPage } from '../admin-deportista/admin-deportista';

@IonicPage()
@Component({
  selector: 'page-deportistas',
  templateUrl: 'deportistas.html',
})
export class DeportistasPage {

  deportista: Array<{email:string,pass:string,nombre:string,apellido_p:string,apellido_m:string,genero:string,edad:string,peso:string,estatura:string,imc:string,pais:string,estado:string,fecha_r:string}>=[{email:'',pass:'',nombre:'',apellido_p:'',apellido_m:'',genero:'',edad:'',peso:'',estatura:'',imc:'',pais:'',estado:'',fecha_r:''}];

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider) {
    
  }

  ionViewDidLoad() {
    while(this.deportista.length>0){
      this.deportista.pop();
    }
    this.vista_deportista();
  }

  vista_deportista(){
    this.webservices.vista_deportista().then(
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
          var peso= datos[i].PESO;
          var estatura= datos[i].ESTATURA;
          var imc= datos[i].IMC;
          var pais= datos[i].PAIS;
          var estado= datos[i].ESTADO;
          var fecha_r= datos[i].FECHA_R;

          this.deportista.push({"email":email,"pass":pass,"nombre":nombre,"apellido_p":apellido_p,"apellido_m":apellido_m,"genero":genero,"edad":edad,"peso":peso,"estatura":estatura,"imc":imc,"pais":pais,"estado":estado,"fecha_r":fecha_r});
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  detalle(email){
    this.navCtrl.push(AdminDeportistaPage, {correo:email})
  }

}
