import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';//controladores de angular
import { WebservicesProvider } from '../../providers/webservices/webservices';

import { DeportistatabsPage } from '../../pages/deportistatabs/deportistatabs';

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {
  //atributos a actualizar
  correo:any; //primary
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
  estado2:any;
  valor_estado:any;

  constructor(private webservices: WebservicesProvider, public navCtrl: NavController, public navParams: NavParams) {
    //recibe variable correo
    this.correo = this.navParams.get('correo');
  }

  ionViewCanEnter() {
    this.consulta();
  }

  cambioestado($event) {
    this.valor_estado = !this.valor_estado;
 }


  actualizar_deportista(){
    if(this.valor_estado==false){
      this.estado2="desactivada";
      alert('se ha desactivado con exito')  
    }
    if(this.valor_estado==true){
      this.estado2="activada";
      alert('se ha activado con exito')
    }
    this.webservices.actualizar_deportista(this.correo, this.pass, this.nombre, this.apellido_p, this.apellido_m, this.genero, this.edad, this.peso, this.estatura, this.imc, this.pais, this.estado).then(
      (resultado) =>{
        this.navCtrl.push(DeportistatabsPage,{correo:this.correo});
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
