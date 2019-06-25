import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';

@IonicPage()
@Component({
  selector: 'page-deportistasent',
  templateUrl: 'deportistasent.html',
})
export class DeportistasentPage {

  enlaces: Array<{email:string, entrenamiento_n:string, fecha:string}>=[{email:'', entrenamiento_n:'', fecha:''}];
  correo:any;

  aux: Array<{email_dep:string}>=[{email_dep:''}];
  items:any;

  actividades: string ='deportistas';

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider,
              public alertCtrl: AlertController) {
    this.correo = this.navParams.get('correo');
    this.initializeItems();
  }

  ionViewCanEnter() {
    while(this.aux.length>0){
      this.aux.pop();
    }
    while(this.enlaces.length>0){
      this.enlaces.pop();
    }
    this.consulta_deportistas();
    this.consulta_enlace();
  }

  initializeItems() {
    this.items = this.aux;
  }

  getItems(ev: any) {
    
    this.initializeItems();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.email_dep.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  alerta_enviar() {
    const confirm = this.alertCtrl.create({
      title: 'ENvio de solicitud',
      message: 'Desea enviar la solicitud a .....?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
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
          this.aux.push({"email_dep":email_dep});
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

}
