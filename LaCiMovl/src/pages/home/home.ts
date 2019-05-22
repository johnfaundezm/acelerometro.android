//Importaciones
import { Component } from '@angular/core';//componentes de angular
import { NavController } from 'ionic-angular';//controladores de angular
import { RegistroPage} from '../registro/registro';//conexion con las vista registro
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';//enlace con la base de datos
import { Storage } from '@ionic/storage';

//Vista con la que se está trabajando
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

//información enviada a la base de datos
export class HomePage {

  correo:any;
  pass:any

  constructor(public navCtrl: NavController, private sqlite: SQLite, private storage: Storage) {

  }

  registrar(){
  	this.navCtrl.push(RegistroPage);
  }

}
