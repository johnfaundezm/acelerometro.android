// se importan los plugins que se ejecutarán en esta vista
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

  //DECLARACION DE VARIABLES
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

  //Constructor, donde se declaran todos los plugins
  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider, public popoverCtrl: PopoverController) {
    //recibe parámeros de la vista anterior
    this.correo = this.navParams.get('correo');
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar'); //se pasa el elemento tabbar a la variable antes declarada
  }
  
  //antes de entrar a la vista se oculta el tabbar
  ionViewWillEnter() {// evento que se ejecuta antes de entrar a la vista
    this.detalle(); // método que trae los datos del deportista
    this.tabBarElement.style.display = 'none';
  }
  //cuando va a salir de la vista se le agrega el tabbar nuevamente
  ionViewWillLeave() {// evento que se ejecuta al salir de la vista actual
    this.tabBarElement.style.display = 'flex';
  }

  poadmindep(myEvent) {
    let popover = this.popoverCtrl.create(PoadmindepComponent, {correo:this.correo}, {cssClass: 'popover-tamaño'});
    popover.present({
      ev: myEvent
    })
  }

  doRefresh(refresher) {// método que actualiza al tirar hacia abajo
    this.detalle();
    refresher.complete();
  }
  //información de perfil de deportista
  detalle(){
    this.webservices.consulta_deportista(this.correo).then( // se envian todos los parametros que se ven en el paréntesis
      (datos)=>{// se reciben los datos de respuesta del servidor
        //alert(JSON.stringify(datos));
        this.email= datos[0].CORREO; // se almacena el dato en una variable
        this.pass= datos[0].PASS; // se almacena el dato en una variable
        this.nombre= datos[0].NOMBRE; // se almacena el dato en una variable
        this.apellido_p= datos[0].APELLIDO_P; // se almacena el dato en una variable
        this.apellido_m= datos[0].APELLIDO_M; // se almacena el dato en una variable
        this.genero= datos[0].GENERO; // se almacena el dato en una variable
        this.edad= datos[0].EDAD; // se almacena el dato en una variable
        this.peso= datos[0].PESO; // se almacena el dato en una variable
        this.estatura= datos[0].ESTATURA; // se almacena el dato en una variable
        this.imc= datos[0].IMC; // se almacena el dato en una variable
        this.pais= datos[0].PAIS; // se almacena el dato en una variable
        this.estado= datos[0].ESTADO; // se almacena el dato en una variable
        this.fecha_r= datos[0].FECHA_R; // se almacena el dato en una variable
      },
      (err)=>{
        alert(JSON.stringify(err)) // si ocurre un error de comunicacion con el servidor, se envia este mensaje
      })
  }
  //Calcula el IMC según la masa corporal del deportista.
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

  //método que lleva a la vista anterior
  volver() {
    this.navCtrl.pop();
  }

}
