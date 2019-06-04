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

  correo:any;
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

  detalle(){
    this.webservices.consulta_entrenador(this.correo).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
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

}
