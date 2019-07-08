// se importan los plugins que se ejecutarán en esta vista
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

  //DECLARACION DE VARIABLES
  entrenador: Array<{email:string, estado:string, fecha_r:string}>=[{email:'', estado:'', fecha_r:''}]; //recibe todos los entrenadores

  //Constructor, donde se declaran todos los plugins
  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider) {
  }

  ionViewCanEnter() {// evento que se realiza antes de entrar a la vista
    while(this.entrenador.length>0){
      this.entrenador.pop();// borra los espacios vacios del arreglo
    }

    this.vista_entrenador();//método que consulta todos los entrenadores
  }

  doRefresh(refresher) {// metodo que permite refrescar al tirar hacia abajo
    this.vista_entrenador();//método que consulta todos los entrenadores
    refresher.complete();
  } 

  vista_entrenador(){
    this.webservices.vista_entrenador().then(
      (datos) =>{// se reciben los datos de respuesta del servidor
        let largo=Object.keys(datos).length; // se calcula el largo de el arreglo que llegará del servidor con los datos
        for(var i=0;i<largo;i++){
          var email= datos[i].CORREO; // se almacenan los datos en una variable
          var estado= datos[i].ESTADO; // se almacenan los datos en una variable
          var fecha_r= datos[i].FECHA_R; // se almacenan los datos en una variable

          this.entrenador.push({"email":email, "estado":estado, "fecha_r":fecha_r}); // se almacenan en un arreglo         
        }
      },
      (err)=>{
        alert(JSON.stringify(err)) // si ocurre un error de comunicacion con el servidor, se envia este mensaje
      })
  }

  //método que envia a la vista AdminEntrenador
  detalle(email){
    this.navCtrl.push(AdminEntrenadorPage, {correo:email});
  }

  //método que envia a la vista Admininsert entrenador
  crear_usuario(){
    this.navCtrl.push(AdmininsertentPage);
  }

}
