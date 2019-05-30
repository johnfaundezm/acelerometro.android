import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';

/**
 * Generated class for the AdministradorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class AdministradorPage {
  
  entrenador: Array<{email:string,pass:string,nombre:string,apellido_p:string,apellido_m:string,genero:string,edad:string,pais:string,estado:string,fecha_r:string}>=[{email:'',pass:'',nombre:'',apellido_p:'',apellido_m:'',genero:'',edad:'',pais:'',estado:'',fecha_r:''}];
  deportista: Array<{email:string,pass:string,nombre:string,apellido_p:string,apellido_m:string,genero:string,edad:string,peso:string,estatura:string,imc:string,pais:string,estado:string,fecha_r:string}>=[{email:'',pass:'',nombre:'',apellido_p:'',apellido_m:'',genero:'',edad:'',peso:'',estatura:'',imc:'',pais:'',estado:'',fecha_r:''}];

  correo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider) {
    this.correo = this.navParams.get('correo');
  }

  ionViewDidLoad() {
    while(this.entrenador.length>0){
      this.entrenador.pop();
    }
    while(this.deportista.length>0){
      this.deportista.pop();
    }
    this.vista_entrenador();
    this.vista_deportista();
  }

  vista_entrenador(){
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
    alert(email);
  }

}
