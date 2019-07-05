import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-fourier',
  templateUrl: 'fourier.html',
})
export class FourierPage {

  public acelerometroDatos=[];
  public giroscopioDatos=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FourierPage');
  }


  acelerometroFFT(){

  }

  giroscopioFFT(){

  }
  /*
  fft2(acelerometroDatos) {
    var N = acelerometroDatos.length;
    if (N <= 1) {
      return acelerometroDatos;
    }
    var M = N/2;
    var even = [];
    var odd = [];
    even.length = M;
    odd.length = M;
    for (var i = 0; i < M; ++i) {
      even[i] = acelerometroDatos[i*2];
      odd[i] = acelerometroDatos[i*2+1];
    }
    even = this.fft2(even);
    odd = this.fft2(odd);
    var a = -2*Math.PI;
    for (var k = 0; k < M; ++k) {

      var t = Math.exp(Math.complex(0, a*k/N));
      t = Math.multiply(t, odd[k]);
      X[k] = odd[k] = Math.add(even[k], t);
      X[k+M] = even[k] = Math.subtract(even[k], t);
    }
    return acelerometroDatos;
  }
 
  linspace(A,B,S) {
    var Y = new Array(0);
    var D = (B-A)/(S-1);
    for (var i = A; i <= B; i+=D) {
      Y.push(i);
    }
    return Y;
  }
  // perhaps not necessary, but just preventing errors with mixing reals and
  // complex numbers
  make_complex(acelerometroDatos) {
    for (var i = 0; i < acelerometroDatos.length; i++) {
      acelerometroDatos[i] = Math.complex(acelerometroDatos[i],0);
    }
  }
  calc_function(T) {
    var X = [];
    X.length = T.length;
    for (var t = 0; t < T.length; t++) {
      X[t] = Math.sin(2*Math.PI*T[t]);
    }
    return X;
  }
  conversion(){
  var T=this.linspace(0,1,8);
  var X=this.calc_function(T);
  this.make_complex(X);
  var Y=this.fft2(X);
  // get only real part, should have a Dirac spike at sine freq
  var Yr=[];
  Yr.length = Y.length;
  for (var i = 0; i < Y.length; i++) {
    Yr[i] = Y[i].re;
  }
  console.log(Yr);
  }
  */
}
