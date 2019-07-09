import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { DeportistasentPage } from '../deportistasent/deportistasent';
import { CronometroentPage } from '../cronometroent/cronometroent';


@IonicPage()
@Component({
  selector: 'page-infoentrenamiento',
  templateUrl: 'infoentrenamiento.html',
})
export class InfoentrenamientoPage {

  //DECLARACION DE VARIABLES
  tabBarElement: any; //variable que almacena el elemento tabbar

  public tipo_entrenamiento: String;
  public tiempo_entrenamiento: number;
  public unidad_entrenamiento: number;
  
  public tiempo_recuperacion :number;
  public unidad_recuperacion : number;

  id_entrenamiento:any;
  id_solicitud:any;
  email_dep:any;
  correo:any;
  estado:any;
  a:any;
  cont:number=0;

  formattedDate;

  respuesta:any;
  loading:any;

  //valores iniciales para el tiempo de entrenamiento
  tiempoM: any= 0;
  tiempoS: any= 0;
  tiempoRM: any= 0;
  tiempoRS: any= 0;

  //formato de tiempo
  tiempo_ent:any;
  tiempo_rec:any;

  //Constructor, donde se declaran todos los plugins
  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    //se reciben las variables de la vista anterior y se almacenan en una variable dentro de la vista
    this.id_solicitud = this.navParams.get('ide');
    this.email_dep = this.navParams.get('email');
    this.correo = this.navParams.get('correo');
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar'); //se pasa el elemento tabbar a la variable antes declarada
  }

  //antes de entrar a la vista se oculta el tabbar
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
  //cuando va a salir de la vista se le agrega el tabbar nuevamente
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  loadregistrar() { //loading que se muesta en pantalla al llamar esta función
    this.loading = this.loadingCtrl.create({ // se crea el loading
      spinner: 'ios', //tipo de animación al estar cargando
      content: 'Cargando...', //mensaje que muestra al estar cargando
      dismissOnPageChange: true // funcion que permite detener el loading al cambiar de vista
    });
  
    this.loading.present();
  }

  load_pasar_de_vista() { //loading que se muesta en pantalla al llamar esta función
    this.loading = this.loadingCtrl.create({ // se crea el loading
      spinner: 'ios', //tipo de animación al estar cargando
      content: 'Entrando al entrenamiento...', //mensaje que muestra al estar cargando
      dismissOnPageChange: true // funcion que permite detener el loading al cambiar de vista
    });

    this.loading.onDidDismiss(() => {// funcion que realiza una acción al terminar con el loading
      this.actualizar_estado() // se llama al método actualizar estado
      this.navCtrl.push(CronometroentPage, {id_entrenamiento:this.id_entrenamiento,correo:this.correo, id_solicitud:this.id_solicitud}); // esta funcion redirige a otra vista mandando las variables ingresadas dentro del corchete {}
    });
  
    this.loading.present();

    setTimeout(() => { //funcion que realiza una accion pasado los 2000 milisegundos
      this.loading.dismiss(); // se termina el loading
    }, 2000);
  }

  load_espera_respuesta() { //loading que se muesta en pantalla al llamar esta función
    this.loading = this.loadingCtrl.create({ // se crea el loading
      spinner: 'ios', //tipo de animación al estar cargando
      content: 'Esperando respuesta del Deportista...', //mensaje que muestra al estar cargando
      dismissOnPageChange: true // funcion que permite detener el loading al cambiar de vista
    });

    this.loading.present();
  }

  load() { //loading que se muesta en pantalla al llamar esta función
    this.loading = this.loadingCtrl.create({ // se crea el loading
      spinner: 'ios', //tipo de animación al estar cargando
      content: 'Cargando...', //mensaje que muestra al estar cargando
    });
  
    this.loading.present();
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
            this.navCtrl.setRoot(DeportistasentPage, {correo:this.correo});// Se devuelve a la vista anterior
          }
        },
        {
          text: 'Si',//nombre del boton 2
          handler: () => {
            this.loading.dismiss();// detiene el loading
            this.a=1;// variable que activa la recursividad de buscar entrenamientos
            this.load_espera_respuesta()// se vuelve a ejecutar el loading
            this.time();// se llama a la funcion que realiza la recursividad
            this.cont=0; // se reinicia el contador
          }
        }
      ]
    });
    confirm.present();
  }

  actualizar_estado(){
    this.load(); // comienza el loading
    this.estado=4; //se cambia el estado a 1
    this.webservices.actualizar_creacion_entrenamiento(this.id_entrenamiento,this.estado).then( // se envian todos los parametros que se ven en el paréntesis
      (datos) =>{ // se reciben los datos de respuesta del servidor
        this.respuesta= datos[0].RESPUESTA; // se almacena la respuesta en una variable 
        if(this.respuesta=='OK'){ // si la respuesta es "OK"
          this.loading.dismiss(); // Se termina el loading
          //alert('Los cambios se han realizado satisfactoriamente') // Se envia un alert con el mensaje correspondiente
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

  //Asigna y recibe la fecha con formato
  getFormattedDate(){
    var dateObj =new Date() // se almacena la fecha actual en una variable (queda almacenado en formato objeto)

    var year = dateObj.getFullYear().toString() // se saca solo el año
    var month = dateObj.getMonth().toString() // se saca solo el mes
    var mes:any = month;
    mes ++; // se suma 1 al mes por que enero lo toma como el mes "0" en vez de ser el "1"
    var date = dateObj.getDate().toString() // se saca solo el día
    this.formattedDate = year+'-'+ mes +'-'+ date; // se concatena para dar el formato de fecha deseada
  }

  time(){// función recursiva que se activa cada 2 segundos
    setTimeout(() => {
      if(this.a==1){// si a es igual a 1  se ingresa al if para poder llamar a la recursividad
        this.verificacion();// se llama la función que verifica el estado
        this.time();// se llama a la funcion que realiza la recursividad
      }
    }, 2000)// tiempo en milisegundos que se demora en realizarse lo que hay dentro del setTimeout
  }

  enviar_entrenamiento(){
    this.detalletiempo(); // se llama a la funcion que cambia el tiempo a segundos
    if(this.tiempo_entrenamiento==0 || this.tipo_entrenamiento==null){ // si se cumple la condicion se realiza ésto
      if(this.tiempo_entrenamiento==0){
        alert('Su tiempo de entrenamiento no está definido. Defínalo e intente nuevamente'); // se envia el mensaje correspondiente
      }
      if(this.tipo_entrenamiento==null){
        alert('Su tipo de entrenamiento no está definido. Defínalo e intente nuevamente'); // se envia el mensaje correspondiente
      }
    }else{// si no se cumple la condicion se realiza ésto
      this.loadregistrar();
      this.getFormattedDate();
      // se le da el formato correcto a tiempo (hh:mm:ss)
      this.tiempo_ent='00:'+this.tiempoM+':'+this.tiempoS;
      this.tiempo_rec='00:'+this.tiempoRM+':'+this.tiempoRS;
      this.estado=3; // se cambia la variable estado a 3
      this.webservices.insertar_entrenamiento(this.id_solicitud,this.tiempo_ent,this.tiempo_entrenamiento,this.tiempo_rec,this.tiempo_recuperacion,this.formattedDate,this.tipo_entrenamiento,this.estado).then( // se envian todos los parametros que se ven en el paréntesis
        (datos) =>{// se reciben los datos de respuesta del servidor
          this.respuesta= datos[0].RESPUESTA; // se almacena la respuesta en una variable 
          if(this.respuesta=='OK'){ // si la respuesta es "OK"
            alert('El entrenamiento se ha creado satisfactoriamente'); // Se envia un alert con el mensaje correspondiente
            this.loading.dismiss(); // Se termina el loading
            this.a=1;// variable que activa la recursividad de buscar entrenamientos
            this.load_espera_respuesta(); // comienza el nuevo loading
            this.time(); // se llama a la funcion que busca cada 2 segundos un cambio de estado del entrenamiento en el servidor

          }else{
            if(this.respuesta=='EXISTE'){ // si la respuesta es "EXISTE"
              this.loading.dismiss(); // Se termina el loading
              alert('El entrenamiento ya existe, intente con otro nombre') // Se envia un alert con el mensaje correspondiente
            }else{
              if(this.respuesta=='ERROR'){
                this.loading.dismiss(); // Se termina el loading
                alert('Ha ocurrido un error inesperado') // Se envia un alert con el mensaje correspondiente
              }
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

  //método que deja el tiempo expresado en segundos 
  detalletiempo(){
    this.tiempo_recuperacion= (this.tiempoRM*60) + this.tiempoRS;
    this.tiempo_entrenamiento=(this.tiempoM*60) + this.tiempoS;
  }

  verificacion(){// consulta quer verifica el estado del entrenamiento
    this.webservices.estado_entrenamiento(this.id_solicitud).then( // se envian todos los parametros que se ven en el paréntesis
      (datos)=>{// recibe los datos de la consulta
        //alert(JSON.stringify(datos));
        this.id_entrenamiento= datos[0].ID;
        this.estado= datos[0].ESTADO_CREACION;// recibe el estado y se almacena en una variable
        if(this.estado==1){ // si el estado es 4 es por que el deportista aceptó
          this.loading.dismiss();// detiene el loading
          this.a=0; // variable que desactiva la recursividad de buscar entrenamientos
          this.load_pasar_de_vista()
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


  //método que lleva a la vista anterior
  volver(){
    this.navCtrl.pop();
  }

}
