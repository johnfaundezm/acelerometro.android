import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { CronometroPage } from '../cronometro/cronometro';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  id_ent:any;
  email:any;
  estado:any;
  respuesta:any;
  loading:any;
  cont:number=0;
  a:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.id_ent = navParams.get('ide');
    this.email = navParams.get('email');
  }

  ionViewWillEnter(){
    this.load_buscar()
    this.a=1;
    this.time();
  }

  ionViewWillLeave(){
    this.a=0;
  }

  time(){
    setTimeout(() => {
      if(this.a==1){
        this.verificacion();
        this.time();
      }
    }, 2000)
  }

  verificacion(){
    this.webservices.estado_entrenamiento(this.id_ent).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        this.estado= datos[0].ESTADO;
        if(this.estado==5){
          this.a=0;
          this.alerta_confirmacion();
        }else{
          this.cont+=1;
          if(this.cont==5){
            this.loading.dismiss();
            this.a=0;
            this.alerta_confirmacion_tiempo_expirado();
          }
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  alerta_confirmacion_tiempo_expirado() {
    const confirm = this.alertCtrl.create({
      title: 'Notificación',
      message: 'No se ha encontrado ninguna notificación en curso, ¿Desea reintentar?',
      buttons: [
        {
          text: 'Salir',
          handler: () => {
            console.log('Disagree clicked');
            this.loading.dismiss();
            this.navCtrl.pop();
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.loading.dismiss();
            this.a=1;
            this.load_buscar()
            this.time();
            this.cont=0;
          }
        }
      ]
    });
    confirm.present();
  }

  alerta_confirmacion() {
    const confirm = this.alertCtrl.create({
      title: 'Confirmacion de solicitud',
      message: 'El entrenador "'+this.email+'" te ha enviado una solicitud de entrenamiento',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
            this.loading.dismiss();
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.loading.dismiss();
            this.actualizar_estado();
          }
        }
      ]
    });
    confirm.present();
  }

  actualizar_estado(){
    this.load();
    this.estado=4;
    this.webservices.actualizar_estado_entrenamiento(this.id_ent,this.estado).then(
      (datos) =>{
        this.respuesta= datos[0].RESPUESTA;
        if(this.respuesta=='OK'){
          this.loading.dismiss();
          this.navCtrl.push(CronometroPage, {id:this.id_ent, email:this.email});
          alert('Los cambios se han realizado satisfactoriamente')
        }else{
          if(this.respuesta=='ERROR'){
            this.loading.dismiss();
            alert('Ha ocurrido un error en la actualizacion')
          }else{
            this.loading.dismiss();
            alert('Ha ocurrido un error en la actualizacion')
          }
        }
      //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        this.loading.dismiss();
        alert('error'+JSON.stringify(error));
      })
  }

  load_buscar() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Buscando Entrenamiento...',
    });
  
    this.loading.present();
  }

  load() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Cargando...',
    });
  
    this.loading.present();
  }
}
