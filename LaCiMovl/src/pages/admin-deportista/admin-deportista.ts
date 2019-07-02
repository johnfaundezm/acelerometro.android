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

  tabBarElement: any; //variable que almacena el elemento tabbar

  correo:any;
  email:any;
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

  poadmindep(myEvent) {
    let popover = this.popoverCtrl.create(PoadmindepComponent, {correo:this.correo}, {cssClass: 'popover-tamaño'});
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

  detalle(){
    this.webservices.consulta_deportista(this.correo).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        this.email= datos[0].CORREO;
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
        this.fecha_r= datos[0].FECHA_R;
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  imc_perfil(){
    var i_m_c :any;
    var condición : String;
    i_m_c= (this.peso/(this.estatura*this.estatura));
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

}
