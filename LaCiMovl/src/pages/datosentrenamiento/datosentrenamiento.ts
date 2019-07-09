// se importan los plugins que se ejecutarán en esta vista
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { Chart } from 'chart.js';
import { DeportistasentPage } from '../deportistasent/deportistasent';


@IonicPage()
@Component({
  selector: 'page-datosentrenamiento',
  templateUrl: 'datosentrenamiento.html',
})
export class DatosentrenamientoPage {

  //DECLARACION DE VARIABLES
  @ViewChild('aceleracionchart') aceleracionchart;
  @ViewChild('aceleracionxyzchart') aceleracionxyzchart;
  @ViewChild('giroscopiochart') giroscopiochart;
  @ViewChild('aceleragiroschart') aceleragiroschart;

  val_entre: any;
  entrenamiento: Array<{ide:string, nombre_ent:string}>=[{ide:'', nombre_ent:''}];
  id_entrenamiento:any;
  correo:any;
  id_solicitud:any;

  tabBarElement: any; //variable que almacena el elemento tabbar

  aceleracionchartvar: any;
  aceleracionxyzchartvar: any;
  giroscopiochartvar: any;
  aceleragiroschartvar: any;

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

  email_dep:any;

  //Constructor, donde se declaran todos los plugins
  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider)  {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar'); //se pasa el elemento tabbar a la variable antes declarada
    //se reciben las variables de la vista anterior y se almacenan en una variable dentro de la vista
    this.email_dep = navParams.get('email_dep');
    this.val_entre = navParams.get('id_entrenamiento');
    this.correo = navParams.get('correo');
    this.id_solicitud = navParams.get('id_solicitud');
  }

  ionViewDidLoad() { // evento que se realiza al cargar la vista
    console.log('ionViewDidLoad DatosentrenamientoPage');
      this.consultar_acc(); // se llama al método que consulta los datos del acelerometro
  }

  
  ionViewWillEnter() {// evento que se realiza antes de cargar la vista
    this.nombre_entrenamiento();
    this.tabBarElement.style.display = 'none';//antes de entrar a la vista se oculta el tabbar
  }
  
  ionViewWillLeave() {// evento que se realiza al salir de la vista
    this.tabBarElement.style.display = 'flex';//cuando va a salir de la vista se le agrega el tabbar nuevamente
  }

  ionViewDidEnter() {// evento que se realiza al cargar la vista
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

  datos_deportista(){
    this.webservices.consulta(this.email_dep).then( // se envia el correo a consultar
      (datos)=>{ //se reciben los datos como respuesta
        //alert(JSON.stringify(datos));
        
          this.nombre_dep= datos[0].NOMBRE; // se almacena el dato en una variable
          this.apellido_p_dep= datos[0].APELLIDO_P; // se almacena el dato en una variable
          this.apellido_m_dep= datos[0].APELLIDO_M; // se almacena el dato en una variable
          this.genero_dep= datos[0].GENERO; // se almacena el dato en una variable
          this.edad_dep= datos[0].EDAD; // se almacena el dato en una variable
          this.peso_dep= datos[0].PESO; // se almacena el dato en una variable
          this.estatura_dep= datos[0].ESTATURA; // se almacena el dato en una variable
          this.imc_dep= datos[0].IMC; // se almacena el dato en una variable
          this.pais_dep= datos[0].PAIS; // se almacena el dato en una variable
      },
      (err)=>{
        alert(JSON.stringify(err)) // si ocurre un error de comunicacion se tira este error
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

   
   
    this.webservices.consulta_acelerometro_datos(this.val_entre).then(// se envian todos los parametros que se ven en el paréntesis
      (datos) =>{// se reciben los datos de respuesta del servidor
        let largo:any=Object.keys(datos).length; // se calcula el largo de el arreglo que llegará del servidor con los datos
        //var division=largo/1;
        var x=0;
        for(var i=0;i<largo;i++){
          x+=0.1;
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
          if((largo-1)==i){
            this.consultar_gir();// método que consulta los datos del giroscopio
          }
        }
        
        
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
        var x=0;
        for(var i=0;i<largo;i++){
          x+=0.1;
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
          callbacks: {
             //funcioón para solo mostrar el valor del eje y
            label: function(tooltipItem, data) {
                return tooltipItem.yLabel;
            }
          }
        },
        scales: {//escalas
          xAxes: [{
            display: false,//para no mostrar la escala en el eje x
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
          callbacks: {
            //funcioón para solo mostrar el valor del eje y
            label: function(tooltipItem, data) {
                return tooltipItem.yLabel;
            }
          }
        },
        scales: {//escalas
          xAxes: [{
            display: false,//para no mostrar la escala en el eje x
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
          pointBorderWidth: 1, //tamaño del borde del punto    
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
          callbacks: {
            //funcioón para solo mostrar el valor del eje y
            label: function(tooltipItem, data) {
                return tooltipItem.yLabel;
            }
          }
        },
        scales: {//escalas
          xAxes: [{
            display: false,//para no mostrar la escala en el eje x
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
          pointBorderWidth: 1, //tamaño del borde del punto    
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
          callbacks: {
            //funcioón para solo mostrar el valor del eje y
            label: function(tooltipItem, data) {
                return tooltipItem.yLabel;
            }
          }
        },
        scales: {//escalas
          xAxes: [{
            display: false,//para no mostrar la escala en el eje x
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

  //método que vuelve hacia la vista de los enlaces con los deportistas
  volver(){
    this.navCtrl.setRoot(DeportistasentPage,{correo:this.correo});
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

  nombre_entrenamiento(){
    this.entrenamiento = [];
    this.webservices.nombre_entrenamiento(this.id_solicitud).then( // se envian todos los parametros que se ven en el paréntesis
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

  //método que llama a la funcion para traer los datos del acelerometro y giroscopio para graficarlos
  escoger_entrenamiento(){
    this.consultar_acc();
  }

}
