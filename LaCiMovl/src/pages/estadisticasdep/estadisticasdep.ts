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
          borderColor: 'rgba(214, 225, 9, 1)',
          fill: false,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderCapStyle: 'butt',
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBorderWidth: 1,     
                        pointRadius: 3,
                        pointHitRadius: 10,
        }]
      },

      options: {
        legend: {
          display: false
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
