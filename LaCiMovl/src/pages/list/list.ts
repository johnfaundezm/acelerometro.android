import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { CronometroPage } from '../cronometro/cronometro';
import { DeportistatabsPage } from '../deportistatabs/deportistatabs';
import { EntrenamientoPage } from '../entrenamiento/entrenamiento';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  //declaracion de variable
  id_ent:any;
  email:any;
  correo:any;
  estado:any;
  respuesta:any;
  loading:any;
  cont:number=0;
  a:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    //se reciben las variables de la vista anterior y se almacenan en una variable dentro de la vista
    this.id_ent = navParams.get('ide');
    this.email = navParams.get('email');
    this.correo = navParams.get('correo');
  }

  ionViewWillEnter(){// esta función se realiza antes de entrar a la vista actual
    this.load_buscar()
    this.a=1;// variable que activa la recursividad de buscar entrenamientos
    this.time();// se llama a la funcion que realiza la recursividad
  }

  ionViewWillLeave(){// esta función se realiza despues de salir de la vista actual
    this.a=0;// variable que desactiva la recursividad de buscar entrenamientos
  }

  time(){// función recursiva que se activa cada 2 segundos
    setTimeout(() => {
      if(this.a==1){// si a es igual a 1  se ingresa al if para poder llamar a la recursividad
        this.verificacion();// se llama la función que verifica el estado
        this.time();// se llama a la funcion que realiza la recursividad
      }
    }, 2000)// tiempo en milisegundos que se demora en realizarse lo que hay dentro del setTimeout
  }

  verificacion(){// consulta quer verifica el estado del entrenamiento
    this.webservices.estado_entrenamiento(this.id_ent).then(//llama a la funcion del webservices.ts y le envia la id del entrenamiento
      (datos)=>{// recibe los datos de la consulta
        //alert(JSON.stringify(datos));
        this.estado= datos[0].ESTADO;// recibe el estado y se almacena en una variable
        if(this.estado==5){ // si el estado es 5 es por que se generó un entrenamiento
          this.a=0; // variable que desactiva la recursividad de buscar entrenamientos
          this.alerta_confirmacion();// llama a la alerta para aceptar el entrenamiento
        }else{
          this.cont+=1; //suma 1 al contador
          if(this.cont==5){// si el contador es igual a 5 
            this.loading.dismiss();// detiene el loading
            this.a=0; // variable que desactiva la recursividad de buscar entrenamientos
            this.alerta_confirmacion_tiempo_expirado();// llama a la alerta de tiempo expirado
          }
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  alerta_confirmacion_tiempo_expirado() {//Alerta que se activa cuando no se encuentra un entrenamiento activo
    const confirm = this.alertCtrl.create({
      title: 'Notificación',// titulo de la alerta
      message: 'No se ha encontrado ningun entrenamiento en curso, ¿Desea reintentar?',// mensaje de la alerta
      buttons: [
        {
          text: 'Salir',//nombre del boton 1
          handler: () => {
            console.log('Disagree clicked');
            this.loading.dismiss();// detiene el loading
            this.navCtrl.setRoot(EntrenamientoPage, {correo:this.correo});// Se devuelve a la vista anterior
          }
        },
        {
          text: 'Si',//nombre del boton 2
          handler: () => {
            this.loading.dismiss();// detiene el loading
            this.a=1;// variable que activa la recursividad de buscar entrenamientos
            this.load_buscar()// se vuelve a ejecutar el loading
            this.time();// se llama a la funcion que realiza la recursividad
            this.cont=0; // se reinicia el contador
          }
        }
      ]
    });
    confirm.present();
  }

  alerta_confirmacion() {//Alerta que se activa cuando se encuentra un entrenamiento activo
    const confirm = this.alertCtrl.create({
      title: 'Confirmacion de solicitud',// titulo de la alerta
      message: 'El entrenador "'+this.email+'" te ha enviado una solicitud de entrenamiento',// mensaje de la alerta
      buttons: [
        {
          text: 'Cancelar',//nombre del boton 1
          handler: () => {
            console.log('Disagree clicked');
            this.loading.dismiss();// detiene el loading
          }
        },
        {
          text: 'Aceptar',//nombre del boton 2
          handler: () => {
            this.loading.dismiss();// detiene el loading
            this.actualizar_estado();// se llama a al funcion que actualiza el estado
          }
        }
      ]
    });
    confirm.present();// se confirma la opcion apretada(Cancelar o Aceptar)
  }

  actualizar_estado(){
    this.load();
    this.estado=4;
    this.webservices.actualizar_estado_entrenamiento(this.id_ent,this.estado).then(
      (datos) =>{
        this.respuesta= datos[0].RESPUESTA;
        if(this.respuesta=='OK'){
          this.loading.dismiss();
          alert('Los cambios se han realizado satisfactoriamente')
          this.navCtrl.push(CronometroPage, {id:this.id_ent, email:this.email});
        }else{
          if(this.respuesta=='ERROR'){
            this.loading.dismiss();
            alert('Ha ocurrido un error en la actualizacion')
          }else{
            this.loading.dismiss();
            alert('Ha ocurrido un error en la actualizacion')
          }
        }
      //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        this.loading.dismiss();
        alert('error'+JSON.stringify(error));
      })
  }

  load_buscar() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Buscando Entrenamiento...',
    });
  
    this.loading.present();
  }

  load() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Cargando...',
    });
  
    this.loading.present();
  }
}
