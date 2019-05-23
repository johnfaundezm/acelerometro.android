import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;

  constructor(public http: Http, public storage: SQLite) {
  }

  abrirbd(){
    this.storage = new SQLite();
      this.storage.create({ name: "data.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS users (correo VARCHAR, pass VARCHAR)", []).then(
          (res)=>{
           // alert('se creo la bd'+res);
          }
        );
      }).catch((error) => {
       // alert('no se creo la bd'+error);
      })
  }

  CreateUser(correo:string, pass:string){
    return new Promise ((resolve, reject) => {
      let sql = "INSERT INTO users (correo, pass) VALUES (?,?)";
      this.db.executeSql(sql, [correo, pass]).then((data) =>{
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  GetAllUsers(){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("SELECT * FROM users", []).then((data) => {
        let arrayUsers = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayUsers.push({
              correo: data.rows.item(i).correo,
              pass: data.rows.item(i).pass
            });            
          }          
        }
        resolve(arrayUsers);
      }, (error) => {
        reject(error);
      })
    })
  }

  DeleteUser(correo:string){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("DELETE * FROM users WHERE correo=(?)", [correo]).then((data) => {
        resolve(data);
      },(error) => {
        reject(error);
      })
    })
  }

}