// se importan los plugins que se ejecutarán en esta vista
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { AdminDeportistaPage } from '../admin-deportista/admin-deportista';
import { AdmininsertPage } from '../admininsert/admininsert';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-deportistas',
  templateUrl: 'deportistas.html',
})
export class DeportistasPage {

  //DECLARACION DE VARIABLES
  deportista: Array<{email:string, estado:string, fecha_r:string}>=[{email:'', estado:'', fecha_r:''}]; //recibe todos los deportistas

  //Constructor, donde se declaran todos los plugins
  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider) {   
  }

  ionViewCanEnter() {// evento que se realiza antes de entrar a la vista
    while(this.deportista.length>0){
      this.deportista.pop();// borra los espacios vacios del arreglo
    }
    this.vista_deportista();//método que consulta todos los deportistas
  }
  //permite actualizar  la pagina
  doRefresh(refresher) {
    this.vista_deportista();
    refresher.complete();
  } 
  // llama los atributos del deportista desde la base de datos para el administrador
  vista_deportista(){
    this.webservices.vista_deportista().then(
      (datos) =>{// se reciben los datos de respuesta del servidor
        let largo=Object.keys(datos).length; // se calcula el largo de el arreglo que llegará del servidor con los datos
        for(var i=0;i<largo;i++){
          var email= datos[i].CORREO; // se almacenan los datos en una variable
          var estado= datos[i].ESTADO; // se almacenan los datos en una variable
          var fecha_r= datos[i].FECHA_R; // se almacenan los datos en una variable

          this.deportista.push({"email":email, "estado":estado, "fecha_r":fecha_r}); // se almacenan en un arreglo 
        }
      },
      (err)=>{
        alert(JSON.stringify(err)) // si ocurre un error de comunicacion con el servidor, se envia este mensaje
      })
  }

  //método que envia a la vista AdminDeportista
  detalle(email){
    this.navCtrl.push(AdminDeportistaPage, {correo:email});
  }

  //método que envia a la vista Admininsert deportista
  crear_usuario(){
    this.navCtrl.push(AdmininsertPage);
  }

  //método para salir al Home
  salir(){
    this.navCtrl.push(HomePage);
  }

}
