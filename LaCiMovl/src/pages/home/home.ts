//Importaciones
import { Component } from '@angular/core';//componentes de angular
import { NavController } from 'ionic-angular';//controladores de angular
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';//enlace con la base de datos
import { Storage } from '@ionic/storage';

import { RegistroPage} from '../registro/registro';//conexion con las vista registro
import { EntrenadorPage} from '../entrenador/entrenador';//conexion con las vista Entrenador
import { DeportistaPage} from '../deportista/deportista';//conexion con las vista Deportista
import { AdministradorPage} from '../administrador/administrador';//conexion con las vista Administrador

//Vista con la que se está trabajando
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

//información enviada a la base de datos
export class HomePage {

  correo:any;
  pass:any;
  rol:any;

  constructor(public navCtrl: NavController, private sqlite: SQLite, private storage: Storage) {

  }

  condicion(){
    if(this.rol==2){
      this.navCtrl.push(EntrenadorPage);
    }
    if(this.rol==1){
      this.navCtrl.push(DeportistaPage,{correo:this.correo});
    }
    if(this.rol==0){
      this.navCtrl.push(AdministradorPage);
    }
    if(this.rol!=0 && this.rol!=1 && this.rol!=2){
      alert('Escoja un rol');
    }  
  }

  registrar(){
    this.navCtrl.push(RegistroPage);
  }

  guardarbd(){
    
    this.sqlite.create({
      name: 'LaCiMovl.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        //insercion de datos
        db.executeSql('insert into usuario values (?,?,?)', [null,this.correo,this.pass])
        .then((data)=>{
         alert('insert ok'+JSON.stringify(data));
         db.executeSql('select * from usuario',[]).then((data) => {

          alert('usuario'+JSON.stringify(data.rows.item(0).correo));
          /*if(data.rows.length > 0) {
            alert('usuario'+data.rows.item(0).correo);
          }*/
        }, (err) => {
           alert(JSON.stringify(err));
        }).catch(e=>{alert(JSON.stringify(e))});
       },
       (err)=>{
         JSON.stringify('insert error'+err);
       }).catch(err=>{

         JSON.stringify('insert error2'+err);
       });

       

      });



  }

}
