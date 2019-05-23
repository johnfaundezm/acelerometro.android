import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { PopoverComponent } from '../../components/popover/popover';


/**
 * Generated class for the DeportistaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deportista',
  templateUrl: 'deportista.html',
})
export class DeportistaPage {
  correo:any;
  usuario: Array<{correo:string,pass:string}>=[{correo:'',pass:''}];

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, public popoverCtrl: PopoverController) {
      this.correo = this.navParams.get('correo');
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    })
  }

  ionViewDidLoad() {
    while(this.usuario.length>0){
      this.usuario.pop();
    }
    
    //this.traerdatos();
    this.datos_user();
  }

  datos_user(){

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {

      db.executeSql('SELECT * FROM perfil_deportista Where correo=(?)',[this.correo]).then((data) => {

      //alert('correo'+JSON.stringify(data.rows.item(0).correo));
      //alert('pass'+JSON.stringify(data.rows.item(0).pass));

      let largo=data.rows.length;
      

      var correo =data.rows.item(0).correo;
      var pass = data.rows.item(0).pass;

      this.usuario.push({"correo":correo,"pass":pass});

      /*if(data.rows.length > 0) {
        alert('usuario'+data.rows.item(0).correo);
      }*/
      }, (err) => {
          alert(JSON.stringify(err));
      }).catch(e=>{alert(JSON.stringify(e))});

    });

  }

  traerdatos(){

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {

        db.executeSql('SELECT * FROM perfil_deportista WHERE ',[]).then((data) => {

        //alert('correo'+JSON.stringify(data.rows.item(0).correo));
        //alert('pass'+JSON.stringify(data.rows.item(0).pass));

        let largo=data.rows.length;
      
      for(var i=0;i<largo;i++){

        var correo =data.rows.item(0).correo;
        var pass = data.rows.item(0).pass;

        this.usuario.push({"correo":correo,"pass":pass});
        
      }
        /*if(data.rows.length > 0) {
          alert('usuario'+data.rows.item(0).correo);
        }*/
        }, (err) => {
          alert(JSON.stringify(err));
      }).catch(e=>{alert(JSON.stringify(e))});

    });

  }

}
