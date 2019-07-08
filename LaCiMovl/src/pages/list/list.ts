// se importan los plugins que se ejecutarán en esta vista
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { CronometroPage } from '../cronometro/cronometro';
import { EntrenamientoPage } from '../entrenamiento/entrenamiento';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  //DECLARACION DE VARIABLES
  tabBarElement: any; //variable que almacena el elemento tabbar

  id_ent:any;
  id_solicitud:any;
  email:any;
  correo:any;
  v:any;
  estado:any;
  respuesta:any;
  loading:any;
  cont:number=0;
  a:any;
  
  //Constructor, donde se declaran todos los plugins
  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    //se reciben las variables de la vista anterior y se almacenan en una variable dentro de la vista
    this.id_solicitud = navParams.get('ide');
    this.email = navParams.get('email');
    this.correo = navParams.get('correo');
    this.v = navParams.get('v');
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar'); //se pasa el elemento tabbar a la variable antes declarada
  }

  ionViewDidLoad(){// esta función se realiza cuando la vista actual está cargada
    if(this.v==1){
      this.load_buscar();
    }
  }

  ionViewWillEnter(){// esta función se realiza antes de entrar a la vista actual
    this.tabBarElement.style.display = 'none';
    this.a=1;// variable que activa la recursividad de buscar entrenamientos
    this.time();// se llama a la funcion que realiza la recursividad
  }

  ionViewWillLeave(){// esta función se realiza despues de salir de la vista actual
    this.tabBarElement.style.display = 'flex';
    this.a=0;// variable que desactiva la recursividad de buscar entrenamientos
    this.v=0;// variable que desactiva el load_buscar()
  }

  load_buscar() {//loading que se muesta en pantalla al llamar esta función
    this.loading = this.loadingCtrl.create({// se crea el loading
      spinner: 'ios',//tipo de animación al estar cargando
      content: 'Buscando Entrenamiento...',//mensaje que muestra al estar cargando
    });
  
    this.loading.present();
  }

  load() {//loading que se muesta en pantalla al llamar esta función
    this.loading = this.loadingCtrl.create({// se crea el loading
      spinner: 'ios',//tipo de animación al estar cargando
      content: 'Cargando...',//mensaje que muestra al estar cargando
    });
  
    this.loading.present();
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
    this.webservices.estado_entrenamiento(this.id_solicitud).then(//llama a la funcion del webservices.ts y le envia la id del entrenamiento
      (datos)=>{// recibe los datos de la consulta
        //alert(JSON.stringify(datos));
        this.id_ent=datos[0].ID;// recibe la id del entrenamiento y se almacena en una variable
        this.estado= datos[0].ESTADO_CREACION;// recibe el estado y se almacena en una variable
        if(this.estado==3){ // si el estado es 3 es por que se generó un entrenamiento
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
        alert(JSON.stringify(err)) // si ocurre un error de comunicacion con el servidor, se envia este mensaje
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
            this.navCtrl.push(CronometroPage, {id_entrenamiento:this.id_ent, email:this.email,id_solicitud:this.id_solicitud,correo:this.correo});
            this.actualizar_estado();// se llama a al funcion que actualiza el estado
          }
        }
      ]
    });
    confirm.present();// se confirma la opcion apretada(Cancelar o Aceptar)
  }

  //metodo que actualiza el estado del entrenamiento
  actualizar_estado(){
    this.load(); // comienza el loading
    this.estado=1;// se cambia el valor de la variable estado a 1
    this.webservices.actualizar_creacion_entrenamiento(this.id_ent,this.estado).then( // se envian todos los parametros que se ven en el paréntesis
      (datos) =>{ // se reciben los datos de respuesta del servidor
        this.respuesta= datos[0].RESPUESTA; // se almacena la respuesta en una variable 
        if(this.respuesta=='OK'){ // si la respuesta es "OK"
          this.loading.dismiss(); // Se termina el loading
          alert('Los cambios se han realizado satisfactoriamente') // Se envia un alert con el mensaje correspondiente
        }else{
          if(this.respuesta=='ERROR'){
            this.loading.dismiss(); // Se termina el loading
            alert('Ha ocurrido un error al actualizar el estado') // Se envia un alert con el mensaje correspondiente
          }else{
            this.loading.dismiss(); // Se termina el loading
            alert('Ha ocurrido un error al actualizar el estado') // Se envia un alert con el mensaje correspondiente
          }
        }
      //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        this.loading.dismiss(); // Se termina el loading
        alert('error'+JSON.stringify(error)); // si ocurre un error de comunicacion con el servidor, se envia este mensaje
      })
  }

}
