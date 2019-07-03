import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Platform, AlertController } from 'ionic-angular';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion';
import { NativeAudio } from '@ionic-native/native-audio';

//import { Observable } from 'rxjs/Observable'
import  'rxjs/add/observable/interval' 
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { EntrenamientoPage } from '../entrenamiento/entrenamiento';
import { DatosentrenamientoPage } from '../datosentrenamiento/datosentrenamiento';

@IonicPage()
@Component({
  selector: 'page-cronometro',
  templateUrl: 'cronometro.html',
})
export class CronometroPage {

  tabBarElement: any; //variable que almacena el elemento tabbar

  enlaces: Array<{ide:string, email:string, fecha:string}>=[{ide:'', email:'', fecha:''}]; //arreglo que almacena los enlaces entre deportista y entrenador
  enlaces_pend: Array<{email:string}>=[{email:''}]; //arreglo que almacena las solicitudes pendientes

  aux: Array<{email_ent:string}>=[{email_ent:''}]; //arreglo que almacena todos los deportistas
  
  correo:any; // correo del deportista
  peso:any;// variable que almacena el peso del usuario deportista
  loading:any;// variable que almacena el estado de el loading
  items:any;// variable para usarlo en el filtro

  id_ent:any;
  id_solicitud:any;
  respuesta:any;
  a:any;
  estado:any;
  estadouser:any;

  cambio: boolean =true; //variable para el cambio de pausar y continuar

  //variables iniciadas para sacar la aceleracion, fuerza y potencia maxima
  A_max: any = 0;
  F_max: any = 0;
  P_max: any = 0;

  //Funcion de entrenamiento
  public tipo_entrenamiento : String;
  public tiempo : number = 0; //tiempo transcurrido del entrenamiento
  public tiempo_entrenamiento: number; //duración del entrenamiento
  public unidad_entrenamiento: number;
  public inicioseg : number=0; //cronometro de inicio de entrenamiento
  public contador_entrenamiento : any; // variable de intervalo de entrenamiento
  public potencia : any;  //potencia del usuario durante el entrenamiento
  public fuerza: any; // fuerza del usuario durante el entrenamiento  
  public tiempo_recuperacion :number;
  public unidad_recuperacion : number;

  //Cronometro
  public min1: number =0;   //minuto unidad
  public min2: number =0; //minuto decena
  public seg1: number =0; //segundo unidad
  public seg2: number =0; //segundo decena
  public cen1 : number = 0; // centesima unidad
  public cen2 : number = 0; // centesima decena
  //--Marcas
  public min2Marca :number; //marca min2 para pausas
  public min1Marca :number; //marca min1 para pausas
  public seg2Marca :number; //marca seg2 para pausas
  public seg1Marca :number; //marca seg1 para pausas
  public cen2Marca :number; //marca cen2 para pausas
  public cen1Marca :number; //marca cen1 para pausas
 //Gyroscopio y Acelerometro
  public id : any;  //variable receptora acelerometro
  public idg: any; //variable receptora giroscopio
  public xOrient:any; //giroscopio x
  public yOrient:any; //giroscopio y
  public zOrient:any; //giroscopio z
  public giro_x_y_z : any; //variable xyz giroscopio para operaciones
  public acel_x_y_z : any; // variable xyz acelerometro para operaciones
  public timestamp:any;  // marca del tiempo de acelerometro
  public timestampd:any; // marca del tiempo de giroscopio
  public accX:any; //acelerometro x
  public accY:any; //acelerometro y
  public accZ:any; //acelerometro z
//---Contador
  public coleccion : Array<any> = [];
  public contador : any; //variable de intervalo para cronometro
  public contador_recuperacion : any; // variable recuperacion
//-----------------------------------
  
  actividades: string = 'ejercicio';
  tiempoMarca: any;  //marca del tiempo para pausas

  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform, 
    private gyroscope:Gyroscope, private deviceMotion: DeviceMotion, private webservices: WebservicesProvider, 
    public loadingCtrl: LoadingController,private nativeAudio: NativeAudio, public alertCtrl: AlertController) {

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar'); //se pasa el elemento tabbar a la variable antes declarada

    this.correo = this.navParams.get('correo'); //Se recibe el correo del deportista
    this.id_ent = this.navParams.get('id_entrenamiento');
    this.id_solicitud = navParams.get('id_solicitud');

    // se inicia la plataforma de reproducciones
    this.platform.ready().then(() => { 
    console.log("platform ready");

    // formato de definicion de un audio
    this.nativeAudio.unload('trackID').then(function() { 
    console.log("unloaded audio!"); 
    }, function(err) {
    console.log("couldn't unload audio... " + err);
    });

    //                               nombre /         ubicacion         1=volumen; 1=voces multicanal ;0=retraso para empezar 
    this.nativeAudio.preloadComplex('inicio', 'assets/audio/inicio.mp3', 1, 1, 0).then(function() {// se define el identificador del audio
    console.log("audio loaded!");
    }, function(err) {
    console.log("audio failed: " + err);//muestra error si no se puede cargar el audio
    });//                               nombre /         ubicacion         1=volumen; 1=voces multicanal ;0=retraso para empezar 
    this.nativeAudio.preloadComplex('finalizar', 'assets/audio/finalizacion.mp3', 1, 1, 0).then(function() {// se define el identificador del audio
    console.log("audio loaded!");
    }, function(err) {
    console.log("audio failed: " + err);//muestra error si no se puede cargar el audio
    });//                               nombre /         ubicacion         1=volumen; 1=voces multicanal ;0=retraso para empezar 
    this.nativeAudio.preloadComplex('finentrenamiento', 'assets/audio/finentrenamiento.mp3', 1, 1, 0).then(function() {// se define el identificador del audio
    console.log("audio loaded!");
    }, function(err) {
    console.log("audio failed: " + err);//muestra error si no se puede cargar el audio
    });//                               nombre /         ubicacion         1=volumen; 1=voces multicanal ;0=retraso para empezar 
    this.nativeAudio.preloadComplex('comienzoentrenamiento', 'assets/audio/comienzoentrenamiento.mp3', 1, 1, 0).then(function() {
    console.log("audio loaded!");
    }, function(err) {
    console.log("audio failed: " + err);
    });

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CronometroPage');
    this.consulta_peso(); //Se inicializa la consulta del peso  
    setTimeout(() => {
      alert(this.peso);
    }, 2000)
  }

  //antes de entrar a la vista se oculta el tabbar
  ionViewWillEnter() {
    this.datos_entrenamiento();
    this.tabBarElement.style.display = 'none';
    this.a=1; // variable que activa la recursividad de buscar entrenamientos
    this.time();
    
  }
  //cuando va a salir de la vista se le agrega el tabbar nuevamente
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
    this.a=0; // variable que activa la recursividad de buscar entrenamientos
  }

  ionViewCanEnter() {
  }

  time(){// función recursiva que se activa cada 2 segundos
    setTimeout(() => {
      if(this.a==1){// si a es igual a 1  se ingresa al if para poder llamar a la recursividad
        this.verificacion();// se llama la función que verifica el estado
        this.time();// se llama a la funcion que realiza la recursividad
      }
    }, 1000)// tiempo en milisegundos que se demora en realizarse lo que hay dentro del setTimeout
  }

  verificacion(){// consulta quer verifica el estado del entrenamiento
    this.webservices.estado_entrenamiento(this.id_ent).then(//llama a la funcion del webservices.ts y le envia la id del entrenamiento
      (datos)=>{// recibe los datos de la consulta
        //alert(JSON.stringify(datos));
        this.estado= datos[0].ESTADO;// recibe el estado y se almacena en una variable
        if(this.estado==3){ // si el estado es 3 se inicia el cronometro
          this.nuevoEntrenamiento();
        }else{
          if(this.estado==2){// si el estado es 2 se pausa el cronometro
            this.pausa();
          }else{
            if(this.estado==1){// si el estado es 1 finaliza el cronometro
              this.finalizar();
            }
          }
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  datos_entrenamiento(){
    this.webservices.consultar_entrenamiento_por_id(this.id_ent).then(//llama a la funcion del webservices.ts y le envia la id del entrenamiento
      (datos)=>{// recibe los datos de la consulta
        //alert(JSON.stringify(datos));
        this.tipo_entrenamiento = datos[0].NOMBRE;
        this.tiempo_entrenamiento = datos[0].TIEMPO_ENT;
        this.tiempo_recuperacion = datos[0].TIEMPO_REC;
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  actualizar_estado(){
    this.webservices.actualizar_estado_entrenamiento(this.id_ent,this.estadouser).then(
      (datos) =>{
        this.respuesta= datos[0].RESPUESTA;
      //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        this.loading.dismiss();
        alert('error'+JSON.stringify(error));
      })
  }

  // Funcion Entrenamiento
  nuevoEntrenamiento(){
    this.inicioseg=0; // se inicializa el tiempo en 0
    if(this.contador_entrenamiento == undefined){ // se analiza si el contador fue definido o aun no
      this.playAudioi(); // se reproduce audio de inicio con timer
      this.contador_entrenamiento = setInterval(()=>{
        this.inicioseg+=1; //inicia el timer de inicio  de entrenamiento
        if(this.inicioseg==3){ // si el timer es igual a 3 se comienza el entrenamiento
          this.playAudiocomienzo(); // se reproduce audio de inicio con voz
          this.inicio(); // se comienza la funcion de entrenamiento 
        }
        if(this.tiempo>this.tiempo_entrenamiento-1){ // se compara si el tiempo de entrenamiento es igual al tiempo asignado como tiempo de entrenamiento para finalizar el entrenamiento
          this.finalizar(); // se finaliza el entrenamiento
        }
      },1000); // timer de control de entrenamiento en 1000 milisegundos= 1 segundo
    }
  }

  nuevoEntrenamiento2(){
    this.estadouser=3;
    this.actualizar_estado();
    this.inicioseg=0; // se inicializa el tiempo en 0
    if(this.contador_entrenamiento == undefined){ // se analiza si el contador fue definido o aun no
      this.playAudioi(); // se reproduce audio de inicio con timer
      this.contador_entrenamiento = setInterval(()=>{
        this.inicioseg+=1; //inicia el timer de inicio  de entrenamiento
        if(this.inicioseg==3){ // si el timer es igual a 3 se comienza el entrenamiento
          this.playAudiocomienzo(); // se reproduce audio de inicio con voz
          this.inicio(); // se comienza la funcion de entrenamiento 
        }
        if(this.tiempo>this.tiempo_entrenamiento-1){ // se compara si el tiempo de entrenamiento es igual al tiempo asignado como tiempo de entrenamiento para finalizar el entrenamiento
          this.finalizar(); // se finaliza el entrenamiento
        }
      },1000); // timer de control de entrenamiento en 1000 milisegundos= 1 segundo
    }
  }

// _____________________
//Cronometro

  segEntrenamiento(){
    alert('Ha definido su tiempo de entrenamiento en segundos');
    this.tiempo_entrenamiento=this.unidad_entrenamiento;
  }
  minEntrenamiento(){
    this.tiempo_entrenamiento= this.unidad_entrenamiento*60;
    alert('Ha definido su tiempo de entrenamiento en minutos');
  }
  segRecuperacion(){
    alert('Ha definido su tiempo de recuperación en segundos');
    this.tiempo_recuperacion=this.unidad_recuperacion;
  }
  minRecuperacion(){
    this.tiempo_recuperacion= this.unidad_recuperacion*60;
    alert('Ha definido su tiempo de recuperación en minutos');
  }




  inicio(){

    if(this.contador ==undefined){ // se analiza si el contador fue definido o aun no
      this.comienzoAcelerometro(); // se comienza la funcion de acelerometro
      this.comienzoGiroscopio(); // se comienza la funcion de giroscopio
      this.contador = setInterval (()=>{ // se inicia el cronometro junto con el entrenamiento
        this.cen1+=1;
        if (this.cen1 == 10){
          this.cen1 = 0;
          this.cen2 += 1;
          if  (this.cen2 == 10){
            this.cen2 = 0;
            this.seg1 +=1;
            this.tiempo+=1; // se sincroniza el cronometro de segundos transcurridos de entrenamiento con el cronometro visual  de centesimas de segundo
            if (this.seg1 ==10) {
                this.seg1 = 0;
                this.seg2 += 1;
                if  (this.seg2 == 6){
                  this.seg2 = 0;
                  this.min1 +=1;
                }
            }
          }
        }

      },10); // se define el cronometro visual en intervalo de centesimas de segundo
    }
  }

  pausa(){
    this.detenerAcelerometro(); // se detiene el acelerometro
    this.detenerGiroscopio(); // se detiene el giroscopio
    this.playAudiof(); // se reproduce audio de finalización para pausa
    this.min2Marca = this.min2; // se almacena la marca de tiempo de  min2
    this.min1Marca = this.min1; // se almacena la marca de tiempo de  min1
    this.seg2Marca = this.seg2; // se almacena la marca de tiempo de  seg2
    this.seg1Marca = this.seg1; // se almacena la marca de tiempo de  seg1
    this.cen2Marca = this.cen2; // se almacena la marca de tiempo de  cen2
    this.cen1Marca = this.cen1; // se almacena la marca de tiempo de  cen1
    this.tiempoMarca = this.tiempo;  // se almacena la marca de tiempo de "tiempo"
    
    this.min2 = 0;  //se limpia el valor de la variable min2
    this.min1 = 0;  //se limpia el valor de la variable min1
    this.seg2 = 0;  //se limpia el valor de la variable seg2
    this.seg1 = 0;  //se limpia el valor de la variable seg1
    this.cen2 = 0;  //se limpia el valor de la variable cen2
    this.cen1 = 0;  //se limpia el valor de la variable cen1

    clearInterval(this.contador); // se detiene intervalo de contador
    clearInterval(this.contador_entrenamiento); // se detiene intervalo de contador_entrenamiento
    this.contador = null; // se limpia el valor del contador
    this.contador_entrenamiento = null; // se limpia el valor de contador_entrenamiento
    this.min2 = this.min2Marca; // se le entrega el valor de pausa almacenado a min2
    this.min1 = this.min1Marca; // se le entrega el valor de pausa almacenado a min1 
    this.seg2 = this.seg2Marca; // se le entrega el valor de pausa almacenado a seg2
    this.seg1 = this.seg1Marca; // se le entrega el valor de pausa almacenado a seg1
    this.cen2 = this.cen2Marca; // se le entrega el valor de pausa almacenado a cen2
    this.cen1 = this.cen1Marca; // se le entrega el valor de pausa almacenado a cen1
    this.tiempo = this.tiempoMarca; // se le entrega el valor de pausa almacenado a tiempo

  }

  pausa2(){
    this.estadouser=2;
    this.actualizar_estado();
    this.detenerAcelerometro(); // se detiene el acelerometro
    this.detenerGiroscopio(); // se detiene el giroscopio
    this.playAudiof(); // se reproduce audio de finalización para pausa
    this.min2Marca = this.min2; // se almacena la marca de tiempo de  min2
    this.min1Marca = this.min1; // se almacena la marca de tiempo de  min1
    this.seg2Marca = this.seg2; // se almacena la marca de tiempo de  seg2
    this.seg1Marca = this.seg1; // se almacena la marca de tiempo de  seg1
    this.cen2Marca = this.cen2; // se almacena la marca de tiempo de  cen2
    this.cen1Marca = this.cen1; // se almacena la marca de tiempo de  cen1
    this.tiempoMarca = this.tiempo;  // se almacena la marca de tiempo de "tiempo"
    
    this.min2 = 0;  //se limpia el valor de la variable min2
    this.min1 = 0;  //se limpia el valor de la variable min1
    this.seg2 = 0;  //se limpia el valor de la variable seg2
    this.seg1 = 0;  //se limpia el valor de la variable seg1
    this.cen2 = 0;  //se limpia el valor de la variable cen2
    this.cen1 = 0;  //se limpia el valor de la variable cen1

    clearInterval(this.contador); // se detiene intervalo de contador
    clearInterval(this.contador_entrenamiento); // se detiene intervalo de contador_entrenamiento
    this.contador = null; // se limpia el valor del contador
    this.contador_entrenamiento = null; // se limpia el valor de contador_entrenamiento
    this.min2 = this.min2Marca; // se le entrega el valor de pausa almacenado a min2
    this.min1 = this.min1Marca; // se le entrega el valor de pausa almacenado a min1 
    this.seg2 = this.seg2Marca; // se le entrega el valor de pausa almacenado a seg2
    this.seg1 = this.seg1Marca; // se le entrega el valor de pausa almacenado a seg1
    this.cen2 = this.cen2Marca; // se le entrega el valor de pausa almacenado a cen2
    this.cen1 = this.cen1Marca; // se le entrega el valor de pausa almacenado a cen1
    this.tiempo = this.tiempoMarca; // se le entrega el valor de pausa almacenado a tiempo

  }

  finalizar(){
    this.detenerAcelerometro(); // se detiene acelerometro
    this.detenerGiroscopio(); // se detiene giroscopio
    this.playAudiof(); // se reproduce audio de finalizacion
    this.playAudiofn(); // se reproduce audio de finalizacion por voz
    // se restaura el cronometro como 0
    this.min2 = 0; 
    this.min1 = 0; 
    this.seg2 = 0;
    this.seg1 = 0;
    this.cen2 = 0;
    this.cen1 = 0;
    // se limpian los intervalos de los contadores y se dejan como nulos
    clearInterval(this.contador);
    clearInterval(this.contador_entrenamiento);
    this.contador = null;
    this.contador_entrenamiento = null;
    // se redefine el timepo de entrenamiento como 0
    this.tiempo=0;
    this.recuperacion();
    this.cambio= true;
  }

  finalizar2(){
    this.estadouser=1;
    this.actualizar_estado();
    this.detenerAcelerometro(); // se detiene acelerometro
    this.detenerGiroscopio(); // se detiene giroscopio
    this.playAudiof(); // se reproduce audio de finalizacion
    this.playAudiofn(); // se reproduce audio de finalizacion por voz
    // se restaura el cronometro como 0
    this.min2 = 0; 
    this.min1 = 0; 
    this.seg2 = 0;
    this.seg1 = 0;
    this.cen2 = 0;
    this.cen1 = 0;
    // se limpian los intervalos de los contadores y se dejan como nulos
    clearInterval(this.contador);
    clearInterval(this.contador_entrenamiento);
    this.contador = null;
    this.contador_entrenamiento = null;
    // se redefine el timepo de entrenamiento como 0
    this.tiempo=0;
    this.cambio= true;
  }

  recuperacion(){
    // se analiza si el contador fue definido o aun no
     alert("Comienza el tiempo de recuperación")
     this.playAudiof();
     this.contador_recuperacion = setInterval (()=>{ // se inicia el cronometro junto con el entrenamiento
       this.cen1+=1;
       if (this.cen1 == 10){
         this.cen1 = 0;
         this.cen2 += 1;
         if  (this.cen2 == 10){
           this.cen2 = 0;
           this.seg1 +=1;
           this.tiempo+=1; // se sincroniza el cronometro de segundos transcurridos de entrenamiento con el cronometro visual  de centesimas de segundo
           if(this.tiempo ==this.tiempo_recuperacion){
               this.finalizar_recuperacion();
           }
           if (this.seg1 ==10) {
               this.seg1 = 0;
               this.seg2 += 1;
               if  (this.seg2 == 6){
                 this.seg2 = 0;
                 this.min1 +=1;
               }
           }
         }
       }
     },10); // se define el cronometro visual en intervalo de centesimas de segundo
     
 }
 finalizar_recuperacion(){
   this.playAudiof();
    // se restaura el cronometro como 0
   this.min2 = 0; 
   this.min1 = 0; 
   this.seg2 = 0;
   this.seg1 = 0;
   this.cen2 = 0;
   this.cen1 = 0;
   // se limpian los intervalos de los contadores y se dejan como nulos
   clearInterval(this.contador_recuperacion);
   this.contador_recuperacion = null;
   // se redefine el timepo de entrenamiento como 0
   this.tiempo=0;
   this.navCtrl.push(DatosentrenamientoPage, {id_entrenamiento:this.id_ent, correo:this.correo,id_solicitud:this.id_solicitud})// se mueve hacia la vista indicada, pasando las variables en corchetes "{}"
 }
  lapso(){
    //se define un objeto para almacenar distintas marcas de tiempo durante el entrenamiento 
    let obj:any = {};
    obj.min2 = this.min2;
    obj.min1 = this.min1;
    obj.seg2 = this.seg2;
    obj.seg1 = this.seg1;
    obj.cen2 = this.cen1;
    obj.cen1 = this.cen1;

    this.coleccion.push(obj); // se imprime en pantalla la coleccion del objeto (variables de tiempo definidas)

  }

  consulta_peso(){// se consulta el peso del deportista
    this.webservices.consulta_deportista(this.correo).then(// se envia la variable correo como consulta al php
      (datos)=>{
        //alert(JSON.stringify(datos));
        this.peso= datos[0].PESO; //se recibe del peso del correo solicitado
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }


//Perifericos (Gyroscopio,acelerometro,Sonidos)
//Acelerometro
  comienzoAcelerometro(){
    //this.playAudioi();
    try{
      var option : DeviceMotionAccelerometerOptions ={ // se configura el acelerometro con una frecuencia de 100
        frequency : 100
      };
    
      this.id = this.deviceMotion.watchAcceleration(option).subscribe((acc:DeviceMotionAccelerationData) =>{ // se inicia variable receptora de informacion de acelerometro "id" y se define objeto acc al cual se le entregan los parametros de aceleracion
        // se le entrega el valor segun su eje respectivo a cada variable
        this.accX = acc.x;  
        this.accY = acc.y; 
        this.accZ = acc.z;
        // se muestra la marca de tiempo para tener seguridad de que acelerometro funciona con  normalidad
        this.timestamp = acc.timestamp;
        //Calculos____________________
        this.acel_x_y_z= ((this.accX**2) + (this.accY**2) + (this.accZ**2))**0.5; //aceleracion resultante
        
        this.fuerza = 1*(this.peso/9.8)* this.acel_x_y_z; // fuerza resultante

        this.potencia = this.fuerza * this.acel_x_y_z; //potencia resultante

        this.punto_max();//para sacar los valores maximos de aceleracion, fuerza y potencia

        this.webservices.acelerometro_datos(this.id_ent,this.accX, this.accY, this.accZ, this.acel_x_y_z,this.fuerza,this.potencia).then( // se envian los datos al servidor web
          (datos) =>{
            var respuesta= datos[0].RESPUESTA;
            //alert('oka'+JSON.stringify(resultado));
          },
          (error) =>{
            alert('error'+JSON.stringify(error)); // muestra una alerta si ocurrió algun error durante el proceso
          }
        )   
      }
      );      
    }catch(err){
    alert("Error" + err); // muestra una alerta si ocurrió algun error durante el proceso
    }
  }

  detenerAcelerometro(){
    this.id.unsubscribe(); // se detiene el receptor de datos de acelerometro
  }

  load() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Procesando Solicitud...',
      dismissOnPageChange: true
    });
    
    this.loading.present();
  }

//Gyroscopio  
  comienzoGiroscopio(){
    try{
      var options : GyroscopeOptions={ // se configura el giroscopio con una frecuencia de 100
        frequency : 100
      };// se inicia variable receptora de informacion de giroscopio "idg" y se define objeto orientation al cual se le entregan los parametros de aceleracion
      this.idg = this.gyroscope.watch(options).subscribe((orientation: GyroscopeOrientation) => { 
        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
        // se le entrega el valor segun su eje respectivo a cada variable
        this.xOrient=orientation.x;
        this.yOrient=orientation.y;
        this.zOrient=orientation.z;
        this.timestampd=orientation.timestamp;
        //Calculos____________________
        this.giro_x_y_z = ((this.xOrient**2)+(this.yOrient**2)+(this.zOrient**2))**0.5; //vector resultante

        this.webservices.giroscopio_datos(this.id_ent,this.xOrient, this.yOrient, this.zOrient, this.giro_x_y_z).then(// se envian los datos al servidor web
          (resultado) =>{
            //alert('oka'+JSON.stringify(resultado));
          },
          (error) =>{
            alert('error'+JSON.stringify(error));// muestra una alerta si ocurrió algun error durante el proceso
          }
        )  
     });
    }catch(err){
      alert("Error" + err);// muestra una alerta si ocurrió algun error durante el proceso
    } 
  }
  detenerGiroscopio(){
    this.idg.unsubscribe(); // se detiene el receptor de datos de giroscopio
  }

//Sonidos  
  playAudioi() {
    console.log("playing audio"); // se le indica a la consola reproducir el audio

    this.nativeAudio.play('inicio').then(function() { //se le indica a la consola que audio reproducir
        console.log("playing audio!");
    }, function(err) {
        console.log("error playing audio: " + err); // se le indica a la consola que muestre un error si existe algun tipo de problema.
    });
  }
  playAudiof() {
    console.log("playing audio");// se le indica a la consola reproducir el audio

    this.nativeAudio.play('finalizar').then(function() {//se le indica a la consola que audio reproducir
        console.log("playing audio!");
    }, function(err) {
        console.log("error playing audio: " + err);// se le indica a la consola que muestre un error si existe algun tipo de problema.
    });
  }
  playAudiofn() {
    console.log("playing audio");// se le indica a la consola reproducir el audio

    this.nativeAudio.play('finentrenamiento').then(function() {//se le indica a la consola que audio reproducir
        console.log("playing audio!");
    }, function(err) {
        console.log("error playing audio: " + err);// se le indica a la consola que muestre un error si existe algun tipo de problema.
    });
  }
  playAudiocomienzo() {
    console.log("playing audio");// se le indica a la consola reproducir el audio

    this.nativeAudio.play('comienzoentrenamiento').then(function() {//se le indica a la consola que audio reproducir
        console.log("playing audio!");
    }, function(err) {
        console.log("error playing audio: " + err);// se le indica a la consola que muestre un error si existe algun tipo de problema.
    });
  }

  //funcion para cambiar icono pausa y reproducir
  cambiaricon(){
    if(this.cambio == true){//si al presionar el boton este es true(play)
      this.cambio = false;//se cambia por false(stop)
    }else{
      this.cambio = true;//sino al apretar el boton este es false(stop), se cambia por true(play)
    }
  }
  //funcion que compara los valores de aceleracion, fuerza y potencia y rescata el valor max de cada una de estas.
  punto_max(){
    if(this.acel_x_y_z > this.A_max){
      this.A_max= this.acel_x_y_z.toFixed(2);
    }
    if(this.fuerza > this.F_max){
      this.F_max= this.fuerza.toFixed(2);
    }
    if(this.potencia > this.P_max){
      this.P_max= this.potencia.toFixed(2);
    }
  }

}
  