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
  @ViewChild('aceleracionxyzchart') aceleracionxyzchart;

  aceleracionchartvar: any;
  aceleracionxyzchartvar: any;

  datos_acelerometroX = [];
  datos_acelerometroY = [];
  datos_acelerometroZ = [];
  datos_acelerometro = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider) {
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.acelerachart();
      this.aceleraxyzchart();
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
  }

  ionViewCanEnter(){
    this.consultar_acc();
  }

  consultar_acc(){
    for(var i=0;i<this.datos_acelerometroX.length;i++){
      this.datos_acelerometroX.pop();
    }
    for(var i=0;i<this.datos_acelerometroY.length;i++){
      this.datos_acelerometroY.pop();
    }
    for(var i=0;i<this.datos_acelerometroZ.length;i++){
      this.datos_acelerometroZ.pop();
    }
    for(var i=0;i<this.datos_acelerometro.length;i++){
      this.datos_acelerometro.pop();
    }
    this.webservices.consulta_acelerometro_datos().then(
      (datos) =>{
        let largo=Object.keys(datos).length;
        var division=largo/1;
        var x=0;
        for(var i=0;i<largo;i++){
          x+=0.1;
          var yX = datos[i].ACELERACIONX;
          var yY = datos[i].ACELERACIONY;
          var yZ = datos[i].ACELERACIONZ;
          var y = datos[i].ACELERACION;
          var auxX = {x: x, y: yX};
          var auxY = {x: x, y: yY};
          var auxZ = {x: x, y: yZ};
          var aux = {x: x, y: y};
          this.datos_acelerometroX.push(auxX);
          this.datos_acelerometroY.push(auxY);
          this.datos_acelerometroZ.push(auxZ);
          this.datos_acelerometro.push(aux);
        }
        this.acelerachart();
        this.aceleraxyzchart();
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
          label: 'Ac Y',
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
          label: 'Ac Z',
          data: this.datos_acelerometroZ,
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
          label: 'Modulo',
          data: this.datos_acelerometro,
          showLine: true,
          borderWidth: 2,
          borderColor: 'rgba(3, 103, 3, 1)',
          fill: false,
                        backgroundColor: 'rgba(3, 103, 3, 1)',
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
          display: false
        },
        tooltips: {
          enabled: true
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
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstadisticasdepPage');
  }

}
