import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { PoadmindepComponent } from '../../components/poadmindep/poadmindep';


@IonicPage()
@Component({
  selector: 'page-admin-deportista',
  templateUrl: 'admin-deportista.html',
})
export class AdminDeportistaPage {

  correo:any;
  pass:any;
  nombre:any;
  apellido_p:any;
  apellido_m:any;
  genero:any;
  edad:any;
  peso:any;
  estatura:any;
  imc:any;
  pais:any;
  estado:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider, public popoverCtrl: PopoverController) {
    this.correo = this.navParams.get('correo');
  }

  poadmindep(myEvent) {
    let popover = this.popoverCtrl.create(PoadmindepComponent, {}, {cssClass: 'popover-tamaño'});
    popover.present({
      ev: myEvent
    })
  }

  ionViewDidLoad() {
    this.detalle();
  }

  detalle(){
    this.webservices.consulta_deportista(this.correo).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
          this.pass= datos[0].PASS;
          this.nombre= datos[0].NOMBRE;
          this.apellido_p= datos[0].APELLIDO_P;
          this.apellido_m= datos[0].APELLIDO_M;
          this.genero= datos[0].GENERO;
          this.edad= datos[0].EDAD;
          this.peso= datos[0].PESO;
          this.estatura= datos[0].ESTATURA;
          this.imc= datos[0].IMC;
          this.pais= datos[0].PAIS;
          this.estado= datos[0].ESTADO;
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

}
