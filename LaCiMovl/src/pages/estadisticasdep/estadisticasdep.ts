import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-estadisticasdep',
  templateUrl: 'estadisticasdep.html',
})
export class EstadisticasdepPage {

  @ViewChild('aceleracionchart') aceleracionchart;

  aceleracionchartvar: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.acelerachart();
    }, 150)
  }

  acelerachart(){
    this.aceleracionchartvar = new Chart(this.aceleracionchart.nativeElement, {
      type: 'line',
      data: {
        datasets: [{
          data: [0.8, 3.4, 7.5, 9.8, 17.8, 14.4, 19.5, 11.3, 6.4, 2.9, 0.8],
          borderColor: 'rgba(214, 225, 9, 1)',
          fill: false,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderCapStyle: 'butt',
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBorderWidth: 1,     
                        pointRadius: 3,
                        pointHitRadius: 10,
        }],
        labels: [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'
        ]
      },

      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        }
      }
    })
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstadisticasdepPage');
  }

}
