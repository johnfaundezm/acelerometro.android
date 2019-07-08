// se importan los plugins que se ejecutarán en esta vista
import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  //DECLARACION DE FUNCIONES
  private formulario: FormGroup; //se declara el formulario de registro
  respuesta:any;
  loading:any;

  mes: any;
  //Fecha----------------------------------------
  currentDate;
  formattedDate;

  //Constructor, donde se declaran todos los plugins
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private webservices: WebservicesProvider, public menuCtrl: MenuController, public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    this.currentDate = new Date(); //genera la fecha actual
    this.getFormattedDate(); //funcion q le permite dar formato a la fecha actual

    this.menuCtrl.enable(false, 'Menu'); //funcion que desactiva el menu deslizable de la izquierda

    this.formulario = this.formBuilder.group({//aqui se pone las restricciones al formulario para poder registrarse
      correo: ['',[Validators.required, Validators.maxLength(50), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],// validacion de correo
      pass: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]], //validacion de contraseña
      id_tipo_usuario: ['', [Validators.required]], //validacion de rol
    });
  }

  ionViewWillLeave(){// evento que se ejecuta al salir de la vista actual
    this.loadsalir();
  }

  loadsalir() { //loading que se muesta en pantalla al llamar esta función
    let loading = this.loadingCtrl.create({ // se crea el loading
      spinner: 'ios', //tipo de animación al estar cargando
      content: 'Cargando...'//mensaje que muestra al estar cargando
    });
  
    loading.present();

    setTimeout(() => {
      loading.dismiss(); // comando que realiza el término del loading
    });
  }
  
  loadregistrar() {//loading que se muesta en pantalla al llamar esta función
    this.loading = this.loadingCtrl.create({// se crea el loading
      spinner: 'ios',//tipo de animación al estar cargando
      content: 'Cargando...',//mensaje que muestra al estar cargando
      dismissOnPageChange: true // funcion que permite detener el loading al cambiar de vista
    });
  
    this.loading.present();
  }


  //notifica que los camios se guardaron correctamente
  mensaje() { //se crea el metodo Toast que muestra un breve mensaje en pantalla, despues de registrarse
    let toast = this.toastCtrl.create({ // se crea el Toast
      message: 'Cambios guardados correctamente', // mensaje que se verá al mostrar el Toast
      position: 'middle', // posicion donde aparecerá el Toast
      cssClass: 'mensaje-toast' // personalizacion del diseño del Toast (la funcion está creada en el scss)
    });
    toast.present();

    setTimeout(() => { //funcion que realiza una accion pasado los 2000 milisegundos
      this.navCtrl.pop(); // comando que lleva a la vista anterior, funciona como un salir
      toast.dismiss(); // se termina el mensaje del Toast
    },2000);
  }

  

  
  // Se envian los datos de registro al metodo registrar definido en webservices
  registrar(){
    this.loadregistrar() // se comienza el loading
    this.getFormattedDate(); // se da formato a la fecha
    this.webservices.registrar(this.formulario.value.correo,this.formulario.value.pass,'',' ',' ',' ',0,0,0,0,' ','activada',2,this.formattedDate,this.formulario.value.id_tipo_usuario).then( // se envian todos los parametros que se ven en el paréntesis
      (datos) =>{// se reciben los datos de respuesta del servidor
        this.respuesta= datos[0].RESPUESTA; // se almacena la respuesta en una variable 
        if(this.respuesta=='OK'){ // si la respuesta es "OK"
          this.mensaje(); // se activa le mensaje del Toast
          this.loading.dismiss(); // Se termina el loading
        }
        if(this.respuesta=='EXISTE'){ // si la respuesta es "EXISTE"
          this.loading.dismiss(); // Se termina el loading
          alert('El usuario ya existe, intente con otro correo') // Se envia un alert con el mensaje correspondiente
        }
        if(this.respuesta=='ERROR'){
          this.loading.dismiss(); // Se termina el loading
          alert('Ha ocurrido un error inesperado') // Se envia un alert con el mensaje correspondiente
        }
        //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        this.loading.dismiss(); // Se termina el loading
        alert('error'+JSON.stringify(error)); // si ocurre un error de comunicacion con el servidor, se envia este mensaje
      })
  }

  cancelar(){
    this.navCtrl.pop();
  }

  //Asigna y recibe la fecha con formato
  getFormattedDate(){
    var dateObj =new Date() // se almacena la fecha actual en una variable (queda almacenado en formato objeto)

    var year = dateObj.getFullYear().toString()  // se saca solo el año
    var month = dateObj.getMonth().toString() // se saca solo el mes
    this.mes = month; 
    this.mes ++; // se suma 1 al mes por que enero lo toma como el mes "0" en vez de ser el "1"
    var date = dateObj.getDate().toString() // se saca solo el día
    this.formattedDate = year+'-'+ this.mes +'-'+ date; // se concatena para dar el formato de fecha deseada
  }
  

}
