import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the AdministradorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class AdministradorPage {
  ListUser : any; 
  private todo: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider, private formBuilder: FormBuilder) {
  
    this.todo = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      pass: ['', [Validators.required, Validators.maxLength(8)]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdministradorPage');
  }

  CreateUser(){
    console.log(this.todo);

    this.database.CreateUser(this.todo.value.correo,this.todo.value.pass).then((data) =>{
      console.log(data);
      this.GetAllUsers();
    }, (error) =>{
      console.log(error);
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
    this.database.DeleteUser(correo).then((correo) =>{
      console.log(correo);
    }, (error) =>{
      console.log(error);
    })
  }



}
