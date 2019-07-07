import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { complex,multiply, exp, pi, sin, add, subtract } from 'mathjs';
//const Complex = require('complex-js');
declare const math: any;

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


  
  //intento 1
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
      var a = -2*math.pi; //asgina el valor -2pi a la variable "a";
      
      for (var k=0; k < M;k++){

        var t=math.exp(math.complex(0,a*k/N));

        t= math.multiply(t,odd[k]);
        X[k] = odd[k] = math.add(even[k],t);
        X[k+M] = even[k] = math.subtract(even[k],t);
      }
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
    make_complex(X){
      for (var i =0; i< X.length;i++){
        X[i] = math.complex(X[i],0);
      }
    }
    calc_function(T){
      var X =[];
      X.length = T.length;
      for (var t =0;t<T.length; t++){
        X[t] = math.sin(2*math.pi*T[t]);
      }
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
  //intento 2
  FFTNayuki=function (n) {
    
    this.n = n;
    this.levels = -1;
    for (var i = 0; i < 32; i++) {
        if (1 << i == n) {
            this.levels = i;  // Equal to log2(n)
        }
    }
    if (this.levels == -1) {
        throw "Length is not a power of 2";
    }
    this.cosTable = new Array(n / 2);
    this.sinTable = new Array(n / 2);
    for (var i = 0; i < n / 2; i++) {
        this.cosTable[i] = Math.cos(2 * Math.PI * i / n);
        this.sinTable[i] = Math.sin(2 * Math.PI * i / n);
    }
    /* 
     * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
     * The vector's length must be equal to the size n that was passed to the object constructor, and this must be a power of 2. Uses the Cooley-Tukey decimation-in-time radix-2 algorithm.
     */
    this.forward = function(real, imag) {
        var n = this.n;
        
        // Bit-reversed addressing permutation
        for (var i = 0; i < n; i++) {
            var j = reverseBits(i, this.levels);
            if (j > i) {
                var temp = real[i];
                real[i] = real[j];
                real[j] = temp;
                temp = imag[i];
                imag[i] = imag[j];
                imag[j] = temp;
            }
        }
    
        // Cooley-Tukey decimation-in-time radix-2 FFT
        for (var size = 2; size <= n; size *= 2) {
            var halfsize = size / 2;
            var tablestep = n / size;
            for (var i = 0; i < n; i += size) {
                for (var j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
                    var tpre =  real[j+halfsize] * this.cosTable[k] +
                                imag[j+halfsize] * this.sinTable[k];
                    var tpim = -real[j+halfsize] * this.sinTable[k] +
                                imag[j+halfsize] * this.cosTable[k];
                    real[j + halfsize] = real[j] - tpre;
                    imag[j + halfsize] = imag[j] - tpim;
                    real[j] += tpre;
                    imag[j] += tpim;
                }
            }
        }
    
        // Returns the integer whose value is the reverse of the lowest 'bits' bits of the integer 'x'.
        function reverseBits(x, bits) {
            var y = 0;
            for (var i = 0; i < bits; i++) {
                y = (y << 1) | (x & 1);
                x >>>= 1;
            }
            return y;
        }
    }
    /* 
     * Computes the inverse discrete Fourier transform (IDFT) of the given complex vector, storing the result back into the vector.
     * The vector's length must be equal to the size n that was passed to the object constructor, and this must be a power of 2. This is a wrapper function. This transform does not perform scaling, so the inverse is not a true inverse.
     */
    this.inverse = function(real, imag) {
        this.forward(imag, real);
    }
}  
  

  
}
