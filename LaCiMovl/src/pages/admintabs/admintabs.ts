import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, MenuController, Nav, NavParams } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-admintabs',
  templateUrl: 'admintabs.html'
})
export class AdmintabsPage {

  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;

  deportistasRoot = 'DeportistasPage'
  entrenadoresRoot = 'EntrenadoresPage'
  estadisticasRoot = 'EstadisticasPage'

  correo:any;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public navParams: NavParams, 
    private webservices: WebservicesProvider) {
    
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

  actualizar_ingreso_cuenta(){
    var estado = 2;
    this.webservices.actualizar_ingreso_cuenta(this.correo, estado).then(
      (datos) =>{
        var respuesta= datos[0].RESPUESTA;
        if(respuesta=='ERROR'){
          alert('Ha ocurrido un error al enviar el estado')
        }else{
          alert('Ha ocurrido un error a enviar el estado')
        }
      //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        alert('error'+JSON.stringify(error));
      })
  }

  metodosalir(){
    this.actualizar_ingreso_cuenta();
    this.nav.popToRoot();
  }

  openPage(page) {
    this.actualizar_ingreso_cuenta();
    this.nav.setRoot(HomePage);
    //this.nav.setRoot(page.component);
  }
  
}
