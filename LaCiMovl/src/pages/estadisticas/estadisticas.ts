import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { WebservicesProvider } from '../../providers/webservices/webservices';

@IonicPage()
@Component({
  selector: 'page-estadisticas',
  templateUrl: 'estadisticas.html',
})
export class EstadisticasPage {

  //DECLARACION DE VARIABLES
  @ViewChild('usuarioschart') usuarioschart;
  @ViewChild('usuariosporsemanachart') usuariosporsemanachart;

  usuarioschartvar: any;
  semanachartvar: any;

  loading:any;

  cant_dep:any;
  cant_ent:any;
  total_usuarios:any;

  //Fecha----------------------------------------
  currentDate;

  sem1;
  cant_sem1:any;
  sem2;
  cant_sem2:any;
  sem3;
  cant_sem3:any;
  sem4;
  cant_sem4:any;

  //Constructor, donde se declaran todos los plugins
  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider, public loadingCtrl: LoadingController) {
  }


  ionViewWillEnter() { // evento que se realiza antes de cargar la vista
    this.cantidad_usuarios(); // llama al método que trae la cantidad de usuarios deportistas y entrenadores
    this.cantidad_users_por_semana(); // método que llama a la función que calcula los usuarios por semana
  }

  doRefresh(refresher) {// método que realiza la actualizacion de los datos al tirar hacia abajo
    this.cantidad_usuarios();
    this.cantidad_users_por_semana();
    refresher.complete();
  } 

  loadconsulta_login() { //loading que se muesta en pantalla al llamar esta función
    this.loading = this.loadingCtrl.create({ // se crea el loading
      spinner: 'ios', //tipo de animación al estar cargando
      content: 'Cargando...', //mensaje que muestra al estar cargando
    });
  
    this.loading.present();
  }

  cantidad_usuarios(){
    this.loadconsulta_login(); // comienza el loading
    this.webservices.vista_deportista().then(
      (datos) =>{// se reciben los datos de respuesta del servidor
        this.cant_dep=Object.keys(datos).length;// se recibe la cantidad de usuarios deportistas
          this.webservices.vista_entrenador().then(
          (datos) =>{// se reciben los datos de respuesta del servidor
            this.cant_ent=Object.keys(datos).length;// se recibe la cantidad de usuarios entrenadores
            this.total_usuarios=this.cant_dep+this.cant_ent; // se suman los deportistas y los entrenadores, para calcular un total
            this.loading.dismiss(); // Se termina el loading
            this.cantidadusuarios(); // se llama al método que graficará los datos de la cantidad de usuarios
          },
          (err)=>{
            this.loading.dismiss(); // Se termina el loading
            alert(JSON.stringify(err)) // si ocurre un error de comunicacion con el servidor, se envia este mensaje
          })
      },
      (err)=>{
        this.loading.dismiss(); // Se termina el loading
        alert(JSON.stringify(err)) // si ocurre un error de comunicacion con el servidor, se envia este mensaje
      })
  }

  cantidadusuarios(){
    this.usuarioschartvar = new Chart(this.usuarioschart.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.cant_dep, this.cant_ent],  // se reciben los datos en data
          backgroundColor: [
            'rgba(11, 169, 3, 1)',
            'rgba(255, 148, 52, 1)'
          ]
        }],
        labels: [
          'Deportistas',
          'Entrenadores'
        ]
      },

      options: {
        legend: {
          display: true
        },
        tooltips: {
          enabled: true
        },
        animation: {
          animateRotate: true
        }
      }
    })
  }

  cantidad_users_por_semana(){
    var dateObj =new Date()// se almacena la fecha actual en una variable (queda almacenado en formato objeto)

    // 1 semana atrás
    dateObj.setDate(dateObj.getDate() - 7); // se le resta 7 días  la fecha actual
    var year = dateObj.getFullYear().toString() // se saca solo el año
    var month = dateObj.getMonth().toString() // se saca solo el mes
    var mes:any = month;
    mes ++; // se suma 1 al mes por que enero lo toma como el mes "0" en vez de ser el "1"
    var date = dateObj.getDate().toString() // se saca solo el día
    this.sem1 = year+'-'+ mes +'-'+ date; // se concatena para dar el formato de fecha deseada

    // 2 semanas atrás
    dateObj.setDate(dateObj.getDate() - 7); // se le resta 7 días más a la fecha actual
    year = dateObj.getFullYear().toString() // se saca solo el año
    month = dateObj.getMonth().toString() // se saca solo el mes
    mes = month;
    mes ++; // se suma 1 al mes por que enero lo toma como el mes "0" en vez de ser el "1"
    date = dateObj.getDate().toString() // se saca solo el día
    this.sem2 = year+'-'+ mes +'-'+ date; // se concatena para dar el formato de fecha deseada

    // 3 semanas atrás
    dateObj.setDate(dateObj.getDate() - 7); // se le resta 7 días más a la fecha actual
    year = dateObj.getFullYear().toString() // se saca solo el año
    month = dateObj.getMonth().toString() // se saca solo el mes
    mes = month;
    mes ++; // se suma 1 al mes por que enero lo toma como el mes "0" en vez de ser el "1"
    date = dateObj.getDate().toString() // se saca solo el día
    this.sem3 = year+'-'+ mes +'-'+ date; // se concatena para dar el formato de fecha deseada

    // 4 semanas atrás
    dateObj.setDate(dateObj.getDate() - 7); // se le resta 7 días más a la fecha actual
    year = dateObj.getFullYear().toString() // se saca solo el año
    month = dateObj.getMonth().toString() // se saca solo el mes
    mes = month;
    mes ++; // se suma 1 al mes por que enero lo toma como el mes "0" en vez de ser el "1"
    date = dateObj.getDate().toString() // se saca solo el día
    this.sem4 = year+'-'+ mes +'-'+ date; // se concatena para dar el formato de fecha deseada

    //consulta de ususarios por semanas
    this.webservices.semanas(this.sem1).then( // se envian todos los parametros que se ven en el paréntesis
      (datos) =>{// se reciben los datos de respuesta del servidor
        this.cant_sem1=Object.keys(datos).length;// se recibe la cantidad de usuarios
          this.webservices.semanas(this.sem2).then( // se envian todos los parametros que se ven en el paréntesis
          (datos) =>{// se reciben los datos de respuesta del servidor
            this.cant_sem2=Object.keys(datos).length;// se recibe la cantidad de usuarios deportistas
            this.webservices.semanas(this.sem3).then( // se envian todos los parametros que se ven en el paréntesis
              (datos) =>{// se reciben los datos de respuesta del servidor
                this.cant_sem3=Object.keys(datos).length;// se recibe la cantidad de usuarios deportistas
                this.webservices.semanas(this.sem4).then( // se envian todos los parametros que se ven en el paréntesis
                  (datos) =>{// se reciben los datos de respuesta del servidor
                    this.cant_sem4=Object.keys(datos).length;// se recibe la cantidad de usuarios deportistas
                    this.loading.dismiss(); // Se termina el loading
                    this.porsemana();// se llama al método que graficará los datos de usuarios por semana
                  },
                  (err)=>{
                    this.loading.dismiss();
                    alert(JSON.stringify(err)) // si ocurre un error de comunicacion con el servidor, se envia este mensaje
                  })
              },
              (err)=>{
                this.loading.dismiss();
                alert(JSON.stringify(err)) // si ocurre un error de comunicacion con el servidor, se envia este mensaje
              })
          },
          (err)=>{
            this.loading.dismiss();
            alert(JSON.stringify(err)) // si ocurre un error de comunicacion con el servidor, se envia este mensaje
          })
      },
      (err)=>{
        this.loading.dismiss();
        alert(JSON.stringify(err)) // si ocurre un error de comunicacion con el servidor, se envia este mensaje
      })
    
  }
   

  porsemana(){
    var array=[this.cant_sem4, this.cant_sem3, this.cant_sem2, this.cant_sem1]// se almacenan los datos en un arreglo
    this.semanachartvar = new Chart(this.usuariosporsemanachart.nativeElement, {
      type: 'horizontalBar',
      data: {
        datasets: [{
          data: array, // se reciben los datos del arreglo en data 
          backgroundColor: [
            'rgba(14, 10, 132, 0.3)',
            'rgba(1, 176, 4, 0.3)',
            'rgba(208, 217, 26, 0.3)',
            'rgba(209, 4, 4, 0.3)'
          ],
          borderColor: [
            'rgba(14, 10, 132, 1)',
            'rgba(1, 176, 4, 1)',
            'rgba(208, 217, 26, 1)',
            'rgba(209, 4, 4, 1)'
          ],
          borderWidth: 1
        }],
        labels: [
          '4 semanas',
          '3 semanas',
          '2 semanas',
          'ultimos 7 días'
        ]
      },

      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        animation: {
          animateRotate: true
        }
      }
    })
  }

}
