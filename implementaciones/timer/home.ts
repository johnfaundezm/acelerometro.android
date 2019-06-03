import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable'
import  'rxjs/add/observable/interval' 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  timer = 0;
  timerVar;
  timerVal;
  tiempo_entrenamiento : any;
  constructor(public navCtrl: NavController) {
    this.startTimer();
    this.intervale();
  }
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
      this.tiempo_entrenamiento = 10;// cambiar por un input

      if( x == this.tiempo_entrenamiento -1 ){
        this.timerVar.unsubscribe()
        alert('Entrenamiento terminado');
      }
    })
  }
}
