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

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.id_solicitud = this.navParams.get('ide');
    this.email_dep = this.navParams.get('email');
    this.correo = this.navParams.get('correo');
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar'); //se pasa el elemento tabbar a la variable antes declarada
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoentrenamientoPage');
  }
  //antes de entrar a la vista se oculta el tabbar
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
  //cuando va a salir de la vista se le agrega el tabbar nuevamente
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  traer_id_entrenamiento(){// consulta la id del entrenamiento
    this.webservices.estado_entrenamiento(this.id_solicitud).then(//llama a la funcion del webservices.ts y le envia la id del entrenamiento
      (datos)=>{// recibe los datos de la consulta
        //alert(JSON.stringify(datos));
        var id_ent= datos[0].ID;// recibe la id del entrenamiento y se almacena en una variable
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  loadregistrar() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Cargando...',
      dismissOnPageChange: true
    });
  
    this.loading.present();
  }

  load_pasar_de_vista() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Entrando al entrenamiento...',
      dismissOnPageChange: true
    });

    this.loading.onDidDismiss(() => {
      this.actualizar_estado()
      this.navCtrl.push(CronometroentPage, {id_entrenamiento:this.id_entrenamiento,correo:this.correo, id_solicitud:this.id_solicitud});
    });
  
    this.loading.present();

    setTimeout(() => {
      this.loading.dismiss();
    }, 2000);
  }

  load_espera_respuesta() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Esperando respuesta del Deportista...',
      dismissOnPageChange: true
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
    this.load();
    this.estado=1;
    this.webservices.actualizar_creacion_entrenamiento(this.id_entrenamiento,this.estado).then(
      (datos) =>{
        this.respuesta= datos[0].RESPUESTA;
        if(this.respuesta=='OK'){
          this.loading.dismiss();
          alert('Los cambios se han realizado satisfactoriamente')
        }else{
          if(this.respuesta=='ERROR'){
            this.loading.dismiss();
            alert('Ha ocurrido un error al actualizar el estado')
          }else{
            this.loading.dismiss();
            alert('Ha ocurrido un error al actualizar el estado')
          }
        }
      //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        this.loading.dismiss();
        alert('error'+JSON.stringify(error));
      })
  }

  //__Metodos_____
  getFormattedDate(){
    var dateObj =new Date()

    var year = dateObj.getFullYear().toString()
    var month = dateObj.getMonth().toString()
    var mes:any = month;
    mes ++;
    var date = dateObj.getDate().toString()
    this.formattedDate = year+'-'+ mes +'-'+ date;
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
    this.detalletiempo();
    if(this.tiempo_entrenamiento==0 || this.tipo_entrenamiento==null){
      if(this.tiempo_entrenamiento==0){
        alert('Su tiempo de entrenamiento no está definido. Defínalo e intente nuevamente');
      }
      if(this.tipo_entrenamiento==null){
        alert('Su tipo de entrenamiento no está definido. Defínalo e intente nuevamente');
      }
    }else{
      this.loadregistrar();
      this.getFormattedDate();
      
      this.tiempo_ent='00:'+this.tiempoM+':'+this.tiempoS;
      this.tiempo_rec='00:'+this.tiempoRM+':'+this.tiempoRS;
      this.estado=3;
      this.webservices.insertar_entrenamiento(this.id_solicitud,this.tiempo_ent,this.tiempo_entrenamiento,this.tiempo_rec,this.tiempo_recuperacion,this.formattedDate,this.tipo_entrenamiento,this.estado).then(
        (datos) =>{
          this.respuesta= datos[0].RESPUESTA;
          if(this.respuesta=='OK'){
            this.traer_id_entrenamiento()
            alert('El entrenamiento se ha creado satisfactoriamente');
            this.loading.dismiss();
            this.a=1;
            this.load_espera_respuesta();
            this.time();

          }else{
            if(this.respuesta=='EXISTE'){
              this.loading.dismiss();
              alert('El entrenamiento ya existe, intente con otro nombre')
            }else{
              if(this.respuesta=='ERROR'){
                this.loading.dismiss();
                alert('Ha ocurrido un error inesperado')
              }
            }  
          }
          //alert('oka'+JSON.stringify(resultado));
        },
        (error) =>{
          this.loading.dismiss();
          alert('error'+JSON.stringify(error));
      })
    }
  }

  detalletiempo(){
    this.tiempo_recuperacion= (this.tiempoRM*60) + this.tiempoRS;
    this.tiempo_entrenamiento=(this.tiempoM*60) + this.tiempoS;
  }

  verificacion(){// consulta quer verifica el estado del entrenamiento
    this.webservices.estado_entrenamiento(this.id_solicitud).then(//llama a la funcion del webservices.ts y le envia la id del entrenamiento
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
        alert(JSON.stringify(err))
      })
  }


  volver(){
    this.navCtrl.pop();
  }

}
