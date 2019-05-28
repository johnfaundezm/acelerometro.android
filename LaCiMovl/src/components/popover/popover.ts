import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { NavController, NavParams } from 'ionic-angular';//controladores de angular
import { WebservicesProvider } from '../../providers/webservices/webservices';

import { DeportistaPage} from '../../pages/deportista/deportista';//conexion con las vista Deportista

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {
  //atributos a actualizar
  correo:any; //primary
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

  text: string;

  constructor(private sqlite: SQLite, private webservices: WebservicesProvider, public navCtrl: NavController, public navParams: NavParams) {
    console.log('Hello PopoverComponent Component');
    this.text = 'Hello World';
    //recibe variable correo
    this.correo = this.navParams.get('correo');
  }

  ionViewDidLoad() {
    //alert(this.correo);
    this.consulta();
    
    //this.traerdatos();
    //this.datos_user();
  }


  actualizar_deportista(){
    this.webservices.actualizar_deportista(this.correo, this.pass, this.nombre, this.apellido_p, this.apellido_m, this.genero, this.edad, this.peso, this.estatura, this.imc, this.pais).then(
      (resultado) =>{
        this.navCtrl.push(DeportistaPage,{correo:this.correo});
        //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        alert('error'+JSON.stringify(error));
      })
  }

  consulta(){
    this.webservices.consulta(this.correo).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
          this.pass= datos[0].PASS;
          this.nombre= datos[0].NOMBRE;
          this.apellido_p= datos[0].APELLIDO_P;
          this.apellido_m= datos[0].APELLIDO_M;
          this.genero= datos[0].GENERO;
          this.edad= datos[0].EDAD;
          this.peso= datos[0].PESO;
          this.estatura= datos[0].ESTATURA;
          this.imc= datos[0].IMC;
          this.pais= datos[0].PAIS;
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

/*
  actualizarbd() {
    this.sqlite.create({
      name: 'LaCiMovl.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM expense WHERE correo=?', [this.correo])
        .then(res => {
          if(res.rows.length > 0) {
            db.executeSql('UPDATE perfil_deportista SET nombre=?,apellido=?,genero=?,edad=?,pais=?,masa=?,estatura=? WHERE correo=?',[this.nombre,this.apellido,this.genero,this.edad,this.pais,this.peso,this.estatura,this.correo])

          }
        })
      }).catch(e => {
        console.log(e);
        
      });
  }
  */
}
