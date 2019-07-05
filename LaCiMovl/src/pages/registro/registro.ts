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
  //notifica que los camios se guardaron correctamente
  mensaje() {
    let toast = this.toastCtrl.create({
      message: 'Cambios guardados correctamente',
      position: 'middle',
      cssClass: 'mensaje-toast'
    });
    toast.present();

    setTimeout(() => {
      this.navCtrl.pop();
      toast.dismiss();
    },2000);
  }

  

  
  // SE envian los datos de registro al metodo registrar definido en webservices
  registrar(){
    this.loadregistrar()
    this.getFormattedDate();
    this.webservices.registrar(this.formulario.value.correo,this.formulario.value.pass,'',' ',' ',' ',0,0,0,0,' ','activada',2,this.formattedDate,this.formulario.value.id_tipo_usuario).then(
      (datos) =>{
        this.respuesta= datos[0].RESPUESTA;
        if(this.respuesta=='OK'){
          this.mensaje();
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

  cancelar(){
    this.navCtrl.pop();
  }
  //Aaigna y recibe la fecha con formato
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
