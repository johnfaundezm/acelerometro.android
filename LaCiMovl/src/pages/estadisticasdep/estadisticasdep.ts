// se importan los plugins que se ejecutarán en esta vista
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { WebservicesProvider } from '../../providers/webservices/webservices';
//import * as math from 'mathjs'; // don't named as Math, this will conflict with Math in JS
//declare const math: any;
//import {complex,exp,pi, multiply, sin, add, subtract} from 'mathjs';
import { Complex } from 'complex-js';
@IonicPage()
@Component({
  selector: 'page-estadisticasdep',
  templateUrl: 'estadisticasdep.html',
})
export class EstadisticasdepPage {

  //DECLARACION DE VARIABLES
  @ViewChild('aceleracionchart') aceleracionchart;
  @ViewChild('aceleracionxyzchart') aceleracionxyzchart;
  @ViewChild('giroscopiochart') giroscopiochart;
  @ViewChild('aceleragiroschart') aceleragiroschart;
  
  correo:any;
  entrenador: Array<{ide:string, email:string}>=[{ide:'', email:''}]; //arreglo que almacena los enlaces entre deportista y entrenador
  entrenamiento: Array<{ide:string, nombre_ent:string}>=[{ide:'', nombre_ent:''}]; //arreglo que almacena los entrenamientos con cierto entrenador

  aceleracionchartvar: any;
  aceleracionxyzchartvar: any;
  giroscopiochartvar: any;
  aceleragiroschartvar: any;

  val_ent: any;
  val_entre: any;
  tipo_entrenamiento:any;

  //arreglos que almacenan los datos para le gráfico
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

  //Constructor, donde se declaran todos los plugins
  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider) {
    //se reciben las variables de la vista anterior y se almacenan en una variable dentro de la vista
    this.correo = navParams.get('correo');
    this.val_entre = navParams.get('id_entrenamiento');
    this.val_ent = navParams.get('id_solicitud');
  }

  ionViewDidLoad(){ // evento que se realiza al cargar la vista
    this.consultar_acc(); // se llama al método que consulta los datos del acelerometro
  }

  ionViewDidEnter() {
    setTimeout(() => { // funcion que muestra los graficos antes de enviarle los datos a graficar
      this.acelerachart();
      this.aceleraxyzchart();
      this.giroschart();
      this.acelgiroschart();
    }, 150)
    // whiles que borran un espacio vacío de un arreglo
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
    // whiles que borran un espacio vacío de un arreglo
    while(this.entrenador.length>0){
      this.entrenador.pop();
    }
    while(this.entrenamiento.length>0){
      this.entrenamiento.pop();
    }

    this.consulta_enlace(); // se llama al método que consulta los enlaces que tiene el deportista
  }

  datos_entrenamiento(){
    this.webservices.consultar_entrenamiento_por_id(this.val_entre).then(//llama a la funcion del webservices.ts y le envia la id del entrenamiento
      (datos)=>{// recibe los datos de la consulta
        //alert(JSON.stringify(datos));
        this.tipo_entrenamiento = datos[0].NOMBRE;
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  consulta_enlace(){
    let largo=this.entrenador.length;
    for(var i=0;i<largo;i++){
      this.entrenador.pop();
    }
    this.webservices.consulta_enlace_deportista(this.correo).then( // se envian todos los parametros que se ven en el paréntesis
      (datos)=>{// se reciben los datos de respuesta del servidor
        //alert(JSON.stringify(datos));
        let largo=Object.keys(datos).length; // se calcula el largo de el arreglo que llegará del servidor con los datos
        for(var i=0;i<largo;i++){ // se reciben la id, el correo del entrenador y la fecha de la solicitud
          var ide= datos[i].ID;
          var email= datos[i].ENTRENADOR;
          this.entrenador.push({"ide":ide,"email":email}); // se almacenan en un arreglo
        }
      },
      (err)=>{
        alert(JSON.stringify(err)) // si ocurre un error de comunicacion con el servidor, se envia este mensaje
      })
  }

  consultar_acc(){
    // se vacian todos los arreglos
    this.datos_acelerometroX=[];
    this.datos_acelerometroY=[];
    this.datos_acelerometroZ=[];
    this.datos_acelerometro=[];
    this.datos_acelerometroF=[];
    this.datos_acelerometroP=[];
    
    this.webservices.consulta_acelerometro_datos(this.val_entre).then( // se envian todos los parametros que se ven en el paréntesis
      (datos) =>{// se reciben los datos de respuesta del servidor
        let largo=Object.keys(datos).length; // se calcula el largo de el arreglo que llegará del servidor con los datos
        //var division=largo/1;
        var frec;
        if(this.tipo_entrenamiento=='saltar' || this.tipo_entrenamiento=='golpear' || this.tipo_entrenamiento=='carrera_corta'){
          frec=0.1;
        }else{
          if(this.tipo_entrenamiento=='carrera_larga'){
            frec=1;
          }else{
            if(this.tipo_entrenamiento=='caminar'){
              frec=0.5;
            }
          }
        }
        var x=0;
        for(var i=0;i<largo;i++){
          x+=frec;
          var yX = datos[i].ACELERACIONX; // se almacena el dato en una variable
          var yY = datos[i].ACELERACIONY; // se almacena el dato en una variable
          var yZ = datos[i].ACELERACIONZ; // se almacena el dato en una variable
          var y = datos[i].ACELERACION; // se almacena el dato en una variable
          var yF =datos[i].FUERZA; // se almacena el dato en una variable
          var yP =datos[i].POTENCIA; // se almacena el dato en una variable
          // SE DA EL FORMATO PARA SER INGRESADO AL GRÁFICO (chart)
          var auxX = {x: x, y: yX};
          var auxY = {x: x, y: yY};
          var auxZ = {x: x, y: yZ};
          var aux = {x: x, y: y};
          var auxF = {x: x, y: yF};
          var auxP = {x: x, y: yP};
          // se almacenan los valores en los arreglos
          this.datos_acelerometroX.push(auxX);
          this.datos_acelerometroY.push(auxY);
          this.datos_acelerometroZ.push(auxZ);
          this.datos_acelerometro.push(aux);
          this.datos_acelerometroF.push(auxF);
          this.datos_acelerometroP.push(auxP);
        }
        this.consultar_gir();// método que consulta los datos del giroscopio
        //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        alert('error'+JSON.stringify(error)); // si ocurre un error de comunicacion con el servidor, se envia este mensaje
      }
    )
  }

  //transladar consulta a vista correspondiente
  consultar_gir(){
    // se vacian todos los arreglos
    this.datos_giroscopioX=[];
    this.datos_giroscopioY=[];
    this.datos_giroscopioZ=[];
    this.datos_giroscopio=[];

    this.webservices.consulta_giroscopio_datos(this.val_entre).then( // se envian todos los parametros que se ven en el paréntesis
      (datos) =>{// se reciben los datos de respuesta del servidor
        let largo=Object.keys(datos).length; // se calcula el largo de el arreglo que llegará del servidor con los datos
        var frec;
        if(this.tipo_entrenamiento=='saltar' || this.tipo_entrenamiento=='golpear' || this.tipo_entrenamiento=='carrera_corta'){
          frec=0.1;
        }else{
          if(this.tipo_entrenamiento=='carrera_larga'){
            frec=1;
          }else{
            if(this.tipo_entrenamiento=='caminar'){
              frec=0.5;
            }
          }
        }
        var x=0;
        for(var i=0;i<largo;i++){
          x+=frec;
          var varX = datos[i].ORIENTACIONX; // se almacena el dato en una variable
          var varY = datos[i].ORIENTACIONY; // se almacena el dato en una variable
          var varZ = datos[i].ORIENTACIONZ; // se almacena el dato en una variable
          var gir = datos[i].ORIENTACION; // se almacena el dato en una variable
          // SE DA EL FORMATO PARA SER INGRESADO AL GRÁFICO (chart)
          var auxX = {x: x, y: varX};
          var auxY = {x: x, y: varY};
          var auxZ = {x: x, y: varZ};
          var aux = {x: x, y: gir};
          // se almacenan los valores en los arreglos
          this.datos_giroscopioX.push(auxX);
          this.datos_giroscopioY.push(auxY);
          this.datos_giroscopioZ.push(auxZ);
          this.datos_giroscopio.push(aux);          
        }
        this.reload_chart(); // se llama al método que vuelve a cargar el gráfico
        //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        alert('error'+JSON.stringify(error)); // si ocurre un error de comunicacion con el servidor, se envia este mensaje
      }
    )
  }
  //funcion que llama al grafico de aceleraciones por eje
  acelerachart(){
    this.aceleracionchartvar = new Chart(this.aceleracionchart.nativeElement, {
      type: 'scatter',//tipo de grafico
      data: {
        datasets: [{
          label: 'Acel x',//etiqueta del conjunto de puntos de la aceleracion en el eje x
          data: this.datos_acelerometroX, // se reciben los datos del arreglo en data

          showLine: true,//true para mostrar la linea
          borderWidth: 2,//grosor de la linea
          borderColor: 'rgba(214, 225, 9, 1)',//color de la linea
          fill: false,//false para no mostrar area bajo la curva
          backgroundColor: 'rgba(214, 225, 9, 1)',//color de fondo para la leyenda
          pointBorderColor: 'rgba(75,192,192,1)',//color del borde del punto
          pointBorderWidth: 1,//tamaño del borde del punto     
          pointRadius: 0,//tamaño del borde
          pointHitRadius: 20,//radio donde responde a un tap en pantalla para mostrar la información
        },
        {
          label: 'Acel Y',//etiqueta del conjunto de puntos de la aceleracion en el eje y
          data: this.datos_acelerometroY, // se reciben los datos del arreglo en data
          showLine: true,//true para mostrar la linea
          borderWidth: 2,//grosor de la linea
          borderColor: 'rgba(24, 24, 185, 1)',//color de la linea
          fill: false,//false para no mostrar area bajo la curva
          backgroundColor: 'rgba(24, 24, 185, 1)',//color del fondo de la leyenda
          pointBorderColor: 'rgba(75,192,192,1)',//color del borde del punto
          pointBorderWidth: 1,//tamaño del borde del punto
          pointRadius: 0,//tamaño del punto
          pointHitRadius: 20,//radio donde responde a un tap en pantalla para mostrar la información
        },
        {
          label: 'Acel Z',//etiqueta del conjunto de puntos de la aceleracion en el eje y
          data: this.datos_acelerometroZ, // se reciben los datos del arreglo en data
          showLine: true,//true para mostrar la linea del grafico
          borderWidth: 2,//tamaño de la linea
          borderColor: 'rgba(185, 24, 24, 1)',//color de la linea
          fill: false,//false para no mostrar area bajo la curva
          backgroundColor: 'rgba(185, 24, 24, 1)',//color de la leyenda
          pointBorderColor: 'rgba(75,192,192,1)',//color del borde del punto
          pointBorderWidth: 1,//tamaño del borde del punto     
          pointRadius: 0,//tamaño del punto
          pointHitRadius: 20,//radio donde responde a un tap en pantalla para mostrar la información
        }
        ]
      },

      options: {
        legend: {//opciones de la leyenda
          position: 'left',//leyenda posicionada a la izquierda
          labels:{//etiqueta
            boxWidth: 15//tamaño de la leyenda
          },
          display: true//true para mostrar la leyenda
        },
        tooltips: {//herramientas
          enabled: true,
          /*callbacks: {
              funcioón para solo mostrar el valor del eje y
              label: function(tooltipItem, data) {
              return tooltipItem.yLabel;
            }
          }*/
        },
        scales: {//escalas
          xAxes: [{
            display: true,//para no mostrar la escala en el eje x
            type: 'linear',
            position: 'bottom'//posición abajo
          }],
          yAxes: [{
            scaleLabel: {
              display: true,//mostrar etiqueta en el eje y
              labelString:"m/s^2"//texto de la etiqueta
            }
          }]
        }
      }
    })
  }
  //funcion que llama al grafico de la fuerza y potencia
  aceleraxyzchart(){
    this.aceleracionxyzchartvar = new Chart(this.aceleracionxyzchart.nativeElement, {
      type: 'scatter',//tipo de grafico
      data: {
        datasets: [{
          label: 'Fuerza',//etiqueta del conjunto de puntos para la fuerza resultante
          data: this.datos_acelerometroF, // se reciben los datos del arreglo en data
          showLine: true,//true para mostrar la linea
          borderWidth: 2,//grosor de la linea
          borderColor: 'rgba(4, 106, 118, 1)',//color de la linea
          fill: false,//false para no mostrar el area bajo la curva
          backgroundColor: 'rgba(4, 106, 118, 1)',//colro de la leyenda
          pointBorderColor: 'rgba(75,192,192,1)',//color del borde del punto
          pointBorderWidth: 1,//tamaño del borde del punto
          pointRadius: 0,//tamaño del punto
          pointHitRadius: 20,//radio donde responde a un tap en pantalla para mostrar la información
        },
        {
          label: 'Potencia',//etiqueta del conjunto de puntos para le potencia resultante
          data: this.datos_acelerometroP, // se reciben los datos del arreglo en data
          showLine: true,//true para mostrar la linea
          borderWidth: 2,//grosor de la linea
          borderColor: 'rgba(109, 2, 86, 1)',//color de la linea
          fill: false,//false para no mostrar el area bajo la curva
          backgroundColor: 'rgba(109, 2, 86, 1)',//colro de la leyenda
          pointBorderColor: 'rgba(75,192,192,1)',//color del borde del punto
          pointBorderWidth: 1,//tamaño del borde del punto
          pointRadius: 0,//tamaño del punto
          pointHitRadius: 20,//radio donde responde a un tap en pantalla para mostrar la información
        }
        ]
      },

      options: {
        legend: {//opciones de la leyenda
          position: 'left',//leyenda posicionada a la izquierda
          labels:{//etiqueta
            boxWidth: 15//tamaño de la leyenda
          },
          display: true//true para mostrar la leyenda
        },
        tooltips: {//herramientas
          enabled: true,
         /* callbacks: {
            //funcioón para solo mostrar el valor del eje y
            label: function(tooltipItem, data) {
                return tooltipItem.yLabel;
            }
          }*/
        },
        scales: {//escalas
          xAxes: [{
            display: true,//para no mostrar la escala en el eje x
            type: 'linear',
            position: 'bottom'//posición abajo
          }],
          yAxes: [{
            scaleLabel: {
              display: true//mostrar etiqueta en el eje y
            }
          }]
        }
      }
    })
  }
  //funcion que llama al grafico de giroscopio por eje
  giroschart(){
    this.giroscopiochartvar = new Chart(this.giroscopiochart.nativeElement, {
      type: 'scatter',//tipo de grafico
      data: {
        datasets: [{
          label: 'Eje x',//etiqueta del conjunto de puntos del giroscopio en el eje x
          data: this.datos_giroscopioX, // se reciben los datos del arreglo en data

          showLine: true,//true para mostrar la linea
          borderWidth: 2,//grosor de la linea
          borderColor: 'rgba(28, 210, 8, 1)',//color de la linea
          fill: false,//false para no mostrar area bajo la curva
          backgroundColor: 'rgba(28, 210, 8, 1)',//color de fondo para la leyenda
          pointBorderColor: 'rgba(75,192,192,1)',//color del borde del punto
          pointBorderWidth: 1,//tamaño del borde del punto
          pointRadius: 0,//tamaño del borde
          pointHitRadius: 20,//radio donde responde a un tap en pantalla para mostrar la información
        },
        {
          label: 'Eje Y',//etiqueta del conjunto de puntos delgiroscopio en el eje y
          data: this.datos_giroscopioY, // se reciben los datos del arreglo en data
          showLine: true,//true para mostrar la linea
          borderWidth: 2,//grosor de la linea
          borderColor: 'rgba(28, 78, 241, 1)',//color de la linea
          fill: false,//false para no mostrar area bajo la curva
          backgroundColor: 'rgba(28, 78, 241, 1)',//color de fondo para la leyenda
          pointBorderColor: 'rgba(75,192,192,1)',//color del borde del punto
          pointBorderWidth: 1,//tamaño del borde del punto
          pointRadius: 0,//tamaño del borde
          pointHitRadius: 20,//radio donde responde a un tap en pantalla para mostrar la información
        },
        {
          label: 'Eje Z',//etiqueta del conjunto de puntos del giroscopio en el eje z
          data: this.datos_giroscopioZ, // se reciben los datos del arreglo en data
          showLine: true,//true para mostrar la linea
          borderWidth: 2,//grosor de la linea
          borderColor: 'rgba(151, 36, 148, 1)',//color de la linea
          fill: false,//false para no mostrar area bajo la curva
          backgroundColor: 'rgba(151, 36, 148, 1)',//color de fondo para la leyenda
          pointBorderColor: 'rgba(75,192,192,1)',//color del borde del punto
          pointBorderWidth: 1,//tamaño del borde del punto     
          pointRadius: 0,//tamaño del borde
          pointHitRadius: 20,//radio donde responde a un tap en pantalla para mostrar la información
        }
        ]
      },

      options: {
        legend: {//opciones de la leyenda
          position: 'left',//leyenda posicionada a la izquierda
          labels:{//etiqueta
            boxWidth: 15//tamaño de la leyenda
          },
          display: true//true para mostrar la leyenda
        },
        tooltips: {//herramientas
          enabled: true,
         /* callbacks: {
            //funcioón para solo mostrar el valor del eje y
            label: function(tooltipItem, data) {
                return tooltipItem.yLabel;
            }
          }*/
        },
        scales: {//escalas
          xAxes: [{
            display: true,//para no mostrar la escala en el eje x
            type: 'linear',
            position: 'bottom'//posición abajo
          }],
          yAxes: [{
            scaleLabel: {
              display: false,//mostrar etiqueta en el eje y
              labelString:""//texto de la etiqueta
            }
          }]
        }
      }
    })
  }
//funcion que llama al grafico de aceleraciones y giroscopio resultante
  acelgiroschart(){
    this.aceleragiroschartvar = new Chart(this.aceleragiroschart.nativeElement, {
      type: 'scatter',//tipo de grafico
      data: {
        datasets: [{
          label: 'Aceleración',//etiqueta del conjunto de puntos de la aceleracion resultante
          data: this.datos_acelerometro, // se reciben los datos del arreglo en data

          showLine: true,//true para mostrar la linea
          borderWidth: 2,//grosor de la linea
          borderColor: 'rgba(28, 210, 8, 1)',//color de la linea
          fill: false,//false para no mostrar area bajo la curva
          backgroundColor: 'rgba(28, 210, 8, 1)',//color de fondo para la leyenda
          pointBorderColor: 'rgba(75,192,192,1)',//color del borde del punto
          pointBorderWidth: 1,//tamaño del borde del punto     
          pointRadius: 0,//tamaño del borde
          pointHitRadius: 20,//radio donde responde a un tap en pantalla para mostrar la información
        },
        {
          label: 'Giroscopio',//etiqueta del conjunto de puntos del giroscopio resultante
          data: this.datos_giroscopio, // se reciben los datos del arreglo en data
          showLine: true,//true para mostrar la linea
          borderWidth: 2,//grosor de la linea
          borderColor: 'rgba(28, 78, 241, 1)',//color de la linea
          fill: false,//false para no mostrar area bajo la curva
          backgroundColor: 'rgba(28, 78, 241, 1)',//color de fondo para la leyenda
          pointBorderColor: 'rgba(75,192,192,1)',//color del borde del punto
          pointBorderWidth: 1,//tamaño del borde del punto 
          pointRadius: 0,//tamaño del borde
          pointHitRadius: 20,//radio donde responde a un tap en pantalla para mostrar la información
        }
        ]
      },

      options: {
        legend: {//opciones de la leyenda
          position: 'left',//leyenda posicionada a la izquierda
          labels:{//etiqueta
            boxWidth: 15//tamaño de la leyenda
          },
          display: true//true para mostrar la leyenda
        },
        tooltips: {//herramientas
          enabled: true,
          /*
          //funcioón para solo mostrar el valor del eje y
          callbacks: {
            label: function(tooltipItem, data) {
                return tooltipItem.yLabel;
            }
          }
          */
        },
        scales: {//escalas
          xAxes: [{
            display: true,//para no mostrar la escala en el eje x
            type: 'linear',
            position: 'bottom'//posición abajo
          }],
          yAxes: [{
            scaleLabel: {
              display: false,//mostrar etiqueta en el eje y
              labelString:""//texto de la etiqueta
            }
          }]
        }
      }
    })
  }

  nombre_entrenamiento(){
    this.entrenamiento= [];
    this.webservices.nombre_entrenamiento(this.val_ent).then( // se envian todos los parametros que se ven en el paréntesis
      (datos)=>{ // se reciben los datos de respuesta del servidor
        //alert(JSON.stringify(datos));
        let largo=Object.keys(datos).length; // se calcula el largo de el arreglo que llegará del servidor con los datos
        for(var i=0;i<largo;i++){ // se reciben la id, el correo del entrenador y la fecha de la solicitud
          var ide= datos[i].ID; // se almacenan los datos en una variable
          var nombre_ent= datos[i].NOMBRE; // se almacenan los datos en una variable
          this.entrenamiento.push({"ide":ide,"nombre_ent":nombre_ent}); // se envian al arreglo
        }
      },
      (err)=>{
        alert(JSON.stringify(err)) // si ocurre un error de comunicacion con el servidor, se envia este mensaje
      })
  }

  //método que trae los datos de todos los entrenamientos ligados a cierta solicitud
  escoger_solicitud() {
    this.nombre_entrenamiento();
  }

  //método que llama a la funcion para traer los datos del acelerometro y giroscopio para graficarlos
  escoger_entrenamiento(){
    this.consultar_acc();
  }

  //método que destruye el gráfico y realiza uno nuevo
  reload_chart(){
    this.aceleragiroschartvar.destroy();// destruye el gráfico
      this.aceleracionchartvar.destroy();// destruye el gráfico
      this.aceleracionxyzchartvar.destroy();// destruye el gráfico
      this.giroscopiochartvar.destroy();// destruye el gráfico
      this.acelgiroschart(); //crea el gráfico nuevamente con los datos nuevos
      this.giroschart(); //crea el gráfico nuevamente con los datos nuevos
      this.aceleraxyzchart(); //crea el gráfico nuevamente con los datos nuevos
      this.acelerachart(); //crea el gráfico nuevamente con los datos nuevos
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
    for (var k=0; k < M;k++){//se ejecuta el bucle para ambas mitades del arreglo
      let b= k/N;
      let t=a*b;
      var m=Complex(0,t);
      m=Math.exp(m);
      m=m*odd[k];
      X[k]=odd[k]=even[k]+m;
      X[k+M]=even[k]=even[k]-m;
    }
    alert(X);
    return X;  // se retornan los valores finales de fourier
  }
  linspace(A,B,S){// generar espacio lineal de A a B con intervalos S
    var Y = new Array(0);
    var D = (B-A)/(S-1);
    for (var i = A;i <=B;i +=D){
      Y.push(i);
    }
    return Y;
  }
  
  //previene errores al mezclar reales y números complejos
  make_complex(X){
    for (var i =0; i< X.length;i++){
      var m =Complex(X[i],0);
      X[i] = m;
      alert('complex'+X);
      this.arreglo[i] =X[i];
    }
  }
  //
  calc_function(T){
    var X =[];// crea un arreglo X
    X.length = T.length;  // le asigna el un largo igual a la cantidad de datos de acelerometro del entrenamiento
    //alert('largo T= '+T.length);
    for (var t =0;t<T.length; t++){
      X[t] = this.datos_acelerometro[t]*(Math.sin(2*Math.PI*T[t]));//calcula la funcion para la cantidad de datos del entrenamiento
    }
    return X; //retorna el arreglo con los valores recalculados.
  }
  
  fourier(){
    var T=this.linspace(0,1,this.datos_acelerometro.length);
    var X= this.calc_function(T);
    alert(X);//muestra los valores almacenados en X

    //this.make_complex(X);// se ejecuta el metodo make_complex para X
    //X=this.arreglo;// se le asignan a X los valores resultantes de la funcion make_complex
    
    var Y=this.fft2(X);// Se retornan los valores de fourier a el arreglo Y
    var Yr=[];// se crea el arreglo Yr
    Yr.length = Y.length; // se crea le asigna el largo a Yr igual a la cantidad de datos recibidos.

    for (var i = 0;i< Y.length; i++){
      Yr[i] = Y[i].re; // se almacenan solo los datos reales
    }
    console.log(Yr);      
  }
}
