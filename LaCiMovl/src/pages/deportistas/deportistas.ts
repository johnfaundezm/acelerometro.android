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
  //define los atributos de la pagina para deportista
  deportista: Array<{email:string, estado:string, fecha_r:string}>=[{email:'', estado:'', fecha_r:''}];

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider) {
    
  }

  ionViewCanEnter() {
    while(this.deportista.length>0){
      this.deportista.pop();
    }
    this.vista_deportista();
  }
  //permite actualizar  la pagina
  doRefresh(refresher) {
    this.vista_deportista();
    refresher.complete();
  } 
  // llama los atributos del deportista desde la base de datos para el administrador
  vista_deportista(){
    this.webservices.vista_deportista().then(
      (datos) =>{
        let largo=Object.keys(datos).length;
        for(var i=0;i<largo;i++){
          var email= datos[i].CORREO;
          var estado= datos[i].ESTADO;
          var fecha_r= datos[i].FECHA_R;

          this.deportista.push({"email":email, "estado":estado, "fecha_r":fecha_r});
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  detalle(email){
    this.navCtrl.push(AdminDeportistaPage, {correo:email});
  }

  crear_usuario(){
    this.navCtrl.push(AdmininsertPage);
  }

  salir(){
    this.navCtrl.push(HomePage);
  }

}
