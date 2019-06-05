import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { WebservicesProvider } from '../../providers/webservices/webservices';



@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  private formulario: FormGroup;
  respuesta:any;

  mes: any;
  //Fecha----------------------------------------
  currentDate;
  formattedDate;

  constructor(public navCtrl: NavController, private database: DatabaseProvider, private formBuilder: FormBuilder, private webservices: WebservicesProvider) {
    this.currentDate = new Date();
    this.getFormattedDate()

    this.formulario = this.formBuilder.group({
      correo: ['',[Validators.required, Validators.maxLength(50), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
      pass: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      id_tipo_usuario: ['', [Validators.required]],
    });
  }

  registrar(){
    this.webservices.registrar(this.formulario.value.correo,this.formulario.value.pass,' ',' ',' ',' ',0,0,0,0,' ','activada',this.formattedDate,this.formulario.value.id_tipo_usuario).then(
      (datos) =>{
        this.respuesta= datos[0].RESPUESTA;
        if(this.respuesta=='OK'){
          alert('El usuario ha sido creado exitosamente')
          this.navCtrl.pop();
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

  //sqlite
  /*crearusuario(){

    if(this.rol==0){
      this.database.Create_administrador(this.correo,this.pass).then((data) =>{
        alert('registra en la bd'+JSON.stringify(data));
      }, (error) =>{
        alert('no registra en la bd'+JSON.stringify(error));
      })
    }

    if(this.rol==1){
      this.database.Create_deportista(this.correo,this.pass).then((data) =>{
        alert('registra en la bd'+JSON.stringify(data));
      }, (error) =>{
        alert('no registra en la bd'+JSON.stringify(error));
      })
    }

    if(this.rol==2){
      this.database.Create_entrenador(this.correo,this.pass).then((data) =>{
        alert('registra en la bd'+JSON.stringify(data));
      }, (error) =>{
        alert('no registra en la bd'+JSON.stringify(error));
      })
    } 
  }

  GetAllUsers(){
    this.database.GetAllUsers().then((data: any) =>{
      console.log(data);
     // this.ListUser = data;
    }, (error) =>{
      console.log(error);
    })
  }

  DeleteUser(correo){
    console.log(correo);

  }*/

  
  cancelar(){
    this.navCtrl.pop();
  }

  getFormattedDate(){
    var dateObj =new Date()

    var year = dateObj.getFullYear().toString()
    var month = dateObj.getMonth().toString()
    this.mes = month;
    this.mes ++;
    var date = dateObj.getDate().toString()
    this.formattedDate = year+'-'+ this.mes +'-'+ date;
  }
  

}
