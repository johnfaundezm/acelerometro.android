import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

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
  nombre:any;
  apellido:any;
  genero:any;
  peso:any;
  estatura:any;
  edad:any;
  pais:any;

  text: string;

  constructor(private sqlite: SQLite) {
    console.log('Hello PopoverComponent Component');
    this.text = 'Hello World';
  }


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
}
