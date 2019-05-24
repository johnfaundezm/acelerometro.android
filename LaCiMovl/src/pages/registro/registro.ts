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
  nombre:any;
  apellido_p:any;
  apellido_m:any;
  genero:any;
  edad:any;
  peso:any;
  estatura:any;
  imc:any;
  pais:any;
  fecha_r:any;
  id_tipo_usuario:any;
  rol:any;

  constructor(public navCtrl: NavController, private database: DatabaseProvider, private formBuilder: FormBuilder, private webservices: WebservicesProvider) {
    
    this.todo = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      pass: ['', [Validators.required, Validators.maxLength(8)]],
    });
   
  }


  registrar(){
    this.webservices.Registrar(this.correo,this.pass,this.nombre,this.apellido_p,this.apellido_m, this.genero,this.edad,this.peso,this.estatura,this.imc,this.pais,this.fecha_r,this.id_tipo_usuario).then(
      (resultado) =>{
        alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        alert('error'+JSON.stringify(error));
      })
  }

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
