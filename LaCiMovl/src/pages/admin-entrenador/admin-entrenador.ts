import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { PoadminentComponent } from '../../components/poadminent/poadminent';

@IonicPage()
@Component({
  selector: 'page-admin-entrenador',
  templateUrl: 'admin-entrenador.html',
})
export class AdminEntrenadorPage {

  tabBarElement: any; //variable que almacena el elemento tabbar
  
  correo:any;
  email:any;
  pass:any;
  nombre:any;
  apellido_p:any;
  apellido_m:any;
  genero:any;
  edad:any;
  pais:any;
  estado:any;
  fecha_r:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider, public popoverCtrl: PopoverController) {
    this.correo = this.navParams.get('correo');
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar'); //se pasa el elemento tabbar a la variable antes declarada
  }
  //antes de entrar a la vista se oculta el tabbar
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
  //cuando va a salir de la vista se le agrega el tabbar nuevamente
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  poadminent(myEvent) {
    let popover = this.popoverCtrl.create(PoadminentComponent, {correo:this.correo}, {cssClass: 'popover-tamaño'});
    popover.present({
      ev: myEvent
    })
  }

  ionViewCanEnter() {
    this.detalle();
  }

  doRefresh(refresher) {
    this.detalle();
    refresher.complete();
  } 
  // información de perfil de Entrenador
  detalle(){
    this.webservices.consulta_entrenador(this.correo).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        this.email= datos[0].CORREO;
        this.pass= datos[0].PASS;
        this.nombre= datos[0].NOMBRE;
        this.apellido_p= datos[0].APELLIDO_P;
        this.apellido_m= datos[0].APELLIDO_M;
        this.genero= datos[0].GENERO;
        this.edad= datos[0].EDAD;
        this.pais= datos[0].PAIS;
        this.estado= datos[0].ESTADO;
        this.fecha_r= datos[0].FECHA_R;   
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  volver(){
    this.navCtrl.pop();
  }

}
