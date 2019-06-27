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
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Acc x',
          data: [
            {x: 0, y: 0}, 
            {x: 1, y: 2}, 
            {x: 2, y: 4}, 
            {x: 3, y: 8}, 
            {x: 4, y: 16}, 
            {x: 5, y: 32}, 
            {x: 6, y: 64}, 
            {x: 7, y: 3}, 
            {x: 8, y: 9},
            {x: 9, y: 1}
          ],
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
          label: 'Acc Y',
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
          label: 'Acc Z',
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
            {x: 9, y: 8}
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
