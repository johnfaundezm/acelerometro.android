import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

import { Observable } from 'rxjs/Observable'
import  'rxjs/add/observable/interval' 

@IonicPage()
@Component({
  selector: 'page-entrenamiento',
  templateUrl: 'entrenamiento.html',
})
export class EntrenamientoPage {
  
  //Timer
  intervalVal;
  timer = 0;
  timerVar;
  timerVal;
  tiempo_entrenamiento;
  //-------------------------
  //Cronometro
  /*
  public hora: number =0;
  public minuto: number =0;
  public segundos : number =0;
  */
  public hora: number =0;
  public min1: number =0;
  public min2: number =0;
  public seg1: number =0;
  public seg2: number =0;

  public centesima : number = 0;
  public cen1 : number = 0;
  public cen2 : number = 0;

  public horaMarca :number;
  public minutoMarca :number;
  public segundosMarca : number;
  public centesimaMarca : number;
  public min2Marca :number;
  public min1Marca :number;
  public seg2Marca :number;
  public seg1Marca :number;
  public cen2Marca :number;
  public cen1Marca :number;

  public coleccion : Array<any> = [];
  public contador : any;
  
  
  //Gyroscopio y Acelerometro
  public xOrient:any;
  public yOrient:any;
  public zOrient:any;
  public timestamp:any
  public accX:any;
  public accY:any;
  public accZ:any;
  //--------------------------
  public vector : Array<any> = [];
  public accmed : any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private gyroscope:Gyroscope, private deviceMotion: DeviceMotion) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntrenamientoPage');
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
    var x = 0;
    var i = 0;

    while(x!= 10){
    
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

        this.vector[x] = ((this.accX**2) + (this.accY**2) + (this.accZ**2))**0.5;
        //alert ('x : '+this.accX );
        //alert ('y : '+this.accY );
        //alert ('z : '+this.accZ );
        //alert ('vector : '+this.vector[x] );
        //alert ('ciclo : '+x);
        this.accmed=this.accmed + this.vector[x];
      });
      x=x+1;
  }
  this.accmed =this.accmed/x;
  x=0;
  alert ('el promedio accmed es : '+this.accmed);
  this.accmed=0;
  }
  //--------------------------------------------------------------------------------------------------------   
  /* Elerta Cuanto terminal el tiempo
  startTimer(){
    setTimeout(function(){
      alert('ok');
    },3000)
  } */
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
 }  
// Cronometro
/*
  inicio(){
    if (this.contador == undefined){
      this.contador= setInterval ( ()=>{
        this.segundos+=1;
        
        if (this.segundos == 60){
          this.segundos = 0;
          this.minuto += 1;
          if  (this.minuto == 60){
            this.minuto = 0;
            this.hora +=1;
            if (this.hora =24) {
                this.hora = 0;
            }
          }
        }
      },1000);
    }
  }

  marca(){
    this.horaMarca =this.hora;
    this.minutoMarca = this.minuto;
    this.segundosMarca = this.segundos;
    this.centesimaMarca = this.centesima;
  }

  lapso(){
    let obj:any = {};
    obj.hora = this.hora;
    obj.minutos = this.minuto;
    obj.segundos = this.segundos;

    this.coleccion.push(obj);

  }

  finalizar(){
    clearInterval(this.contador);
      this.hora = 0;
      this.minuto = 0;
      this.segundos = 0;
      this.contador = null;
  }
*/

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
}
