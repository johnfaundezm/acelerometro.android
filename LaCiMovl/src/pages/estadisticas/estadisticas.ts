import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { WebservicesProvider } from '../../providers/webservices/webservices';

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

  cant_dep:number;
  cant_ent:number;
  total_usuarios:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider) {
  }


  ionViewCanEnter() {
    this.cantidad_usuarios();
    setTimeout(() => {
      this.cantidadusuarios();
      this.porsemana();
    }, 150)
  }

  cantidad_usuarios(){
    this.webservices.vista_deportista().then(
      (datos) =>{
        this.cant_dep=Object.keys(datos).length;
        alert('deportistas: '+this.cant_dep)
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
    
    this.webservices.vista_entrenador().then(
      (datos) =>{
        this.cant_ent=Object.keys(datos).length;
        alert('entrenadores: '+this.cant_ent)
      },
      (err)=>{
        alert(JSON.stringify(err))
      })

      this.total_usuarios=this.cant_dep+this.cant_ent;

  }


  cantidadusuarios(){
    this.usuarioschartvar = new Chart(this.usuarioschart.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [46, 26],
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
