import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { WebservicesProvider } from '../../providers/webservices/webservices';

@IonicPage()
@Component({
  selector: 'page-estadisticasdep',
  templateUrl: 'estadisticasdep.html',
})
export class EstadisticasdepPage {

  @ViewChild('aceleracionchart') aceleracionchart;

  aceleracionchartvar: any;
  datos_acelerometro: Array<{x:any, y:any}>=[{x:'', y:''}];

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider) {
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.acelerachart();
    }, 150)

    while(this.datos_acelerometro.length>0){
      this.datos_acelerometro.pop();
    }

    this.consultar_acc();
  }

  consultar_acc(){
    let largo=this.datos_acelerometro.length;
    for(var i=0;i<largo;i++){
      this.datos_acelerometro.pop();
    }
    this.webservices.consulta_acelerometro_datos().then(
      (datos) =>{
        let largo=Object.keys(datos).length;
        var x=0;
        for(var i=0;i<largo;i++){
          x+=0,1;
          var y= datos[i].ACELERACION;
          this.datos_acelerometro.push({"x":x, "y":y});         
        }
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
          label: 'Acc x',
          data: this.datos_acelerometro,

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
          label: 'Ac Y',
          data: [
            {x: 0, y: 0}, 
            {x: 1, y: 10}, 
            {x: 2, y: 3}, 
            {x: 3, y: 11}, 
            {x: 4, y: 20}, 
            {x: 5, y: 15}, 
            {x: 6, y: 1}, 
            {x: 7, y: 32}, 
            {x: 8, y: 9},
            {x: 9, y: 11}
          ],
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
          label: 'Ac Z',
          data: [
            {x: 0, y: 0}, 
            {x: 1, y: 8}, 
            {x: 2, y: 10}, 
            {x: 3, y: 11}, 
            {x: 4, y: 3}, 
            {x: 5, y: 47}, 
            {x: 6, y: 7}, 
            {x: 7, y: 32}, 
            {x: 8, y: 23},
            {x: 9, y: 8},
            {x: 10, y: 0}, 
            {x: 11, y: 8}, 
            {x: 12, y: 10}, 
            {x: 13, y: 11}, 
            {x: 14, y: 3}, 
            {x: 15, y: 47}, 
            {x: 16, y: 7}, 
            {x: 17, y: 32}, 
            {x: 18, y: 23},
            {x: 19, y: 8},
            {x: 20, y: 0}, 
            {x: 21, y: 8}, 
            {x: 22, y: 10}, 
            {x: 23, y: 11}, 
            {x: 24, y: 3}, 
            {x: 25, y: 47}, 
            {x: 26, y: 7}, 
            {x: 27, y: 32}, 
            {x: 28, y: 23},
            {x: 29, y: 8},
            {x: 30, y: 0}, 
            {x: 31, y: 8}, 
            {x: 32, y: 10}, 
            {x: 33, y: 11}, 
            {x: 34, y: 3}, 
            {x: 35, y: 47}, 
            {x: 36, y: 7}, 
            {x: 37, y: 32}, 
            {x: 38, y: 23},
            {x: 39, y: 8},
            {x: 40, y: 0}, 
            {x: 41, y: 8}, 
            {x: 42, y: 10}, 
            {x: 43, y: 11}, 
            {x: 44, y: 3}, 
            {x: 45, y: 47}, 
            {x: 46, y: 7}, 
            {x: 47, y: 32}, 
            {x: 48, y: 23},
            {x: 49, y: 8},
            {x: 50, y: 0}, 
            {x: 51, y: 8}, 
            {x: 52, y: 10}, 
            {x: 53, y: 11}, 
            {x: 54, y: 3}, 
            {x: 55, y: 47}, 
            {x: 56, y: 7}, 
            {x: 57, y: 32}, 
            {x: 58, y: 23},
            {x: 59, y: 8},
            {x: 60, y: 0}, 
            {x: 61, y: 8}, 
            {x: 62, y: 10}, 
            {x: 63, y: 11}, 
            {x: 64, y: 3}, 
            {x: 65, y: 47}, 
            {x: 66, y: 7}, 
            {x: 67, y: 32}, 
            {x: 68, y: 23},
            {x: 69, y: 8},
            {x: 70, y: 0}, 
            {x: 71, y: 8}, 
            {x: 72, y: 10}, 
            {x: 73, y: 11}, 
            {x: 74, y: 3}, 
            {x: 75, y: 47}, 
            {x: 76, y: 7}, 
            {x: 77, y: 32}, 
            {x: 78, y: 23},
            {x: 79, y: 8},
            {x: 80, y: 0}, 
            {x: 81, y: 8}, 
            {x: 82, y: 10}, 
            {x: 83, y: 11}, 
            {x: 84, y: 3}, 
            {x: 85, y: 47}, 
            {x: 86, y: 7}, 
            {x: 87, y: 32}, 
            {x: 88, y: 23},
            {x: 89, y: 8}
          ],
          showLine: true,
          borderWidth: 2,
          borderColor: 'rgba(185, 24, 24, 1)',
          fill: false,
                        backgroundColor: 'rgba(185, 24, 24, 1)',
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
          enabled: true
        },
        scales: {
          xAxes: [{
              type: 'linear',
              position: 'bottom'
          }]
        }
      }
    })
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstadisticasdepPage');
  }

}
