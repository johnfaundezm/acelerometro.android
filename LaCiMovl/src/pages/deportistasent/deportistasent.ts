// se importan los plugins que se ejecutarán en esta vista
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

  //DECLARACION DE VARIABLES
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

    //se reciben las variables de la vista anterior y se almacenan en una variable dentro de la vista
    this.correo = this.navParams.get('correo');
  }

  ionViewWillEnter() {// el evento se realiza antes de entrar a la vista
    while(this.aux.length>0){
      this.aux.pop();// borra los espacios vacios del arreglo
    }
    while(this.enlaces.length>0){
      this.enlaces.pop();// borra los espacios vacios del arreglo
    }
    while(this.enlaces_pend.length>0){
      this.enlaces_pend.pop();// borra los espacios vacios del arreglo
    }
  
    this.consulta_deportistas();// consulta los deportistas
    this.consulta_enlace_pend();// consulta los enlaces pendientes

    setTimeout(() => {// después de 2000 milisegundos se inicializan los items
      this.initializeItems();
    }, 2000);
    
  }

  doRefresh(refresher) {// método que refresca al tirar hacia abajo
    this.consulta_enlace();// metodo que consulta todos los enlaces acpetados
    refresher.complete();
  } 

  loadregistrar() { //loading que se muesta en pantalla al llamar esta función
    this.loading = this.loadingCtrl.create({ // se crea el loading
      spinner: 'ios', //tipo de animación al estar cargando
      content: 'Cargando...', //mensaje que muestra al estar cargando
      dismissOnPageChange: true  // funcion que permite detener el loading al cambiar de vista
    });
  
    this.loading.present();
  }

// método q inicializa y saca los deportistas que ya están enlazados
  initializeItems() {
    var temp: any;
    temp = this.aux;
   
    for (var i = 0; i < this.enlaces.length; i++) {//se repite la cantidad de veces, como enlazados hay
      for (var y = 0; y < this.aux.length; y++) {//se repite la cantidad de veces, como deportistas hay
        if (this.aux[y].email_dep==this.enlaces[i].email) {//se comparan los valores de los enlazados con los deportistas
          temp.splice(y,1);//se elimina el deportista repetido
          this.aux.splice(y,1);//se elimina el deportista repetido
        }
      }
    }
/*
    for (let j = 0; j < this.enlaces.length; j++) {
      temp.splice(temp.indexOf(this.enlaces[j]), 1);
    }
*/   
    this.items = temp;//se le pasan los valores de los deportistas que no estan enlazados y luego se muestran en la lista
  }

  getItems(ev: any) {// Método que filtra los deportistas
    
    this.initializeItems();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.email_dep.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  alerta_enviar(nombre) {
    this.correo_deportista=nombre; // se pasa la variable id a la variable this.id_ent declarada globalmente
    const confirm = this.alertCtrl.create({ // se crea la alerta
      title: 'Envio de solicitud', // titulo de la alerta
      message: 'Desea enviar la solicitud a '+nombre+'?', // mensaje de la alerta
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            // funciones  a realizar al apretar el botón
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            // funciones  a realizar al apretar el botón
            this.insercion_solicitud(); // método que inserta la solicitud
          }
        }
      ]
    });
    confirm.present();
  }

  insercion_solicitud(){
    this.getFormattedDate(); // se llama al método que da el formato de la fecha
    this.webservices.insertar_solicitud(this.correo_deportista, this.correo, 1,this.formattedDate).then( // se envian todos los parametros que se ven en el paréntesis
      (datos)=>{// se reciben los datos de respuesta del servidor
        //alert(JSON.stringify(datos));
        var respuesta= datos[0].RESPUESTA; // se almacena la respuesta en una variable 
        this.consulta_enlace_pend(); // método que consulta los enlaces pendientes
        if(respuesta == 'ERROR'){
          alert('Ha ocurrido un error al enviar la solicitud');
        }
        else{
          if(respuesta == 'OK'){ // si la respuesta es "OK"
            alert('La solicitud se ha enviado correctamente'); // Se envia un alert con el mensaje correspondiente
          }
          else{
            alert('Ha ocurrido un error al enviar la solicitud'); // Se envia un alert con el mensaje correspondiente
          }
        }
      },
      (err)=>{
        alert(JSON.stringify(err)) // si ocurre un error de comunicacion con el servidor, se envia este mensaje
      })
  }


  //Asigna y recibe la fecha con formato
  getFormattedDate(){
    var dateObj =new Date() // se almacena la fecha actual en una variable (queda almacenado en formato objeto)

    var year = dateObj.getFullYear().toString() // se saca solo el año
    var month = dateObj.getMonth().toString() // se saca solo el mes
    this.mes = month;
    this.mes ++; // se suma 1 al mes por que enero lo toma como el mes "0" en vez de ser el "1"
    var date = dateObj.getDate().toString() // se saca solo el día
    this.formattedDate = year+'-'+ this.mes +'-'+ date; // se concatena para dar el formato de fecha deseada
  }

  consulta_enlace_pend(){
    this.enlaces_pend = [];// se vacía el arreglo
    this.webservices.consulta_enlace_pend(this.correo).then( // se envian todos los parametros que se ven en el paréntesis
      (datos)=>{// se reciben los datos de respuesta del servidor
        //alert(JSON.stringify(datos));
        let largo=Object.keys(datos).length; // se calcula el largo de el arreglo que llegará del servidor con los datos
        for(var i=0;i<largo;i++){
          var email= datos[i].DEPORTISTA; // se almacena el correo del deportista en una variable
          this.enlaces_pend.push({"email":email}); // se envia al arreglo
        }
      },
      (err)=>{
        alert(JSON.stringify(err)) // si ocurre un error de comunicacion con el servidor, se envia este mensaje
      })
  }

  consulta_enlace(){
    this.enlaces = [];// se vacía el arreglo
    this.webservices.consulta_enlace(this.correo).then(
      (datos)=>{// se reciben los datos de respuesta del servidor
        //alert(JSON.stringify(datos));
        let largo=Object.keys(datos).length; // se calcula el largo de el arreglo que llegará del servidor con los datos
        for(var i=0;i<largo;i++){
          var ide= datos[i].ID; // se almacena la id de la solicitud en una variable
          var email= datos[i].DEPORTISTA; // se almacena el correo del deportista en una variable
          var fecha= datos[i].FECHA; // se almacena la fecha de la solicitud en una variable
          this.enlaces.push({"ide":ide,"email":email, "fecha":fecha}); // se envia al arreglo
        }
      },
      (err)=>{
        alert(JSON.stringify(err)) // si ocurre un error de comunicacion con el servidor, se envia este mensaje
    })
    //this.initializeItems();
  }

  consulta_deportistas(){
    this.aux = []
    this.webservices.vista_deportista().then(
      (datos)=>{// se reciben los datos de respuesta del servidor
        //alert(JSON.stringify(datos));
        let largo=Object.keys(datos).length; // se calcula el largo de el arreglo que llegará del servidor con los datos
        for(var i=0;i<largo;i++){
          var email_dep= datos[i].CORREO; // se almacena el correo del deportista en una variable      
          this.aux.push({"email_dep":email_dep}); // se envia al arreglo
        }
      },
      (err)=>{
        alert(JSON.stringify(err)) // si ocurre un error de comunicacion con el servidor, se envia este mensaje
    })
    this.consulta_enlace();
  }

  borrar_enlace(id_solicitud){
    this.webservices.borrar_enlace(id_solicitud).then(
      (datos)=>{// se reciben los datos de respuesta del servidor
        var respuesta= datos[0].RESPUESTA;
        if(respuesta=="OK"){
          alert('El enlace se ha borrado satisfactoriamente');
        }else{
          alert('Ha ocurrido un problema en el borrado');
        }
        this.consulta_enlace();
        //alert(JSON.stringify(datos));
      },
      (err)=>{
        alert(JSON.stringify(err)) // si ocurre un error de comunicacion con el servidor, se envia este mensaje
      })
  }

  metodo(id, email){
    this.navCtrl.push(InfoentrenamientoPage, {ide:id, email:email, correo:this.correo});
  }

  goestadisticas(id_solicitud){
    this.navCtrl.push(DatosentrenamientoPage, {id_solicitud:id_solicitud,correo:this.correo});
  }

}
