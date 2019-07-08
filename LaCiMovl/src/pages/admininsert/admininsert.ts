// se importan los plugins que se ejecutarán en esta vista
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { AdmintabsPage } from '../admintabs/admintabs';

@IonicPage()
@Component({
  selector: 'page-admininsert',
  templateUrl: 'admininsert.html',
})
export class AdmininsertPage {

  //DECLARACION DE VARIABLES
  tabBarElement: any; //variable que almacena el elemento tabbar

  private formulario: FormGroup;
  respuesta:any;

  formattedDate;

  //Constructor, donde se declaran todos los plugins
  constructor(public navCtrl: NavController, private database: DatabaseProvider, private formBuilder: FormBuilder, private webservices: WebservicesProvider) {
    // se crea un formulario
    this.formulario = this.formBuilder.group({//aqui se pone las restricciones al formulario para poder registrarse
      correo: ['',[Validators.required, Validators.maxLength(50), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],// validacion de correo
      pass: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]], //validacion de rol
    });

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar'); //se pasa el elemento tabbar a la variable antes declarada
  }

  //antes de entrar a la vista se oculta el tabbar
  ionViewWillEnter() {// evento que se ejecuta antes de entrar a la vista
    this.tabBarElement.style.display = 'none';
  }
  //cuando va a salir de la vista se le agrega el tabbar nuevamente
  ionViewWillLeave() {// evento que se ejecuta al salir de la vista actual
    this.tabBarElement.style.display = 'flex';
  }

  //Asigna y recibe la fecha con formato
  getFormattedDate(){
    var dateObj =new Date() // se almacena la fecha actual en una variable (queda almacenado en formato objeto)

    var year = dateObj.getFullYear().toString() // se saca solo el año
    var month = dateObj.getMonth().toString() // se saca solo el mes
    var mes:any = month; 
    mes ++; // se suma 1 al mes por que enero lo toma como el mes "0" en vez de ser el "1"
    var date = dateObj.getDate().toString() // se saca solo el día
    this.formattedDate = year+'-'+ mes +'-'+ date; // se concatena para dar el formato de fecha deseada
  }

  // Se envian los datos de registro al metodo registrar definido en webservices
  registrar(){  // Se llenan los datos de registro asignando primariamente valores en blanco como nulos.
    this.webservices.registrar(this.formulario.value.correo,this.formulario.value.pass,' ',' ',' ',' ',0,0,0,0,'ESPECIFICAR','activada',2,this.formattedDate,3).then( // se envian todos los parametros que se ven en el paréntesis
      (datos) =>{// se reciben los datos de respuesta del servidor
        this.respuesta= datos[0].RESPUESTA; // se almacena la respuesta en una variable 
        if(this.respuesta=='OK'){ // si la respuesta es "OK"
          alert('El usuario ha sido creado exitosamente') // Se envia un alert con el mensaje correspondiente
          this.navCtrl.push(AdmintabsPage);
        }
        if(this.respuesta=='EXISTE'){
          alert('El usuario ya existe, intente con otro correo') // Se envia un alert con el mensaje correspondiente
        }
        if(this.respuesta=='ERROR'){
          alert('Ha ocurrido un error inesperado') // Se envia un alert con el mensaje correspondiente
        }
        //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        //alert('error'+JSON.stringify(error));
      })
  }

  //método que devuelve a la vista anterior
  salir(){
    this.navCtrl.pop();
  }
  

}
