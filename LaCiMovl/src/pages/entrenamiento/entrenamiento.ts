import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

import { Observable } from 'rxjs/Observable'
import  'rxjs/add/observable/interval' 

/**
 * Generated class for the EntrenamientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  //Gyroscopio y Acelerometro
  public xOrient:any;
  public yOrient:any;
  public zOrient:any;
  public timestamp:any
  public accX:any;
  public accY:any;
  public accZ:any;
  //--------------------------

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



}
