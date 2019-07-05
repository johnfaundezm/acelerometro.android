import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';

import { InfoentrenamientoPage } from '../infoentrenamiento/infoentrenamiento';
import { DatosentrenamientoPage } from '../datosentrenamiento/datosentrenamiento';

@IonicPage()
@Component({
  selector: 'page-deportistasent',
  templateUrl: 'deportistasent.html',
})
export class DeportistasentPage {

  enlaces: Array<{ide:string, email:string, fecha:string}>=[{ide:'', email:'', fecha:''}];
  enlaces_pend: Array<{email:string}>=[{email:''}];
  correo:any;
  correo_deportista:any;
  respuesta:any;
  loading:any;

  aux: Array<{email_dep:string}>=[{email_dep:''}];
  items:any;

  actividades: string ='deportistas';

  mes: any;
  //Fecha----------------------------------------
  currentDate;
  formattedDate;

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider,
              public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.correo = this.navParams.get('correo');
  }

  ionViewWillEnter() {
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
    this.consulta_enlace_pend();

    setTimeout(() => {
      this.initializeItems();
    }, 2000);
    
  }

  doRefresh(refresher) {
    this.consulta_enlace();
    refresher.complete();
  } 

  loadregistrar() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Cargando...',
      dismissOnPageChange: true
    });
  
    this.loading.present();
  }

  initializeItems() {

    var temp: any;
    temp = this.aux;
    
    for (var i = 0; i < this.enlaces.length; i++) {
      for (var y = 0; y < this.aux.length; y++) {
        if (this.aux[y].email_dep==this.enlaces[i].email) {
          temp.splice(y,1);
          this.aux.splice(y,1);
        }
      }
    }
    this.items = temp;
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
      title: 'Envio de solicitud',
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
    this.webservices.insertar_solicitud(this.correo_deportista, this.correo, 1,this.formattedDate).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        var respuesta= datos[0].RESPUESTA;
        this.consulta_enlace_pend();
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
    this.enlaces_pend = [];// se vacía el arreglo
    this.webservices.consulta_enlace_pend(this.correo).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        let largo=Object.keys(datos).length;
        for(var i=0;i<largo;i++){
          var email= datos[i].DEPORTISTA;
          this.enlaces_pend.push({"email":email});
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  consulta_enlace(){
    this.enlaces = [];// se vacía el arreglo
    this.webservices.consulta_enlace(this.correo).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        let largo=Object.keys(datos).length;
        for(var i=0;i<largo;i++){
          var ide= datos[i].ID;
          var email= datos[i].DEPORTISTA;
          var fecha= datos[i].FECHA;
          this.enlaces.push({"ide":ide,"email":email, "fecha":fecha});
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
    })
    //this.initializeItems();
  }

  consulta_deportistas(){
    this.aux = []
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
    this.consulta_enlace();
  }

  metodo(id, email){
    this.navCtrl.push(InfoentrenamientoPage, {ide:id, email:email, correo:this.correo});
  }

  goestadisticas(id_solicitud){
    this.navCtrl.push(DatosentrenamientoPage, {id_solicitud:id_solicitud,correo:this.correo});
  }

}
