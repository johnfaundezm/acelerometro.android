import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Nav } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-entrenadortabs',
  templateUrl: 'entrenadortabs.html'
})
export class EntrenadortabsPage {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  perfilentRoot = 'PerfilentPage'
  deportistasentRoot = 'DeportistasentPage'

  correo:any;

  parametros = {
    correo: ''
  }
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, 
    private webservices: WebservicesProvider) {
    this.parametros.correo = this.navParams.get('correo')
    this.correo = this.navParams.get('correo');

    this.pages = [
      { title: 'Salir', component: HomePage },
      //{ title: 'Cronometro', component: CronometroPage },
      //{ title: 'Cronometroent', component: CronometroentPage }
    ];
  }

  ionViewCanEnter() {
    this.menuCtrl.enable(true, 'Menu');
  }

  ionViewDidEnter(){
    this.loading.dismiss();
  }

  actualizar_ingreso_cuenta(){
    var estado = 2;
    this.webservices.actualizar_ingreso_cuenta(this.correo, estado).then(
      (datos) =>{
        var respuesta= datos[0].RESPUESTA;
        if(respuesta=='ERROR'){
          alert('Ha ocurrido un error al enviar el estado')
        }else{
          //alert('Ha ocurrido un error a enviar el estado')
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
    this.navCtrl.setRoot(HomePage);
    //this.nav.setRoot(page.component);
  }

}
