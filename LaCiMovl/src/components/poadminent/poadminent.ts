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
  valor_estado:boolean;
  respuesta:any;

  constructor(private webservices: WebservicesProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.correo = this.navParams.get('correo');
  }

  ionViewCanEnter() {
    this.consulta();
  }

  actualizar_entrenador(){
    if(this.valor_estado==false){
      this.estado2="desactivada"; 
    }else{
      if(this.valor_estado==true){
        this.estado2="activada";
      }else{
        alert('Ha ocurrido un error al cambiar su estado')
      }
    }
    if(this.estado2=="activada" || this.estado2=="desactivada"){
      this.webservices.actualizar_entrenador(this.correo, this.pass, this.nombre, this.apellido_p, this.apellido_m, this.genero, this.edad, this.pais, this.estado2).then(
        (datos) =>{
          this.respuesta= datos[0].RESPUESTA;
          if(this.respuesta=='OK'){
            alert('Los cambios se han realizado satisfactoriamente')
          }else{
            if(this.respuesta=='ERROR'){
              alert('Ha ocurrido un error en la actualizacion')
            }
            alert('Ha ocurrido un error en la actualizacion')
          }
        //alert('oka'+JSON.stringify(resultado));
        },
        (error) =>{
          alert('error'+JSON.stringify(error));
        })
    }
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

          if(this.estado=='activada'){
            this.valor_estado=true;
          }else{
            this.valor_estado=false;
          }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

}
