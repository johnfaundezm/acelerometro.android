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

  //Constructor, donde se declaran todos los plugins
  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider)  {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar'); //se pasa el elemento tabbar a la variable antes declarada
    //se reciben las variables de la vista anterior y se almacenan en una variable dentro de la vista
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

  volver(){
    this.navCtrl.setRoot(DeportistasentPage,{correo:this.correo});
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

  nombre_entrenamiento(){
    this.entrenamiento = [];
    this.webservices.nombre_entrenamiento(this.id_solicitud).then(
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

  escoger_entrenamiento(){
    this.consultar_acc();
  }

}
