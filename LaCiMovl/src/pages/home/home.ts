//Importaciones
import { Component } from '@angular/core';//componentes de angular
import { NavController, MenuController, LoadingController, ToastController } from 'ionic-angular';//controladores de angular
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { RegistroPage} from '../registro/registro';//conexion con las vista registro
import { AdmintabsPage } from '../admintabs/admintabs';
import { DeportistatabsPage } from '../deportistatabs/deportistatabs';
import { EntrenadortabsPage } from '../entrenadortabs/entrenadortabs';

//Vista con la que se está trabajando
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

//información enviada a la base de datos
export class HomePage {
  
  email:any;
  correo:any;
  pass:any;
  pass2:any;
  rol:any;
  respuesta:any;
  estado:any;
  a:any;
  loading:any;

  constructor(public navCtrl: NavController, private webservices: WebservicesProvider, public menuCtrl: MenuController, public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  }
/*
  ionViewWillEnter() { //evento que se realiza antes de entrar a la vista
    this.menuCtrl.enable(false, 'Menu'); //no permite que se pueda ingresar al menu deslizable de la izquierda
  }
*/

  loadconsulta_login() {//loading que se muesta en pantalla al llamar esta función
    this.loading = this.loadingCtrl.create({// se crea el loading
      spinner: 'ios',//tipo de animación al estar cargando
      content: 'Cargando...',//mensaje que muestra al estar cargando
    });
  
    this.loading.present();
  }
  
  consulta_login(){
    this.loadconsulta_login() // comienza el loading
    
    this.webservices.consulta_login(this.correo, this.pass).then( // se envian todos los parametros que se ven en el paréntesis
      (datos)=>{// se reciben los datos de respuesta del servidor

        //alert(JSON.stringify(datos));
        this.email= datos[0].CORREO; // se almacena en una variable
        this.pass2= datos[0].PASS; // se almacena en una variable
        this.estado= datos[0].ESTADO; // se almacena en una variable
        var sesion= datos[0].SESION; // se almacena en una variable
        this.rol= datos[0].TIPO; // se almacena en una variable
        this.respuesta= datos[0].RESPUESTA; // se almacena la respuesta en una variable 
        this.loading.dismiss(); // Se termina el loading

        if(this.respuesta=='ERROR'){
          alert('El correo no existe o su contraseña es incorrecta') // Se envia un alert con el mensaje correspondiente
        }
        else{
          if(sesion!=0){// si sesion es distinto de 0 entonces la cuenta no está en uso
            if(this.estado==1){//si estado es 1, entonces la cuenta esta activada
        
              if(this.rol==1){ //si rol es 1 entonces es un administrador
                
                if(this.pass2==1){//si pass es 1 entonces la constraseña es correcta
                  this.navCtrl.push(AdmintabsPage, {correo:this.correo}); //se ingresa a la vista administrador y se envia la variable correo
                }
                else(
                  alert('El correo no existe o su contraseña es incorrecta')//mensaje de error si no se cumple el if
                )  
              }
    
              if(this.rol==2){//si rol es 2 entonces es un entrenador
                
                if(this.pass2==1){//si pass es 1 entonces la constraseña es correcta
                  this.navCtrl.push(EntrenadortabsPage, {correo:this.correo});//se ingresa a la vista entrenador y se envia la variable correo
                }
                else(
                  alert('El correo no existe o su contraseña es incorrecta')//mensaje de error si no se cumple el if
                )
              }
        
              if(this.rol==3){//si rol es 3 entonces es un deportista
                
                if(this.pass2==1){//si pass es 1 entonces la constraseña es correcta
                  this.navCtrl.push(DeportistatabsPage, {correo:this.correo});//se ingresa a la vista deportista y se envia la variable correo
                }
                else(
                  alert('El correo no existe o su contraseña es incorrecta')//mensaje de error si no se cumple el if
                )
              }
            }
            else{
              if(this.estado==0){//si estado es 0, entonces la cuenta esta desactivada
                if(this.pass2==1){
                  alert('Su cuenta esta desactivada') // Se envia un alert con el mensaje correspondiente
                }else{
                  alert('El correo no existe o su contraseña es incorrecta') // Se envia un alert con el mensaje correspondiente
                }
              }
            }
          }
          else{
            alert('La cuenta está siendo usada') // Se envia un alert con el mensaje correspondiente
          }
        }
      },
      (err)=>{
        this.loading.dismiss(); // Se termina el loading
        alert(JSON.stringify(err)) // si ocurre un error de comunicacion con el servidor, se envia este mensaje
      })
  }

  // método que envía a la página de registro
  registrar(){
    this.navCtrl.push(RegistroPage);
  }

}
