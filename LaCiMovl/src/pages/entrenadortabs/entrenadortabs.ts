// se importan los plugins que se ejecutarán en esta vista
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

  //DECLARACION DE VARIABLES
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;
  //declaracion de los tabs
  perfilentRoot = 'PerfilentPage'
  deportistasentRoot = 'DeportistasentPage'

  correo:any;

  parametros = {
    correo: ''
  }
  loading:any;

  //Constructor, donde se declaran todos los plugins
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, 
    private webservices: WebservicesProvider) {

    //se reciben las variables de la vista anterior y se almacenan en una variable dentro de la vista
    this.parametros.correo = this.navParams.get('correo')
    this.correo = this.navParams.get('correo');

    this.pages = [
      //{ title: 'Salir', component: HomePage },
      //{ title: 'Cronometro', component: CronometroPage },
      //{ title: 'Cronometroent', component: CronometroentPage }
    ];
  }

  ionViewCanEnter() {// evento que se realiza antes de entrar a la vista
    this.menuCtrl.enable(true, 'Menu'); // permite ver el menú deslizable desde la izquierda
  }

  ionViewDidEnter(){// evento que se realiza antes de entrar a la vista
    this.loading.dismiss(); // Se termina el loading
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
    this.navCtrl.setRoot(HomePage); // se envia al Homepage
  }

  openPage(page) {
    this.actualizar_ingreso_cuenta(); // se actualiza el ingreso de la cuenta al salir
    this.navCtrl.setRoot(page.component); // se envia a la pagina que se seleccione
  }

}
