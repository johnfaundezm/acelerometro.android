import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { complex,multiply, exp, pi, sin, add, subtract } from 'mathjs';
//const Complex = require('complex-js');
@IonicPage()
@Component({
  selector: 'page-fourier',
  templateUrl: 'fourier.html',
})
export class FourierPage {
  
  public datos_acelerometro=[1,3,5,4,2,3];
  public giroscopioDatos=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FourierPage');
  }


  
  
    fft2(X){

      var N = X.length; //define el largo del arreglo
      if (N <= 1){  //si el arreglo es menor que 2 retorna el arreglo
        return X;
      }
      var M = N/2; //calcula la mitad del arreglo
      
      //define 2 arreglos
      var even = [];
      var odd = [];
      //asigna a ambos arreglos la mitad del largo del arreglo principal
      even.length= M;
      odd.length= M;
      //llena ambos arreglos con el contenido del arreglo principal
      for(var i = 0;i<M;i++){
        even[i]= X[i*2]; // asigna los valores  de posicion pares
        odd[i]= X[i*2+1];// asigna los valores de posicion impares
      }
      even = this.fft2(even); //aplica la funcion fft2 para los valores del arreglo even
      odd = this.fft2(odd); //aplica la funcion fft2 para los valores del arreglo odd
      var a = -2*Math.PI; //asgina el valor -2pi a la variable "a";
     /* 
      for (var k=0; k < M;k++){

        var t=exp(complex(0,a*k/N));

        t= multiply(t,odd[k]);
        X[k] = odd[k] = add(even[k],t);
        X[k+M] = even[k] = subtract(even[k],t);
      }*/
      return X;  
    
    }
    linspace(A,B,S){
      var Y = new Array(0);
      var D = (B-A)/(S-1);
      for (var i = A;i <=B;i +=D){
        Y.push(i);
      }
      return Y;
    }
    make_complex(X){/*
      for (var i =0; i< X.length;i++){
        X[i] = complex(X[i],0);
      }*/
    }
    calc_function(T){
      var X =[];
      X.length = T.length;/*
      for (var t =0;t<T.length; t++){
        X[t] = sin(2*Math.PI*T[t]);
      }*/
      return X;
    }
    
    fourier(){
      var T=this.linspace(0,1,8);
      var X= this.calc_function(T);
      this.make_complex(X);
      var Y=this.fft2(X);
      var Yr=[];
      Yr.length = Y.length;

      for (var i = 0;i< Y.length; i++){
        Yr[i] = Y[i].re;
      }
      console.log(Yr);      
    }
    
  

  
}
