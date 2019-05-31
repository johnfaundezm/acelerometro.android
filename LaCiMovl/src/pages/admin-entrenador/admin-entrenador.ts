import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';

/**
 * Generated class for the AdminEntrenadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider) {
    this.correo = this.navParams.get('correo');
  }

  ionViewDidLoad() {
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
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

}
