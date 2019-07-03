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

  tabBarElement: any; //variable que almacena el elemento tabbar

  private formulario: FormGroup;
  respuesta:any;

  constructor(public navCtrl: NavController, private database: DatabaseProvider, private formBuilder: FormBuilder, private webservices: WebservicesProvider) {
    
    this.formulario = this.formBuilder.group({
      correo: ['',[Validators.required, Validators.maxLength(50), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
      pass: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
    });

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

  ionViewCanEnter() {
    console.log('ionViewCanEnter AdmininsertPage');
  }

  registrar(){  // Se llenan los datos de registro asignando primariamente valores en blanco como nulos.
    this.webservices.registrar(this.formulario.value.correo,this.formulario.value.pass,' ',' ',' ',' ',0,0,0,0,'ESPECIFICAR','activada','2019-06-05',3).then(
      (datos) =>{
        this.respuesta= datos[0].RESPUESTA;
        if(this.respuesta=='OK'){
          alert('El usuario ha sido creado exitosamente')
          this.navCtrl.push(AdmintabsPage);
        }
        if(this.respuesta=='EXISTE'){
          alert('El usuario ya existe, intente con otro correo')
        }
        if(this.respuesta=='ERROR'){
          alert('Ha ocurrido un error inesperado')
        }
        //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        //alert('error'+JSON.stringify(error));
      })
  }

  salir(){
    this.navCtrl.pop();
  }
  

}
