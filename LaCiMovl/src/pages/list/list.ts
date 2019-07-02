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

  a:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.id_ent = navParams.get('ide');
    this.email = navParams.get('email');
  }

  ionViewWillEnter(){
    this.loadactualizacion();
    this.a=1;
    this.time();
  }

  ionViewWillLeave(){
    this.a=0;
  }

  time(){
    setTimeout(() => {
      this.verificacion();
      if(this.a==1){
      this.time();
      }else{
        alert('termina');
      }
    }, 2000)
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

  verificacion(){
    this.webservices.estado_entrenamiento(this.id_ent).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        this.estado= datos[0].ESTADO;
        if(this.estado==5){
          this.alerta_confirmacion();
        }else{
          if(this.estado==3){
            alert('continuar');
          }else{
            if(this.estado==3){
              alert('pausar');
            }else{
              if(this.estado==3){
                alert('finalizar');
              }else{
                alert('Ha ocurrido un problema');
              }
            }
          }
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  loadactualizacion() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Cargando...',
    });
  
    this.loading.present();
  }

  actualizar_estado(){
    this.loadactualizacion();
    this.estado=4;
    this.webservices.actualizar_estado_entrenamiento(this.id_ent,this.estado).then(
      (datos) =>{
        this.respuesta= datos[0].RESPUESTA;
        if(this.respuesta=='OK'){
          this.loading.dismiss();
          this.navCtrl.push(CronometroPage, {id:this.id_ent})
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
}
