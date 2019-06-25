import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';

@IonicPage()
@Component({
  selector: 'page-deportistasent',
  templateUrl: 'deportistasent.html',
})
export class DeportistasentPage {

  enlaces: Array<{email:string, fecha:string}>=[{email:'', fecha:''}];
  enlaces_pend: Array<{email:string, fecha:string}>=[{email:'', fecha:''}];
  correo:any;
  correo_deportista:any;

  aux: Array<{email_dep:string}>=[{email_dep:''}];
  items:any;

  actividades: string ='deportistas';

  mes: any;
  //Fecha----------------------------------------
  currentDate;
  formattedDate;

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
    while(this.enlaces_pend.length>0){
      this.enlaces_pend.pop();
    }
    this.consulta_deportistas();
    this.consulta_enlace();
    this.consulta_enlace_pend();
  }

  doRefresh(refresher) {
    refresher.complete();
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

  alerta_enviar(nombre) {
    this.correo_deportista=nombre;
    const confirm = this.alertCtrl.create({
      title: 'ENvio de solicitud',
      message: 'Desea enviar la solicitud a '+nombre+'?',
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
            this.insercion_solicitud();
          }
        }
      ]
    });
    confirm.present();
  }

  insercion_solicitud(){
    this.getFormattedDate()
    this.webservices.insertar_solicitud(this.correo_deportista, this.correo,1,this.formattedDate).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        var respuesta= datos[0].RESPUESTA;
        if(respuesta == 'ERROR'){
          alert('Ha ocurrido un error al enviar la solicitud');
        }
        else{
          if(respuesta == 'OK'){
            alert('La solicitud se ha enviado correctamente');
          }
          else{
            alert('Ha ocurrido un error al enviar la solicitud');
          }
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  getFormattedDate(){
    var dateObj =new Date()

    var year = dateObj.getFullYear().toString()
    var month = dateObj.getMonth().toString()
    this.mes = month;
    this.mes ++;
    var date = dateObj.getDate().toString()
    this.formattedDate = year+'-'+ this.mes +'-'+ date;
  }

  consulta_enlace_pend(){
    this.webservices.consulta_enlace_pend(this.correo).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        let largo=Object.keys(datos).length;
        for(var i=0;i<largo;i++){
          var email= datos[i].DEPORTISTA;
          var fecha= datos[i].FECHA;
          this.enlaces_pend.push({"email":email, "fecha":fecha});
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  consulta_enlace(){
    this.webservices.consulta_enlace(this.correo).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        let largo=Object.keys(datos).length;
        for(var i=0;i<largo;i++){
          var email= datos[i].DEPORTISTA;
          var fecha= datos[i].FECHA;
          this.enlaces.push({"email":email, "fecha":fecha});
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
