import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DatabaseProvider } from '../../providers/database/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { WebservicesProvider } from '../../providers/webservices/webservices';



@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  //private ListUser : any; 
  private todo: FormGroup;
  correo:any;
  pass:any;
  
  id_tipo_usuario:any;
  rol:any;

  constructor(public navCtrl: NavController, private database: DatabaseProvider, private formBuilder: FormBuilder, private webservices: WebservicesProvider) {
    
    this.todo = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      pass: ['', [Validators.required, Validators.maxLength(8)]],
    });
   
  }

  registrar(){
    this.webservices.registrar(this.correo,this.pass,'null','null','null','null',0,0,0,0,'','2019-05-24',this.id_tipo_usuario).then(
      (resultado) =>{
        alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        alert('error'+JSON.stringify(error));
      })
  }

  //sqlite
  crearusuario(){
    console.log(this.todo);

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

  }

  
  cancelar(){
    this.navCtrl.push(HomePage);
  }

}
