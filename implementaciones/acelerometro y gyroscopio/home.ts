//Importaciones
import { Component } from '@angular/core';//componentes de angular
import { NavController } from 'ionic-angular';//controladores de angular
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';//enlace con la base de datos
import { WebservicesProvider } from '../../providers/webservices/webservices';

import { RegistroPage} from '../registro/registro';//conexion con las vista registro
import { EntrenadorPage} from '../entrenador/entrenador';//conexion con las vista Entrenador
import { DeportistaPage} from '../deportista/deportista';//conexion con las vista Deportista
import { AdministradorPage} from '../administrador/administrador';//conexion con las vista Administrador
import { AdmintabsPage } from '../admintabs/admintabs';
import { DeportistatabsPage } from '../deportistatabs/deportistatabs';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

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

  public xOrient:any;
  public yOrient:any;
  public zOrient:any;
  public timestamp:any
  public accX:any;
  public accY:any;
  public accZ:any;

  constructor(public navCtrl: NavController, private sqlite: SQLite, private webservices: WebservicesProvider, public gyroscope:Gyroscope, public deviceMotion: DeviceMotion) {

  }

  consulta_login(){
    this.webservices.consulta_login(this.correo).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        this.email= datos[0].CORREO;
        this.pass2= datos[0].PASS;
        this.estado= datos[0].ESTADO;
        this.rol= datos[0].TIPO;
        this.respuesta= datos[0].RESPUESTA;

        if(this.estado=='activada'){
        
          if(this.rol==1){
            
            if(this.correo==this.email && this.pass==this.pass2){
              this.navCtrl.push(AdmintabsPage, {correo:this.correo});
            }
            else(
              alert('El correo no existe o su contraseña es incorrecta')
            )  
          }

          if(this.rol==2){
            
            if(this.correo==this.email && this.pass==this.pass2){
              this.navCtrl.push(EntrenadorPage, {correo:this.correo});
            }
            else(
              alert('El correo no existe o su contraseña es incorrecta')
            )
          }
    
          if(this.rol==3){
            
            if(this.correo==this.email && this.pass==this.pass2){
              this.navCtrl.push(DeportistatabsPage, {correo:this.correo});
            }
            else(
              alert('El correo no existe o su contraseña es incorrecta')
            )
          }
        }
        if(this.estado=='desactivada'){
          if(this.pass==this.pass2){
            alert('Su cuenta esta desactivada')
          }else{
            alert('El correo no existe o su contraseña es incorrecta')
          }
        }
        if(this.respuesta=='ERROR'){
          alert('El correo no existe o su contraseña es incorrecta')
        }

      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

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
//------------------------------------------------------------------------------------------------
  gyrascope(){

    let options: GyroscopeOptions = {
      frequency: 1000
   };
   
   this.gyroscope.getCurrent(options)
     .then((orientation: GyroscopeOrientation) => {
        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
        this.xOrient=orientation.x;
        this.yOrient=orientation.y;
        this.zOrient=orientation.z;
        this.timestamp=orientation.timestamp;

      })
     .catch()
   
   
   this.gyroscope.watch()
      .subscribe((orientation: GyroscopeOrientation) => {
         console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
         this.xOrient=orientation.x;
        this.yOrient=orientation.y;
        this.zOrient=orientation.z;
        this.timestamp=orientation.timestamp;
      });
  }

  Accelerometer(){
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) =>
       console.log(acceleration),
   
    //  (error: any) => console.log(error)
 
    );
    
    // Watch device acceleration
    var subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);
      this.accX=acceleration.x;
      this.accY=acceleration.y;
      this.accZ=acceleration.z;
    });
 //--------------------------------------------------------------------------------------------------------   
  }
}
