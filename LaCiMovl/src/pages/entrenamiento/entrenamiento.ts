import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Platform, AlertController } from 'ionic-angular';


//import { Observable } from 'rxjs/Observable'
import  'rxjs/add/observable/interval' 
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { ListPage } from '../list/list';

@IonicPage()
@Component({
  selector: 'page-entrenamiento',
  templateUrl: 'entrenamiento.html',
})
export class EntrenamientoPage {

  enlaces: Array<{ide:string, email:string, fecha:string}>=[{ide:'', email:'', fecha:''}]; //arreglo que almacena los enlaces entre deportista y entrenador
  enlaces_pend: Array<{email:string,ide:string}>=[{email:'',ide:''}]; //arreglo que almacena las solicitudes pendientes

  aux: Array<{email_ent:string}>=[{email_ent:''}]; //arreglo que almacena todos los deportistas
  
  correo:any; // correo del desportista
  loading:any;// variable que almacena el estado de el loading
  items:any;// variable para usarlo en el filtro
  id_ent:any;
  estado:any;
  respuesta:any;
  
  actividades: string = 'ejercicio';
  tiempoMarca: any;  //marca del tiempo para pausas
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider, 
              public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    
    this.correo = this.navParams.get('correo'); //Se recibe el correo del deportista
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    while(this.enlaces.length>0){
      this.enlaces.pop();// borra el ultimo dato que siempre esta vacio del arreglo
    }
    while(this.enlaces_pend.length>0){
      this.enlaces_pend.pop();// borra el ultimo dato que siempre esta vacio del arreglo
    }
    while(this.aux.length>0){
      this.aux.pop();// borra el ultimo dato que siempre esta vacio del arreglo
    }
    this.initializeItems();
    this.consulta_entrenadores();//Se inicializa la consulta del los deportistas  
    this.consulta_solicitud_pend(); //Se inicializa la consulta de las solicitudes pendientes
    this.consulta_enlace(); //Se inicializa la consulta de los enlaces
  }

  doRefresh(refresher) {
    this.consulta_enlace();
    refresher.complete();
  } 

  alerta_confirmacion(correo,id) {
    this.id_ent=id;
    const confirm = this.alertCtrl.create({
      title: 'Confirmacion de solicitud',
      message: 'El entrenador "'+correo+'" te ha enviado una solicitud de entrenamiento',
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
            this.actualizar_estado();
          }
        }
      ]
    });
    confirm.present();
  }

  initializeItems() {
    this.items = this.aux; // se inicializa el arreglo(traspasando los datos de un arreglo que tiene los datos necesarios)
  }

  getItems(ev: any) {// ese es el metodo que realiza el filtro por palabra
    
    this.initializeItems();// se llama al metodo q inicializa el vector

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.email_ent.toLowerCase().indexOf(val.toLowerCase()) > -1);// retorna la palabra filtrada
      })
    }
  }

  actualizar_estado(){
    this.estado=3
    this.webservices.actualizar_solicitud(this.id_ent,this.estado).then(
      (datos) =>{
        this.respuesta= datos[0].RESPUESTA;
        alert(this.respuesta);
      //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        this.loading.dismiss();
        alert('error'+JSON.stringify(error));
      })
  }

  consulta_entrenadores(){// se consultan todos los entrenadores disponibles para enviar solicitud
    this.webservices.vista_entrenador().then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        let largo=Object.keys(datos).length;
        for(var i=0;i<largo;i++){
          var email_ent= datos[i].CORREO; // se recibe el correo de los entrenadores      
          this.aux.push({"email_ent":email_ent});
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  consulta_solicitud_pend(){// se consulta por las solicitudes pendientes
    let largo=this.enlaces_pend.length;
    for(var i=0;i<largo;i++){
      this.enlaces_pend.pop();
    }
    this.webservices.consulta_enlace_pend_deportista(this.correo).then(// se envia la variable correo como consulta al php
      (datos)=>{
        //alert(JSON.stringify(datos));
        let largo=Object.keys(datos).length;
        for(var i=0;i<largo;i++){
          var ide= datos[i].ID;
          var email= datos[i].ENTRENADOR;// se recibe el correo de la solicitud pendiente
          this.enlaces_pend.push({"email":email,"ide":ide});
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  consulta_enlace(){
    let largo=this.enlaces.length;
    for(var i=0;i<largo;i++){
      this.enlaces.pop();
    }
    this.webservices.consulta_enlace_deportista(this.correo).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        let largo=Object.keys(datos).length;
        for(var i=0;i<largo;i++){ // se reciben la id, el correo del entrenador y la fecha de la solicitud
          var ide= datos[i].ID;
          var email= datos[i].ENTRENADOR;
          var fecha= datos[i].FECHA;
          this.enlaces.push({"ide":ide,"email":email, "fecha":fecha});
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  borrar_enlace(id_solicitud){
    this.webservices.borrar_enlace(id_solicitud).then(
      (datos)=>{
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
        alert(JSON.stringify(err))
      })
  }


  info_entrenamiento(id,email){
    var v=1;
    this.navCtrl.push(ListPage, {ide:id, email:email, correo:this.correo,v:v});
  }
}
