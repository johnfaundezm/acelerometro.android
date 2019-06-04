import { Component } from '@angular/core';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'poadminent',
  templateUrl: 'poadminent.html'
})
export class PoadminentComponent {

  correo:any;
  pass:any;
  nombre:any;
  apellido_p:any;
  apellido_m:any;
  genero:any;
  edad:any;
  pais:any;
  estado:any;
  estado2:any;
  valor_estado:any;

  constructor(private webservices: WebservicesProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.correo = this.navParams.get('correo');
  }

  ionViewCanEnter() {
    this.consulta();
  }

  cambioestado($event) {
    this.valor_estado = !this.valor_estado;
  }

  actualizar_entrenador(){
    if(this.valor_estado==false){
      this.estado2="desactivada";
      alert('se ha desactivado con exito')  
    }
    if(this.valor_estado==true){
      this.estado2="activada";
      alert('se ha activado con exito')
    }
    this.webservices.actualizar_entrenador(this.correo, this.pass, this.nombre, this.apellido_p, this.apellido_m, this.genero, this.edad, this.pais, this.estado2).then(
     (resultado) =>{
       this.navCtrl.pop();
     alert('oka'+JSON.stringify(resultado));
     },
     (error) =>{
       alert('error'+JSON.stringify(error));
     })
  }

  consulta(){
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
