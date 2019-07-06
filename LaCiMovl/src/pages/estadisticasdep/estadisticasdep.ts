import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { WebservicesProvider } from '../../providers/webservices/webservices';
//import * as math from 'mathjs'; // don't named as Math, this will conflict with Math in JS
//declare const math: any;
import {complex,exp,pi, multiply, sin, add, subtract} from 'mathjs';
import { Complex } from 'complex-js';

@IonicPage()
@Component({
  selector: 'page-estadisticasdep',
  templateUrl: 'estadisticasdep.html',
})
export class EstadisticasdepPage {

  @ViewChild('aceleracionchart') aceleracionchart;
  @ViewChild('aceleracionxyzchart') aceleracionxyzchart;
  @ViewChild('giroscopiochart') giroscopiochart;
  @ViewChild('aceleragiroschart') aceleragiroschart;
  
  correo:any;
  entrenador: Array<{ide:string, email:string}>=[{ide:'', email:''}]; //arreglo que almacena los enlaces entre deportista y entrenador
  entrenamiento: Array<{ide:string, nombre_ent:string}>=[{ide:'', nombre_ent:''}];

  aceleracionchartvar: any;
  aceleracionxyzchartvar: any;
  giroscopiochartvar: any;
  aceleragiroschartvar: any;

  val_ent: any;
  val_entre: any;

  datos_acelerometroX = [];
  datos_acelerometroY = [];
  datos_acelerometroZ = [];
  datos_acelerometro = [];
  datos_acelerometroF = [];
  datos_acelerometroP = [];

  datos_giroscopioX = [];
  datos_giroscopioY = [];
  datos_giroscopioZ = [];
  datos_giroscopio = [];
  arreglo=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider) {
    this.correo = navParams.get('correo');
    this.val_entre = navParams.get('id_entrenamiento');
    this.val_ent = navParams.get('id_solicitud');
  }

  ionViewDidLoad(){
    this.consultar_acc()
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.acelerachart();
      this.aceleraxyzchart();
      this.giroschart();
      this.acelgiroschart();
    }, 150)

    while(this.datos_acelerometroX.length>0){
      this.datos_acelerometroX.pop();
    }
    while(this.datos_acelerometroY.length>0){
      this.datos_acelerometroY.pop();
    }
    while(this.datos_acelerometroZ.length>0){
      this.datos_acelerometroZ.pop();
    }
    while(this.datos_acelerometro.length>0){
      this.datos_acelerometro.pop();
    }
    while(this.datos_acelerometroF.length>0){
      this.datos_acelerometroF.pop();
    }
    while(this.datos_acelerometroP.length>0){
      this.datos_acelerometroP.pop();
    }

    while(this.datos_giroscopioX.length>0){
      this.datos_giroscopioX.pop();
    }
    while(this.datos_giroscopioY.length>0){
      this.datos_giroscopioY.pop();
    }
    while(this.datos_giroscopioZ.length>0){
      this.datos_giroscopioZ.pop();
    }
    while(this.datos_giroscopio.length>0){
      this.datos_giroscopio.pop();
    }
  }

  ionViewWillEnter(){
    while(this.entrenador.length>0){
      this.entrenador.pop();
    }
    while(this.entrenamiento.length>0){
      this.entrenamiento.pop();
    }

    this.consulta_enlace();
  }

  consulta_enlace(){
    let largo=this.entrenador.length;
    for(var i=0;i<largo;i++){
      this.entrenador.pop();
    }
    this.webservices.consulta_enlace_deportista(this.correo).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        let largo=Object.keys(datos).length;
        for(var i=0;i<largo;i++){ // se reciben la id, el correo del entrenador y la fecha de la solicitud
          var ide= datos[i].ID;
          var email= datos[i].ENTRENADOR;
          this.entrenador.push({"ide":ide,"email":email});
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  consultar_acc(){
    
    this.datos_acelerometroX=[];
    this.datos_acelerometroY=[];
    this.datos_acelerometroZ=[];
    this.datos_acelerometro=[];
    this.datos_acelerometroF=[];
    this.datos_acelerometroP=[];
    
    this.webservices.consulta_acelerometro_datos(this.val_entre).then(
      (datos) =>{
        let largo=Object.keys(datos).length;
        //var division=largo/1;
        var x=0;
        for(var i=0;i<largo;i++){
          x+=0.1;
          var yX = datos[i].ACELERACIONX;
          var yY = datos[i].ACELERACIONY;
          var yZ = datos[i].ACELERACIONZ;
          var y = datos[i].ACELERACION;
          var yF =datos[i].FUERZA;
          var yP =datos[i].POTENCIA;
          var auxX = {x: x, y: yX};
          var auxY = {x: x, y: yY};
          var auxZ = {x: x, y: yZ};
          var aux = {x: x, y: y};
          var auxF = {x: x, y: yF};
          var auxP = {x: x, y: yP};
          this.datos_acelerometroX.push(auxX);
          this.datos_acelerometroY.push(auxY);
          this.datos_acelerometroZ.push(auxZ);
          this.datos_acelerometro.push(aux);
          this.datos_acelerometroF.push(auxF);
          this.datos_acelerometroP.push(auxP);
        }
        this.consultar_gir();
        //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        alert('error'+JSON.stringify(error));
      }
    )
  }

  //transladar consulta a vista correspondiente
  consultar_gir(){
    
    this.datos_giroscopioX=[];
    this.datos_giroscopioY=[];
    this.datos_giroscopioZ=[];
    this.datos_giroscopio=[];

    this.webservices.consulta_giroscopio_datos(this.val_entre).then(
      (datos) =>{
        let largo=Object.keys(datos).length;
        var x=0;
        for(var i=0;i<largo;i++){
          x+=0.1;
          var varX = datos[i].ORIENTACIONX;
          var varY = datos[i].ORIENTACIONY;
          var varZ = datos[i].ORIENTACIONZ;
          var gir = datos[i].ORIENTACION;

          var auxX = {x: x, y: varX};
          var auxY = {x: x, y: varY};
          var auxZ = {x: x, y: varZ};
          var aux = {x: x, y: gir};
          this.datos_giroscopioX.push(auxX);
          this.datos_giroscopioY.push(auxY);
          this.datos_giroscopioZ.push(auxZ);
          this.datos_giroscopio.push(aux);          
        }
        this.reload_chart();
        //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        alert('error'+JSON.stringify(error));
      }
    )
  }

  acelerachart(){
    this.aceleracionchartvar = new Chart(this.aceleracionchart.nativeElement, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Acel x',
          data: this.datos_acelerometroX,

          showLine: true,
          borderWidth: 2,
          borderColor: 'rgba(214, 225, 9, 1)',
          fill: false,
                        backgroundColor: 'rgba(214, 225, 9, 1)',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBorderWidth: 1,     
                        pointRadius: 0,
                        pointHitRadius: 10,
        },
        {
          label: 'Acel Y',
          data: this.datos_acelerometroY,
          showLine: true,
          borderWidth: 2,
          borderColor: 'rgba(24, 24, 185, 1)',
          fill: false,
                        backgroundColor: 'rgba(24, 24, 185, 1)',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBorderWidth: 1,     
                        pointRadius: 0,
                        pointHitRadius: 10,
        },
        {
          label: 'Acel Z',
          data: this.datos_acelerometroZ,
          showLine: true,
          borderWidth: 2,
          borderColor: 'rgba(185, 24, 24, 1)',
          fill: false,
                        backgroundColor: 'rgba(185, 24, 24, 1)',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBorderWidth: 1,     
                        pointRadius: 0,
                        pointHitRadius: 20,
        }
        ]
      },

      options: {
        legend: {
          position: 'left',
          labels:{
            boxWidth: 15
          },
          display: true
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: function(tooltipItem, data) {
                return tooltipItem.yLabel;
            }
          }
        },
        scales: {
          xAxes: [{
            display: false,
            type: 'linear',
            position: 'bottom'
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString:"m/s^2"
            }
          }]
        }
      }
    })
  }

  aceleraxyzchart(){
    this.aceleracionxyzchartvar = new Chart(this.aceleracionxyzchart.nativeElement, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Fuerza',
          data: this.datos_acelerometroF,
          showLine: true,
          borderWidth: 2,
          borderColor: 'rgba(4, 106, 118, 1)',
          fill: false,
                        backgroundColor: 'rgba(4, 106, 118, 1)',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBorderWidth: 1,     
                        pointRadius: 0,
                        pointHitRadius: 10,
        },
        {
          label: 'Potencia',
          data: this.datos_acelerometroP,
          showLine: true,
          borderWidth: 2,
          borderColor: 'rgba(109, 2, 86, 1)',
          fill: false,
                        backgroundColor: 'rgba(109, 2, 86, 1)',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBorderWidth: 1,     
                        pointRadius: 0,
                        pointHitRadius: 10,
        }
        ]
      },

      options: {
        legend: {
          position: 'left',
          labels:{
            boxWidth: 15
          },
          display: true
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: function(tooltipItem, data) {
                return tooltipItem.yLabel;
            }
          }
        },
        scales: {
          xAxes: [{
            display: false,
            type: 'linear',
            position: 'bottom'
          }],
          yAxes: [{
            scaleLabel: {
              display: true
            }
          }]
        }
      }
    })
  }

  giroschart(){
    this.giroscopiochartvar = new Chart(this.giroscopiochart.nativeElement, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Eje x',
          data: this.datos_giroscopioX,

          showLine: true,
          borderWidth: 2,
          borderColor: 'rgba(28, 210, 8, 1)',
          fill: false,
                        backgroundColor: 'rgba(28, 210, 8, 1)',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBorderWidth: 1,     
                        pointRadius: 0,
                        pointHitRadius: 10,
        },
        {
          label: 'Eje Y',
          data: this.datos_giroscopioY,
          showLine: true,
          borderWidth: 2,
          borderColor: 'rgba(28, 78, 241, 1)',
          fill: false,
                        backgroundColor: 'rgba(28, 78, 241, 1)',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBorderWidth: 1,     
                        pointRadius: 0,
                        pointHitRadius: 10,
        },
        {
          label: 'Eje Z',
          data: this.datos_giroscopioZ,
          showLine: true,
          borderWidth: 2,
          borderColor: 'rgba(151, 36, 148, 1)',
          fill: false,
                        backgroundColor: 'rgba(151, 36, 148, 1)',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBorderWidth: 1,     
                        pointRadius: 0,
                        pointHitRadius: 20,
        }
        ]
      },

      options: {
        legend: {
          position: 'left',
          labels:{
            boxWidth: 15
          },
          display: true
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: function(tooltipItem, data) {
                return tooltipItem.yLabel;
            }
          }
        },
        scales: {
          xAxes: [{
            display: false,
            type: 'linear',
            position: 'bottom'
          }],
          yAxes: [{
            scaleLabel: {
              display: false,
              labelString:""
            }
          }]
        }
      }
    })
  }

  acelgiroschart(){
    this.aceleragiroschartvar = new Chart(this.aceleragiroschart.nativeElement, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Aceleración',
          data: this.datos_acelerometro,

          showLine: true,
          borderWidth: 2,
          borderColor: 'rgba(28, 210, 8, 1)',
          fill: false,
                        backgroundColor: 'rgba(28, 210, 8, 1)',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBorderWidth: 1,     
                        pointRadius: 0,
                        pointHitRadius: 10,
        },
        {
          label: 'Giroscopio',
          data: this.datos_giroscopio,
          showLine: true,
          borderWidth: 2,
          borderColor: 'rgba(28, 78, 241, 1)',
          fill: false,
                        backgroundColor: 'rgba(28, 78, 241, 1)',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBorderWidth: 1,     
                        pointRadius: 0,
                        pointHitRadius: 10,
        }
        ]
      },

      options: {
        legend: {
          position: 'left',
          labels:{
            boxWidth: 15
          },
          display: true
        },
        tooltips: {
          enabled: true,
          /*
          callbacks: {
            label: function(tooltipItem, data) {
                return tooltipItem.yLabel;
            }
          }
          */
        },
        scales: {
          xAxes: [{
            display: false,
            type: 'linear',
            position: 'bottom'
          }],
          yAxes: [{
            scaleLabel: {
              display: false,
              labelString:""
            }
          }]
        }
      }
    })
  }

  nombre_entrenamiento(){
    this.entrenamiento= [];
    this.webservices.nombre_entrenamiento(this.val_ent).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        let largo=Object.keys(datos).length;
        for(var i=0;i<largo;i++){ // se reciben la id, el correo del entrenador y la fecha de la solicitud
          var ide= datos[i].ID;
          var nombre_ent= datos[i].NOMBRE;
          this.entrenamiento.push({"ide":ide,"nombre_ent":nombre_ent});
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  escoger_solicitud() {
    this.nombre_entrenamiento();
  }

  escoger_entrenamiento(){
    this.consultar_acc();
  }

  reload_chart(){
    this.aceleragiroschartvar.destroy();
      this.aceleracionchartvar.destroy();
      this.aceleracionxyzchartvar.destroy();
      this.giroscopiochartvar.destroy();
      this.acelgiroschart();
      this.giroschart();
      this.aceleraxyzchart();
      this.acelerachart();
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
    let a = -2*Math.PI; //asgina el valor -2pi a la variable "a";
    alert(a);
    for (var k=0; k < M;k++){
      let b= k/N;
      let t=a*b;
      var m=t;
      //var m=Complex(0,t);
      m=Math.exp(m);
      m=m*odd[k];
      X[k]=odd[k]=even[k]+m;
      X[k+M]=even[k]=even[k]-m;
    }
    alert(X);
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
      /*var m =Complex(X[i],0);
      X[i] = m;*/
      this.arreglo[i] =X[i];
    }
  }
  calc_function(T){
    var X =[];
    for (var i = 0;i< this.datos_acelerometro.length; i++){
      X[i] = this.datos_acelerometro[i];
    }
   
    X.length = T.length;
    for (var t =0;t<T.length; t++){
      X[t] = Math.sin(2*Math.PI*T[t]);
    }
    return X;
  }
  
  fourier(){
    var T=this.linspace(0,1,this.datos_acelerometro.length);
    var X= this.calc_function(T);
    this.make_complex(X);
    X=this.arreglo;
    var Y=this.fft2(X);
    var Yr=[];
    Yr.length = Y.length;

    for (var i = 0;i< Y.length; i++){
      Yr[i] = Y[i];
      //Yr[i] = Y[i].re;
    }
    alert(Yr);
    console.log(Yr);      
  }
}
