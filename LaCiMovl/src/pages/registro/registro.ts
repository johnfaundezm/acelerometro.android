import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { LoadingController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  private formulario: FormGroup;
  respuesta:any;
  loading:any;

  mes: any;
  //Fecha----------------------------------------
  currentDate;
  formattedDate;

  constructor(public navCtrl: NavController, private database: DatabaseProvider, private formBuilder: FormBuilder, private webservices: WebservicesProvider, public menuCtrl: MenuController, public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    this.currentDate = new Date();
    this.getFormattedDate();

    this.menuCtrl.enable(false, 'Menu');

    this.formulario = this.formBuilder.group({
      correo: ['',[Validators.required, Validators.maxLength(50), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
      pass: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      id_tipo_usuario: ['', [Validators.required]],
    });
  }

  ionViewCanEnter() {
    
  }

  ionViewWillLeave(){
    this.loadsalir();
  }

  loadsalir() {
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Cargando...'
    });
  
    loading.present();

    setTimeout(() => {
      loading.dismiss();
    });
  }

  loadregistrar() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Cargando...',
      dismissOnPageChange: true
    });
  
    this.loading.present();
  }

  mensaje() {
    const toast = this.toastCtrl.create({
      message: 'Cambios guardados correctamente',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  

  

  registrar(){
    this.loadregistrar()
    this.getFormattedDate();
    this.webservices.registrar(this.formulario.value.correo,this.formulario.value.pass,'',' ',' ',' ',0,0,0,0,'ESPECIFICAR','activada',this.formattedDate,this.formulario.value.id_tipo_usuario).then(
      (datos) =>{
        this.respuesta= datos[0].RESPUESTA;
        if(this.respuesta=='OK'){
          this.navCtrl.pop();
          this.loading.dismiss();
        }
        if(this.respuesta=='EXISTE'){
          this.loading.dismiss();
          alert('El usuario ya existe, intente con otro correo')
        }
        if(this.respuesta=='ERROR'){
          this.loading.dismiss();
          alert('Ha ocurrido un error inesperado')
        }
        //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        this.loading.dismiss();
        alert('error'+JSON.stringify(error));
      })
  }

  //sqlite
  /*crearusuario(){

    if(this.rol==0){
      this.database.Create_administrador(this.correo,this.pass).then((data) =>{
        alert('registra en la bd'+JSON.stringify(data));
      }, (error) =>{
        alert('no registra en la bd'+JSON.stringify(error));
      })
    }

    if(this.rol==1){
      this.database.Create_deportista(this.correo,this.pass).then((data) =>{
        alert('registra en la bd'+JSON.stringify(data));
      }, (error) =>{
        alert('no registra en la bd'+JSON.stringify(error));
      })
    }

    if(this.rol==2){
      this.database.Create_entrenador(this.correo,this.pass).then((data) =>{
        alert('registra en la bd'+JSON.stringify(data));
      }, (error) =>{
        alert('no registra en la bd'+JSON.stringify(error));
      })
    } 
  }

  GetAllUsers(){
    this.database.GetAllUsers().then((data: any) =>{
      console.log(data);
     // this.ListUser = data;
    }, (error) =>{
      console.log(error);
    })
  }

  DeleteUser(correo){
    console.log(correo);

  }*/

  
  cancelar(){
    this.navCtrl.pop();
  }

  getFormattedDate(){
    var dateObj =new Date()

    var year = dateObj.getFullYear().toString()
    var month = dateObj.getMonth().toString()
    this.mes = month;
    this.mes ++;
    var date = dateObj.getDate().toString()
    this.formattedDate = year+'-'+ this.mes +'-'+ date;
  }
  

}
