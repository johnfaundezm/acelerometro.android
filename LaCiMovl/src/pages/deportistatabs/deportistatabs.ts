import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Nav } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { HomePage } from '../home/home';
import { CronometroentPage } from '../cronometroent/cronometroent';
import { CronometroPage } from '../cronometro/cronometro';

@IonicPage()
@Component({
  selector: 'page-deportistatabs',
  templateUrl: 'deportistatabs.html'
})
export class DeportistatabsPage {

  @ViewChild(Nav) nav: Nav;
  

  perfildepRoot = 'PerfildepPage'
  entrenamientoRoot = 'EntrenamientoPage'
  estadisticasdepRoot = 'EstadisticasdepPage'

  correo:any;

  parametros = {
    correo: ''
  }

  pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, 
    private webservices: WebservicesProvider) {
    this.parametros.correo = this.navParams.get('correo');
    this.correo = this.navParams.get('correo');
    this.pages = [
      //{ title: 'Salir', component: HomePage },
      { title: 'Cronometro', component: CronometroPage },
      { title: 'Cronometroent', component: CronometroentPage }
    ];
  }

  ionViewCanEnter() {
    this.menuCtrl.enable(true, 'Menu');
  }

  actualizar_ingreso_cuenta(){
    var estado = 2;
    this.webservices.actualizar_ingreso_cuenta(this.correo, estado).then(
      (datos) =>{
        var respuesta= datos[0].RESPUESTA;
        if(respuesta=='ERROR'){
          alert('Ha ocurrido un error al enviar el estado')
        }
      //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        alert('error'+JSON.stringify(error));
      })
  }

  metodosalir(){
    this.actualizar_ingreso_cuenta();
    this.navCtrl.setRoot(HomePage);
  }

  openPage(page) {
    this.actualizar_ingreso_cuenta();
    this.navCtrl.setRoot(page.component);
  }

}
