import { Component } from '@angular/core';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { NavController, NavParams} from 'ionic-angular';//controladores de angular

import { EntrenadortabsPage } from '../../pages/entrenadortabs/entrenadortabs';

@Component({
  selector: 'popovercoach',
  templateUrl: 'popovercoach.html'
})
export class PopovercoachComponent {

  text: string;
  correo:any;
  pass:any;
  nombre:any;
  apellido_p:any;
  apellido_m:any;
  genero:any;
  edad:any;
  pais:any;

  constructor(public navCtrl: NavController, private webservices: WebservicesProvider, public navParams: NavParams) {
    console.log('Hello PopovercoachComponent Component');
    this.text = 'Hello World';
    this.correo = this.navParams.get('correo');
  }

  ionViewDidLoad() {
    this.consulta();
  }

  actualizar_entrenador(){
    this.webservices.actualizar_entrenador(this.correo, this.pass, this.nombre, this.apellido_p, this.apellido_m, this.genero, this.edad, this.pais).then(
      (resultado) =>{
        this.navCtrl.push(EntrenadortabsPage,{correo:this.correo});
        //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        alert('error'+JSON.stringify(error));
      })
  }

  consulta(){
    this.webservices.consulta(this.correo).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
          this.pass= datos[0].PASS;
          this.nombre= datos[0].NOMBRE;
          this.apellido_p= datos[0].APELLIDO_P;
          this.apellido_m= datos[0].APELLIDO_M;
          this.genero= datos[0].GENERO;
          this.edad= datos[0].EDAD;
          this.pais= datos[0].PAIS;
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }



}
