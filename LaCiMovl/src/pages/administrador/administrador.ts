import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';

import { AdminDeportistaPage} from '../admin-deportista/admin-deportista';
import { AdminEntrenadorPage} from '../admin-entrenador/admin-entrenador';

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
  pass1:any;
  nombre1:any;
  apellido_p1:any;
  apellido_m1:any;
  genero1:any;
  edad1:any;
  peso1:any;
  estatura1:any;
  imc1:any;
  pais1:any;
  estado1:any;

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

  detalles(email){
    this.webservices.consulta_deportista(email).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
          this.pass1= datos[0].PASS;
          this.nombre1= datos[0].NOMBRE;
          this.apellido_p1= datos[0].APELLIDO_P;
          this.apellido_m1= datos[0].APELLIDO_M;
          this.genero1= datos[0].GENERO;
          this.edad1= datos[0].EDAD;
          this.peso1= datos[0].PESO;
          this.estatura1= datos[0].ESTATURA;
          this.imc1= datos[0].IMC;
          this.pais1= datos[0].PAIS;
          this.estado1= datos[0].ESTADO;
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  detalle(email){
    this.navCtrl.push(AdminDeportistaPage, {correo:email});
  }

  detalle2(email){
    this.navCtrl.push(AdminEntrenadorPage, {correo:email})
  }

}
