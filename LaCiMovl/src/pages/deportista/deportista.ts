import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { PopoverComponent } from '../../components/popover/popover';
import { WebservicesProvider } from '../../providers/webservices/webservices';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, public popoverCtrl: PopoverController, private webservices: WebservicesProvider) {
      this.correo = this.navParams.get('correo');
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    })
  }

  ionViewDidLoad() {
    alert(this.correo);
    this.consulta();
    
    //this.traerdatos();
    //this.datos_user();
  }

  actualizar(){
    this.webservices.actualizar(this.correo, this.pass, this.nombre, this.apellido_p, this.apellido_m, this.genero, this.edad, this.peso, this.estatura, this.imc, this.pais).then(
      (resultado) =>{
        alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        alert('error'+JSON.stringify(error));
      })
  }

  consulta(){
    this.webservices.consulta(this.correo).then(
      (datos)=>{
        alert(JSON.stringify(datos));
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


  //sqlite
  /*datos_user(){

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {

      db.executeSql('SELECT * FROM perfil_deportista Where correo=(?)',[this.correo]).then((data) => {

      //alert('correo'+JSON.stringify(data.rows.item(0).correo));
      //alert('pass'+JSON.stringify(data.rows.item(0).pass));

      var correo =data.rows.item(0).correo;
      var pass = data.rows.item(0).pass;

      this.usuario.push({"correo":correo,"pass":pass});

      /*if(data.rows.length > 0) {
        alert('usuario'+data.rows.item(0).correo);
}*//*
      }, (err) => {
          alert(JSON.stringify(err));
      }).catch(e=>{alert(JSON.stringify(e))});

    });

  }*/

  /*traerdatos(){

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
        }*//*
        }, (err) => {
          alert(JSON.stringify(err));
      }).catch(e=>{alert(JSON.stringify(e))});

    });

  }*/

}
