import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Platform } from 'ionic-angular';

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
  
  loading:any;
  //Funcion de entrenamiento
  public tiempo_entrenamiento: number = 10
  public inicioseg : number=0;
  public contador_entrenamiento : any;
  public potencia : any;
  public fuerza: any;
  //________________________
  //Cronometro
  public min1: number =0;
  public min2: number =0;
  public seg1: number =0;
  public seg2: number =0;
  public cen1 : number = 0;
  public cen2 : number = 0;
  //--Marcas
  public min2Marca :number;
  public min1Marca :number;
  public seg2Marca :number;
  public seg1Marca :number;
  public cen2Marca :number;
  public cen1Marca :number;
//---Contador
  public coleccion : Array<any> = [];
  public contador : any;
//-----------------------------------
  
  //Gyroscopio y Acelerometro
  public id : any;
  public idg: any;
  public xOrient:any;
  public yOrient:any;
  public zOrient:any;
  public giro_x_y_z : any;
  public acel_x_y_z : any;
  public timestamp:any;
  public timestampd:any;
  public accX:any;
  public accY:any;
  public accZ:any;
  //--------------------------
  public vectorX : Array<any> = [];
  public vectorY : Array<any> = [];
  public vectorZ : Array<any> = [];
  //--------------------------
  public fuerzaX : Array<any> = [];
  public fuerzaY : Array<any> = [];
  public fuerzaZ : Array<any> = [];
  //--------------------------
  public potenciaX : Array<any> = [];
  public potenciaY : Array<any> = [];
  public potenciaZ : Array<any> = [];

  actividades: string = 'ejercicio';
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform, private gyroscope:Gyroscope, private deviceMotion: DeviceMotion, private webservices: WebservicesProvider, public loadingCtrl: LoadingController,private nativeAudio: NativeAudio) {
    this.platform.ready().then(() => { 
      console.log("platform ready");

      // This is used to unload the track. It's useful if you're experimenting with track locations
      this.nativeAudio.unload('trackID').then(function() {
          console.log("unloaded audio!");
      }, function(err) {
          console.log("couldn't unload audio... " + err);
      });

      // 'trackID' can be anything
      this.nativeAudio.preloadComplex('inicio', 'assets/audio/inicio.mp3', 1, 1, 0).then(function() {
          console.log("audio loaded!");
      }, function(err) {
          console.log("audio failed: " + err);
      });
      this.nativeAudio.preloadComplex('finalizar', 'assets/audio/finalizacion.mp3', 1, 1, 0).then(function() {
        console.log("audio loaded!");
      }, function(err) {
        console.log("audio failed: " + err);
      });
      this.nativeAudio.preloadComplex('finentrenamiento', 'assets/audio/finentrenamiento.mp3', 1, 1, 0).then(function() {
        console.log("audio loaded!");
      }, function(err) {
        console.log("audio failed: " + err);
      });

    });
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
    if(this.contador_entrenamiento == undefined){
      this.playAudioi();
      this.contador_entrenamiento = setInterval(()=>{
        this.inicioseg+=1;
        
        if(this.inicioseg==3){
          this.comienzoAcelerometro();
          this.comienzoGiroscopio();
        }
        if (this.inicioseg==this.tiempo_entrenamiento+6){
          this.finalizar();
        }
        
      },1000);
    }
  }
// _____________________
//Cronometro
  inicio(){

    if(this.contador ==undefined){
      this.contador = setInterval (()=>{
        this.cen1+=1;
        if (this.cen1 == 10){
          this.cen1 = 0;
          this.cen2 += 1;
          if  (this.cen2 == 10){
            this.cen2 = 0;
            this.seg1 +=1;
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
      },10);
    }
  }

  marca(){
    this.playAudiof();
    this.id.unsubscribe();
    this.idg.unsubscribe();
    this.min2Marca = this.min2;
    this.min1Marca = this.min1;
    this.seg2Marca = this.seg2;
    this.seg1Marca = this.seg1;
    this.cen2Marca = this.cen2;
    this.cen1Marca = this.cen1;

    this.min2 = 0;
    this.min1 = 0;
    this.seg2 = 0;
    this.seg1 = 0;
    this.cen2 = 0;
    this.cen1 = 0;
    clearInterval(this.contador);
    this.contador = null;
    this.min2 = this.min2Marca;
    this.min1 = this.min1Marca;
    this.seg2 = this.seg2Marca;
    this.seg1 = this.seg1Marca;
    this.cen2 = this.cen2Marca;
    this.cen1 = this.cen1Marca;
  }

  finalizar(){
    this.playAudiof();
    this.playAudiofn();
    this.detenerAcelerometro();
    this.detenerGiroscopio();

    clearInterval(this.contador);
      this.min2 = 0;
      this.min1 = 0;
      this.seg2 = 0;
      this.seg1 = 0;
      this.cen2 = 0;
      this.cen1 = 0;
      this.contador = null;
      this.contador_entrenamiento = null;
      
  }

  lapso(){
    let obj:any = {};
    obj.min2 = this.min2;
    obj.min1 = this.min1;
    obj.seg2 = this.seg2;
    obj.seg1 = this.seg1;
    obj.cen2 = this.cen1;
    obj.cen1 = this.cen1;

    this.coleccion.push(obj);

  }

//Perifericos (Gyroscopio,acelerometro,Sonidos)
//Acelerometro
  comienzoAcelerometro(){
    //this.playAudioi();
    this.inicio();
    try{
      var option : DeviceMotionAccelerometerOptions ={
        frequency : 100
      };
    
      this.id = this.deviceMotion.watchAcceleration(option).subscribe((acc:DeviceMotionAccelerationData) =>{
        
        this.accX = acc.x;
        this.accY = acc.y;
        this.accZ = acc.z;
        this.timestamp = acc.timestamp;
        //Calculos____________________
        this.acel_x_y_z= (this.accX + this.accY + this.accZ)/3;
        
        this.fuerza = 1/*masa_deportista*/* this.acel_x_y_z;

        this.potencia = this.fuerza * this.acel_x_y_z;

        this.webservices.acelerometro_datos(this.accX, this.accY, this.accZ, 0,0,0).then(
          (resultado) =>{
            //alert('oka'+JSON.stringify(resultado));
          },
          (error) =>{
            alert('error'+JSON.stringify(error));
          }
        )   
      }
      );      
    }catch(err){
    alert("Error" + err);
    }
    
  
  }
  detenerAcelerometro(){
    this.playAudiofn();
    this.id.unsubscribe();
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
        var respuesta= datos[0].RESPUESTA;
        this.loading.dismiss();
        if(respuesta=='OK'){
          this.navCtrl.push(EntrenamientoPage);
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
  }
//Gyroscopio  
  comienzoGiroscopio(){
    try{
      var options : GyroscopeOptions={
        frequency : 100
      };
      this.idg = this.gyroscope.watch(options).subscribe((orientation: GyroscopeOrientation) => {
        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
        this.xOrient=orientation.x;
        this.yOrient=orientation.y;
        this.zOrient=orientation.z;
        this.timestampd=orientation.timestamp;
        //Calculos____________________
        this.giro_x_y_z = (this.xOrient+this.yOrient+this.zOrient)/3;

        this.webservices.giroscopio_datos(this.xOrient, this.yOrient, this.zOrient).then(
          (resultado) =>{
            //alert('oka'+JSON.stringify(resultado));
          },
          (error) =>{
            alert('error'+JSON.stringify(error));
          }
        )  
     });
    }catch(err){
      alert("Error" + err);
    } 
  }
  detenerGiroscopio(){
    this.idg.unsubscribe();
  }
//Sonidos  
  playAudioi() {
    console.log("playing audio");

    this.nativeAudio.play('inicio').then(function() {
        console.log("playing audio!");
    }, function(err) {
        console.log("error playing audio: " + err);
    });
  }
  playAudiof() {
    console.log("playing audio");

    this.nativeAudio.play('finalizar').then(function() {
        console.log("playing audio!");
    }, function(err) {
        console.log("error playing audio: " + err);
    });
  }
  playAudiofn() {
    console.log("playing audio");

    this.nativeAudio.play('finentrenamiento').then(function() {
        console.log("playing audio!");
    }, function(err) {
        console.log("error playing audio: " + err);
    });
  }

}
