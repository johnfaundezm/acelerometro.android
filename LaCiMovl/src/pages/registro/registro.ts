import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DatabaseProvider } from '../../providers/database/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  private ListUser : any; 
  private todo: FormGroup;
  correo:any;
  pass:any;

  constructor(public navCtrl: NavController, private database: DatabaseProvider, private formBuilder: FormBuilder) {
    
    this.todo = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      pass: ['', [Validators.required, Validators.maxLength(8)]],
    });
   
  }

  crearusuario(){
    console.log(this.todo);

    this.database.CreateUser(this.correo,this.pass).then((data) =>{
      alert('registra en la bd'+JSON.stringify(data));
    }, (error) =>{
      alert('no registra en la bd'+JSON.stringify(error));
    })
  }

  GetAllUsers(){
    this.database.GetAllUsers().then((data: any) =>{
      console.log(data);
      this.ListUser = data;
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
