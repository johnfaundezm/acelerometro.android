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

  @ViewChild('usuarioschart') usuarioschart;
  @ViewChild('usuariosporsemanachart') usuariosporsemanachart;

  usuarioschartvar: any;
  semanachartvar: any;

  loading:any;

  cant_dep:any;
  cant_ent:any;
  total_usuarios:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider, public loadingCtrl: LoadingController) {
  }


  ionViewCanEnter() {
    
    setTimeout(() => {
      this.cantidad_usuarios();
      this.porsemana();
    }, 150)
  }

  loadconsulta_login() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Cargando...',
    });
  
    this.loading.present();
  }

  cantidad_usuarios(){
    this.loadconsulta_login();
    this.webservices.vista_deportista().then(
      (datos) =>{
        this.cant_dep=Object.keys(datos).length;
          this.webservices.vista_entrenador().then(
          (datos) =>{
            this.cant_ent=Object.keys(datos).length;
            this.total_usuarios=this.cant_dep+this.cant_ent;
            this.loading.dismiss();
            this.cantidadusuarios();

          },
          (err)=>{
            alert(JSON.stringify(err))
          })
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
    
    

      

  }


  cantidadusuarios(){
    this.usuarioschartvar = new Chart(this.usuarioschart.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.cant_dep, this.cant_ent],
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

}
