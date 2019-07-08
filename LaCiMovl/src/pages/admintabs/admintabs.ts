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

  //DECLARACION DE VARIABLES
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;

  //declaracion de los tabs
  deportistasRoot = 'DeportistasPage'
  entrenadoresRoot = 'EntrenadoresPage'
  estadisticasRoot = 'EstadisticasPage'

  correo:any;

  //Constructor, donde se declaran todos los plugins
  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public navParams: NavParams, 
    private webservices: WebservicesProvider) {
    
    //se reciben las variables de la vista anterior y se almacenan en una variable dentro de la vista
    this.correo = this.navParams.get('correo');

    this.pages = [
      //{ title: 'Salir', component: HomePage },
      //{ title: 'Cronometro', component: CronometroPage },
      //{ title: 'Cronometroent', component: CronometroentPage }
    ];
  }

  ionViewCanEnter() {// evento que se realiza antes de entrar a la vista
    this.menuCtrl.enable(true, 'Menu');
  }

  actualizar_ingreso_cuenta(){ // actualiza el estado de la cuenta, si se esta ocupando es"1" y si no es "2"
    var estado = 2; // el estado cambia a 2
    this.webservices.actualizar_ingreso_cuenta(this.correo, estado).then( // se envian todos los parametros que se ven en el paréntesis
      (datos) =>{// se reciben los datos de respuesta del servidor
        var respuesta= datos[0].RESPUESTA; // se almacena la respuesta en una variable 
        if(respuesta=='ERROR'){
          alert('Ha ocurrido un error al enviar el estado') // Se envia un alert con el mensaje correspondiente
        }
      //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        alert('error'+JSON.stringify(error)); // si ocurre un error de comunicacion con el servidor, se envia este mensaje
      })
  }

  //método para volver al home
  metodosalir(){
    this.actualizar_ingreso_cuenta(); // se actualiza el ingreso de la cuenta al salir
    this.nav.setRoot(HomePage); // se envia al Homepage
  }

  openPage(page) {
    this.actualizar_ingreso_cuenta(); // se actualiza el ingreso de la cuenta al salir
    this.navCtrl.setRoot(page.component); // se envia a la pagina que se seleccione
  }
  
}
