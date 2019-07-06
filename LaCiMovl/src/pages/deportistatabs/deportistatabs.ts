import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Nav } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';

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
  estado:any;
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
      //{ title: 'Cronometro', component: CronometroPage },
      //{ title: 'Cronometroent', component: CronometroentPage }
    ];
  }

  ionViewCanEnter() {
    this.menuCtrl.enable(true, 'Menu');
  }

  metodosalir(){
    
    this.nav.popToRoot();
  }

  actualizar_ingreso_cuenta(){
    this.webservices.actualizar_ingreso_cuenta(this.correo, this.estado).then(
      (datos) =>{
        this.respuesta= datos[0].RESPUESTA;
        if(this.respuesta=='OK'){
          this.loading.dismiss();
          this.navCtrl.pop();
          alert('Los cambios se han realizado satisfactoriamente')
        }else{
          if(this.respuesta=='ERROR'){
            this.loading.dismiss();
            alert('Ha ocurrido un error en la actualizacion')
          }else{
            this.loading.dismiss();
            alert('Ha ocurrido un error en la actualizacion')
          }  
        }
      //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        this.loading.dismiss();
        alert('error'+JSON.stringify(error));
      })
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

}
