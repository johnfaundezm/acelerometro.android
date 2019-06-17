import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-estadisticas',
  templateUrl: 'estadisticas.html',
})
export class EstadisticasPage {

  @ViewChild('usuarioschart') usuarioschart;
  @ViewChild('usuariosporsemanachart') usuariosporsemanachart;

  usuarioschartvar: any;
  semanachartvar: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.cantidadusuarios();
      this.porsemana();
    }, 150)
  }


  cantidadusuarios(){
    this.usuarioschartvar = new Chart(this.usuarioschart.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [70, 4],
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

  porsemana(){
    this.semanachartvar = new Chart(this.usuariosporsemanachart.nativeElement, {
      type: 'horizontalBar',
      data: {
        datasets: [{
          data: [2, 10, 30, 5],
          backgroundColor: [
            'rgba(14, 10, 132, 1)',
            'rgba(1, 176, 4, 1)',
            'rgba(208, 217, 26, 1)',
            'rgba(209, 4, 4, 1)'
          ]
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstadisticasPage');
  }

}
