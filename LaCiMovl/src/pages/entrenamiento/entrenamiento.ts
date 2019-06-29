import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Platform, AlertController } from 'ionic-angular';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion';
import { NativeAudio } from '@ionic-native/native-audio';

//import { Observable } from 'rxjs/Observable'
import  'rxjs/add/observable/interval' 
import { WebservicesProvider } from '../../providers/webservices/webservices';

@IonicPage()
@Component({
  selector: 'page-entrenamiento',
  templateUrl: 'entrenamiento.html',
})
export class EntrenamientoPage {

  datos_acc: Array<{varx:string, vary:string, varz:string}>=[{varx:'', vary:'', varz:''}];
  enlaces: Array<{ide:string, email:string, fecha:string}>=[{ide:'', email:'', fecha:''}];
  enlaces_pend: Array<{email:string}>=[{email:''}];
  
  correo:any;
  peso:any;
  loading:any;
  //Funcion de entrenamiento
  public tipo_entrenamiento : String;
  public tiempo : number = 0; //tiempo transcurrido del entrenamiento
  public tiempo_entrenamiento: number; //duración del entrenamiento
  public unidad_entrenamiento: number;
  public inicioseg : number=0; //cronometro de inicio de entrenamiento
  public contador_entrenamiento : any; // variable de intervalo de entrenamiento
  public potencia : any;  //potencia del usuario durante el entrenamiento
  public fuerza: any; // fuerza del usuario durante el entrenamiento
  //________________________
  //Funciones de estadisticas
  public pi : number =3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989;
  public  e : number =2.718281828459045235360287471352 ;


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

//---Contador
  public coleccion : Array<any> = [];
  public contador : any; //variable de intervalo para cronometro
//-----------------------------------
  
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
  //--------------------------
  public vectorX : Array<any> = []; //arreglo para almacenar x
  public vectorY : Array<any> = []; //arreglo para almacenar y
  public vectorZ : Array<any> = []; //arreglo para almacenar z
  //--------------------------
  public fuerzaX : Array<any> = []; //arreglo para almacenar fuerza x
  public fuerzaY : Array<any> = []; //arreglo para almacenar fuerza y
  public fuerzaZ : Array<any> = []; //arreglo para almacenar fuerza z
  //--------------------------
  public potenciaX : Array<any> = []; //arreglo para almacenar potencia x
  public potenciaY : Array<any> = []; //arreglo para almacenar potencia y
  public potenciaZ : Array<any> = []; //arreglo para almacenar potencia z

  actividades: string = 'ejercicio';
  tiempoMarca: any;  //marca del tiempo para pausas
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform, 
              private gyroscope:Gyroscope, private deviceMotion: DeviceMotion, private webservices: WebservicesProvider, 
              public loadingCtrl: LoadingController,private nativeAudio: NativeAudio, public alertCtrl: AlertController) {
    
    this.correo = this.navParams.get('correo'); //Se recibe el correo del deportista
    this.consulta_peso(); //Se inicializa la consulta del peso     
    this.consulta_solicitud_pend(); //Se inicializa la consulta de las solicitudes pendientes
    this.consulta_enlace(); //Se inicializa la consulta de los enlaces

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

  alerta_confirmacion(correo) {
    const confirm = this.alertCtrl.create({
      title: 'Confirmacion de solicitud',
      message: 'Aceptas a '+correo+' como entrenador?',
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
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntrenamientoPage');
  }

  ionViewCanEnter() {
    while(this.datos_acc.length>0){
      this.datos_acc.pop();
    }
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
          var email= datos[i].ENTRENADOR;// se recibe el correo de la solicitud pendiente
          this.enlaces_pend.push({"email":email});
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
        
        this.fuerza = 1*this.peso* this.acel_x_y_z; // fuerza resultante

        this.potencia = this.fuerza * this.acel_x_y_z; //potencia resultante

        this.webservices.acelerometro_datos(this.accX, this.accY, this.accZ, this.acel_x_y_z,0,0).then( // se envian los datos al servidor web
          (resultado) =>{
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

  consultar_acc(){
    this.load();
    let largo=this.datos_acc.length;
    for(var i=0;i<largo;i++){
      this.datos_acc.pop();
    }
    this.webservices.consulta_acelerometro_datos().then(
      (datos) =>{
        let largo=Object.keys(datos).length;
        for(var i=0;i<largo;i++){
          var varx= datos[i].ACELERACIONX;
          var vary= datos[i].ACELERACIONY;
          var varz= datos[i].ACELERACIONZ;
          this.loading.dismiss();
          this.datos_acc.push({"varx":varx, "vary":vary, "varz":varz});           
        }
        //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        alert('error'+JSON.stringify(error));
      }
    )
  }

  borrar_acc(){
    this.load();
    this.webservices.delete_acelerometro_datos().then(
      (datos) =>{
        this.webservices.delete_giroscopio_datos().then(
          (datos) =>{
            var respuesta= datos[0].RESPUESTA;
            this.loading.dismiss();
            if(respuesta=='OK'){
              this.consultar_acc();
              alert('Los datos se han borrado satisfactoriamente');
            }else{
              alert('Ha ocurrido un error en el borrado');
            }
            //alert('oka'+JSON.stringify(resultado));
          },
          (error) =>{
            alert('error'+JSON.stringify(error));
          }
        )
        //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        alert('error'+JSON.stringify(error));
      }
    )


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

        this.webservices.giroscopio_datos(this.xOrient, this.yOrient, this.zOrient).then(// se envian los datos al servidor web
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

  fourier(){
  }
}
