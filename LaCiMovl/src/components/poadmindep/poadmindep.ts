import { Component } from '@angular/core';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
@Component({
  selector: 'poadmindep',
  templateUrl: 'poadmindep.html'
})
export class PoadmindepComponent {

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
  estado2:any;
  valor_estado:boolean;
  respuesta:any;
  loading:any;

  constructor(private webservices: WebservicesProvider, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.correo = this.navParams.get('correo');
  }

  ionViewCanEnter() {
    this.consulta();
  }

  loadactualizacion() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Cargando...',
    });
  
    this.loading.present();
  }

  imc_perfil(){
    var i_m_c :any;
    var condición : String;
    i_m_c= (this.peso/(this.estatura*this.estatura));
    this.imc=i_m_c;
    if( i_m_c>=40){
      condición='obesidad morbida';
    }else{
      if((i_m_c<40) && i_m_c>=30){
        condición='obesidad';
      }else{
        if((i_m_c<30) && (i_m_c>=25)){
          condición='sobrepeso';
        }else{
          if((i_m_c<25) && (i_m_c>=18.5)){
            condición='normal';
          }else{
            if(i_m_c<18.5){
              condición='bajo peso';
            }
          }
        }
      }
    }
  }

  actualizar_deportista(){
    this.loadactualizacion();
    if(this.peso!=0 && this.estatura!=0){
      this.imc_perfil();
    }

    if(this.valor_estado==false){
      this.estado2="desactivada"; 
    }else{
      if(this.valor_estado==true){
        this.estado2="activada";
      }else{
        this.loading.dismiss();
        alert('Ha ocurrido un error al cambiar su estado')
      }
    }
    if(this.estado2=="activada" || this.estado2=="desactivada"){
      this.webservices.actualizar_deportista(this.correo, this.pass, this.nombre, this.apellido_p, this.apellido_m, this.genero, this.edad, this.peso, this.estatura, this.imc, this.pais, this.estado2).then(
        (datos) =>{
          this.respuesta= datos[0].RESPUESTA;
          if(this.respuesta=='OK'){
            this.loading.dismiss();
            this.navCtrl.pop();
            alert('Los cambios se han realizado satisfactoriamente')
          }else{
            if(this.respuesta=='ERROR'){
              this.loading.dismiss();
              alert('Ha ocurrido un error en la actualizacion')
            }else{
              this.loading.dismiss();
              alert('Ha ocurrido un error en la actualizacion')
            }
          }
        //alert('oka'+JSON.stringify(resultado));
        },
        (error) =>{
          this.loading.dismiss();
          alert('error'+JSON.stringify(error));
        })
    }
  }

  consulta(){
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
