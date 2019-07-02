//Importaciones
import { Component } from '@angular/core';//componentes de angular
import { NavController, MenuController, LoadingController, ToastController } from 'ionic-angular';//controladores de angular
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';//enlace con la base de datos
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { RegistroPage} from '../registro/registro';//conexion con las vista registro
import { AdmintabsPage } from '../admintabs/admintabs';
import { DeportistatabsPage } from '../deportistatabs/deportistatabs';
import { EntrenadortabsPage } from '../entrenadortabs/entrenadortabs';

//Vista con la que se está trabajando
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

//información enviada a la base de datos
export class HomePage {
  
  email:any;
  correo:any;
  pass:any;
  pass2:any;
  rol:any;
  respuesta:any;
  estado:any;
  a:any;
  loading:any;

  constructor(public navCtrl: NavController, private sqlite: SQLite, private webservices: WebservicesProvider, public menuCtrl: MenuController, public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  }
/*
  ionViewCanEnter() {
    this.menuCtrl.enable(false, 'Menu');
  }
*/
  /*
  ionViewDidEnter(){
    this.cantidad_pila_nav()
  }
*/
  ionViewWillLeave(){
  }

  cantidad_pila_nav(){
    for ( let i=0; i < this.navCtrl.length(); i++ ){
      let v = this.navCtrl.getViews()[i];
      console.log(v.component.name); 
      alert(v.component.name) 
      
    }
  }

  loadconsulta_login() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Cargando...',
    });
  
    this.loading.present();
  }
  
  consulta_login(){
    this.loadconsulta_login()
    
    this.webservices.consulta_login(this.correo, this.pass).then(
      (datos)=>{

        //alert(JSON.stringify(datos));
        this.email= datos[0].CORREO;
        this.pass2= datos[0].PASS;
        this.estado= datos[0].ESTADO;
        this.rol= datos[0].TIPO;
        this.respuesta= datos[0].RESPUESTA;
        this.loading.dismiss();

        if(this.respuesta=='ERROR'){
          alert('El correo no existe o su contraseña es incorrecta')
        }
        else{
          if(this.estado==1){//si estado es 1, entonces la cuenta esta activada
        
            if(this.rol==1){ //si rol es 1 entonces es un administrador
              
              if(this.pass2==1){//si pass es 1 entonces la constraseña es correcta
                this.navCtrl.push(AdmintabsPage, {correo:this.correo}); //se ingresa a la vista administrador y se envia la variable correo
              }
              else(
                alert('El correo no existe o su contraseña es incorrecta')//mensaje de error si no se cumple el if
              )  
            }
  
            if(this.rol==2){//si rol es 2 entonces es un entrenador
              
              if(this.pass2==1){//si pass es 1 entonces la constraseña es correcta
                this.navCtrl.push(EntrenadortabsPage, {correo:this.correo});//se ingresa a la vista entrenador y se envia la variable correo
              }
              else(
                alert('El correo no existe o su contraseña es incorrecta')//mensaje de error si no se cumple el if
              )
            }
      
            if(this.rol==3){//si rol es 3 entonces es un deportista
              
              if(this.pass2==1){//si pass es 1 entonces la constraseña es correcta
                this.navCtrl.push(DeportistatabsPage, {correo:this.correo});//se ingresa a la vista deportista y se envia la variable correo
              }
              else(
                alert('El correo no existe o su contraseña es incorrecta')//mensaje de error si no se cumple el if
              )
            }
          }
          else{
            if(this.estado==0){//si estado es 0, entonces la cuenta esta desactivada
              if(this.pass2==1){
                alert('Su cuenta esta desactivada')
              }else{
                alert('El correo no existe o su contraseña es incorrecta')
              }
            }
          }
        }
      },
      (err)=>{
        this.loading.dismiss();
        alert(JSON.stringify(err))
      })
  }
/*
  inicio_sesion(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {

      if(this.rol==0){
        db.executeSql('SELECT * FROM perfil_administrador Where correo=(?)',[this.correo]).then((data) => {
          var correo =data.rows.item(0).correo;
          var pass = data.rows.item(0).pass;
          if(correo==this.correo && pass==this.pass){
            this.navCtrl.push(AdministradorPage, {correo:this.correo});
          }
          else(
            alert('El correo no existe o su contraseña es incorrecta')
          )
        }, (err) => {
          //alert(JSON.stringify(err));
          
        }).catch(e=>{alert('El correo no existe o no existe para este Rol')});   
      }

      if(this.rol==1){
        db.executeSql('SELECT * FROM perfil_deportista WHERE correo=(?)',[this.correo]).then((data) => {
          var correo =data.rows.item(0).correo;
          var pass = data.rows.item(0).pass;
          if(correo==this.correo && pass==this.pass){
            this.navCtrl.push(DeportistaPage, {correo:this.correo});
          }
          else(
            alert('El correo no existe o su contraseña es incorrecta')
          )
        }, (err) => {
          //alert(JSON.stringify(err));
          
        }).catch(e=>{alert('El correo no existe o no existe para este Rol')});
      }
      
      if(this.rol==2){
        db.executeSql('SELECT * FROM perfil_entrenador WHERE correo=(?)',[this.correo]).then((data) => {
          var correo =data.rows.item(0).correo;
          var pass = data.rows.item(0).pass;
          if(correo==this.correo && pass==this.pass){
            this.navCtrl.push(EntrenadorPage, {correo:this.correo});
          }
          else(
            alert('El correo no existe o su contraseña es incorrecta')
          )
        }, (err) => {
          //alert(JSON.stringify(err));
          
        }).catch(e=>{alert('El correo no existe o no existe para este Rol')});
      }
      
      if(this.rol!=0 && this.rol!=1 && this.rol!=2){
        alert('Escoja un rol');
      } 

    });
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
    //if(this.rol!=0 && this.rol!=1 && this.rol!=2){
    //  alert('Escoja un rol');
    //}  
  }
*/

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
