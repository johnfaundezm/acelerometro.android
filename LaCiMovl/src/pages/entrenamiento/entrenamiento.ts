import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion';

//import { Observable } from 'rxjs/Observable'
import  'rxjs/add/observable/interval' 
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { WebservicesProvider } from '../../providers/webservices/webservices';

@IonicPage()
@Component({
  selector: 'page-entrenamiento',
  templateUrl: 'entrenamiento.html',
})
export class EntrenamientoPage {

  datos_acc: Array<{varx:string, vary:string, varz:string}>=[{varx:'', vary:'', varz:''}];
  
  //Timer
  intervalVal;
  timer = 0;
  timerVar;
  timerVal;
  tiempo_entrenamiento;
  //-------------------------

  loading:any;

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
  public xOrient:any;
  public yOrient:any;
  public zOrient:any;
  public timestamp:any
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

  
  constructor(public navCtrl: NavController, public navParams: NavParams, private gyroscope:Gyroscope, private deviceMotion: DeviceMotion, private webservices: WebservicesProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntrenamientoPage');
  }

  ionViewCanEnter() {
    while(this.datos_acc.length>0){
      this.datos_acc.pop();
    }
  }

  gyrascope(){

    let options: GyroscopeOptions = {
      frequency: 1000
   };
   
   this.gyroscope.getCurrent(options)
     .then((orientation: GyroscopeOrientation) => {
        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
        this.xOrient=orientation.x;
        this.yOrient=orientation.y;
        this.zOrient=orientation.z;
        this.timestamp=orientation.timestamp;

      })
     .catch()
   
   
   this.gyroscope.watch()
      .subscribe((orientation: GyroscopeOrientation) => {
         console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
         this.xOrient=orientation.x;
        this.yOrient=orientation.y;
        this.zOrient=orientation.z;
        this.timestamp=orientation.timestamp;
      });
  }

  Accelerometer(){
      
      this.deviceMotion.getCurrentAcceleration().then(
        (acceleration: DeviceMotionAccelerationData) =>
        console.log(acceleration),
    
      //  (error: any) => console.log(error)
  
      );
      
      // Watch device acceleration
      var subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
        console.log(acceleration);
        this.accX=acceleration.x;
        this.accY=acceleration.y;
        this.accZ=acceleration.z;
    });
  
  }

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
    clearInterval(this.contador);
      this.min2 = 0;
      this.min1 = 0;
      this.seg2 = 0;
      this.seg1 = 0;
      this.cen2 = 0;
      this.cen1 = 0;
      this.contador = null;
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
  
/*Funciones adicionales
  intervale(){
    var intervalVar = setInterval(function(){
       this.timer++;
   }.bind(this),1000)
  }

  startTimer(){
    this.timerVar = Observable.interval(1000).subscribe ( x=>{
      console.log(x)
      this.timerVal = x;

      if( x == 10 ){
        this.timerVar.unsubscribe()
        alert('Entrenamiento terminado');
      }
    })
  }*/  

  Accelero(){
    var tiempo =10;
    var i=0 ;
    this.vectorX[0] = 0;
    this.vectorY[0] = 0;
    this.vectorZ[0] = 0;

    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) =>
      console.log(acceleration),
  
    
    );
    var subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);
      
      this.accX=acceleration.x;
      this.accY=acceleration.y;
      this.accZ=acceleration.z;
      if(this.accX != this.vectorX[i]){
        this.vectorX[i] = this.accX;
        i++;
        if (i==(tiempo-1)){
          subscription.unsubscribe();
        }
      }
    })
  };

  comienzoAcelerometro(){
    var tiempo =60;
    var i=0 ;
    this.vectorX[0] = 0;
    this.vectorY[0] = 0;
    this.vectorZ[0] = 0;
    
    try{
      var option : DeviceMotionAccelerometerOptions ={
        frequency : 200
      };
    
      this.id = this.deviceMotion.watchAcceleration(option).subscribe((acc:DeviceMotionAccelerationData) =>{
        
        this.accX = acc.x;
        this.accY = acc.y;
        this.accZ = acc.z;
        this.timestamp = acc.timestamp;
        this.webservices.acelerometro_datos(this.accX, this.accY, this.accZ).then(
          (resultado) =>{
            //alert('oka'+JSON.stringify(resultado));
          },
          (error) =>{
            alert('error'+JSON.stringify(error));
          }
        )

          this.vectorX[i] = this.accX;
          //alert(this.vectorX[i]);
          if (i==(tiempo-1)){
            this.id.unsubscribe();
          }
          i++;
          
      }
      );      
    }catch(err){
    alert("Error" + err);
    }
    
  
  }
  detenerAcelerometro(){
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
  


}
