// se importan los plugins que se ejecutarán en esta vista
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { PoentComponent } from '../../components/poent/poent';


@IonicPage()
@Component({
  selector: 'page-perfilent',
  templateUrl: 'perfilent.html',
})
export class PerfilentPage {

  //DECLARACION DE VARIABLES
  correo:any;
  pass:any;
  nombre:any;
  apellido_p:any;
  apellido_m:any;
  genero:any;
  edad:any;
  pais:any;
  estado:any;

  //Constructor, donde se declaran todos los plugins
  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, private webservices: WebservicesProvider) {
    this.correo = this.navParams.get('correo');
  }

  //declaracion de popover; menú que se desplega desde un botón
  poadminent(myEvent) {
    let popover = this.popoverCtrl.create(PoentComponent, {correo:this.correo}, {cssClass: 'popover-tamaño'});
    popover.present({
      ev: myEvent
    })
  }

  ionViewCanEnter() {// evento que se realiza antes de entrar a la vista
    this.consulta();
  }

  doRefresh(refresher) { // Función que refresca la pagina al tirar hacia abajo
    this.consulta();
    refresher.complete();
  } 

  //Muestra los datos del entrenador desde el servidor web.
  consulta(){
    this.webservices.consulta(this.correo).then( // se envia el correo a consultar
      (datos)=>{ //se reciben los datos como respuesta
        //alert(JSON.stringify(datos));
          this.pass= datos[0].PASS; // se almacena el dato en una variable
          this.nombre= datos[0].NOMBRE; // se almacena el dato en una variable
          this.apellido_p= datos[0].APELLIDO_P; // se almacena el dato en una variable
          this.apellido_m= datos[0].APELLIDO_M; // se almacena el dato en una variable
          this.genero= datos[0].GENERO; // se almacena el dato en una variable
          this.edad= datos[0].EDAD; // se almacena el dato en una variable
          this.pais= datos[0].PAIS; // se almacena el dato en una variable
          this.estado= datos[0].ESTADO; // se almacena el dato en una variable
      },
      (err)=>{
        alert(JSON.stringify(err)) // si ocurre un error de comunicacion se tira este error
      })
  }

}
