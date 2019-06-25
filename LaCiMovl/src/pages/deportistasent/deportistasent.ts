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
  prueba:any;

  actividades: string ='deportistas';

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider) {
    this.correo = this.navParams.get('correo');
    this.initializeItems();
  }

  ionViewCanEnter() {
    while(this.items.length>0){
      this.items.pop();
    }
    while(this.enlaces.length>0){
      this.enlaces.pop();
    }
    this.consulta_deportistas();
    this.consulta_enlace();
  }

  initializeItems() {
    this.prueba = this.items;
  }

  getItems(ev: any) {
    
    this.initializeItems();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.prueba = this.prueba.filter((item) => {
        return (item.email_dep.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
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
