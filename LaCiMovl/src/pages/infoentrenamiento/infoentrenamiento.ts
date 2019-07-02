import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CronometroPage } from '../cronometro/cronometro';


/**
 * Generated class for the InfoentrenamientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-infoentrenamiento',
  templateUrl: 'infoentrenamiento.html',
})
export class InfoentrenamientoPage {

  tabBarElement: any; //variable que almacena el elemento tabbar

  public tipo_entrenamiento: String;
  public tiempo_entrenamiento: number;
  public unidad_entrenamiento: number;
  
  public tiempo_recuperacion :number;
  public unidad_recuperacion : number;

  id_ent:any;
  email_dep:any;
  estado:any;
  a:any;
  formattedDate;

  respuesta:any;
  loading:any;

  //valores iniciales para el tiempo de entrenamiento
  tiempoM: any= 0;
  tiempoS: any= 0;
  tiempoRM: any= 0;
  tiempoRS: any= 0;

  //formato de tiempo
  tiempo_ent:any;
  tiempo_rec:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider,
    public loadingCtrl: LoadingController) {
    this.id_ent = this.navParams.get('ide');
    this.email_dep = this.navParams.get('email');
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar'); //se pasa el elemento tabbar a la variable antes declarada
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoentrenamientoPage');
  }
  //antes de entrar a la vista se oculta el tabbar
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
  //cuando va a salir de la vista se le agrega el tabbar nuevamente
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  loadregistrar() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Cargando...',
      dismissOnPageChange: true
    });
  
    this.loading.present();
  }

  load_espera_respuesta() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Esperando respuesta del Deportista...',
    });
    
    this.loading.onDidDismiss(() => {
      alert('Se ha excedido el tiempo de espera')
    });

    this.loading.present();

    setTimeout(() => {
      this.a=0;
      this.loading.dismiss();
    }, 10000);
  }


  //__Metodos_____
  segEntrenamiento(){
    alert('Ha definido su tiempo de entrenamiento en segundos');
    this.tiempo_entrenamiento=this.unidad_entrenamiento;
  }
  minEntrenamiento(){
    this.tiempo_entrenamiento= this.unidad_entrenamiento*60;
    alert('Ha definido su tiempo de entrenamiento en minutos');
  }
  segRecuperacion(){
    alert('Ha definido su tiempo de recuperación en segundos');
    this.tiempo_recuperacion=this.unidad_recuperacion;
  }
  minRecuperacion(){
    this.tiempo_recuperacion= this.unidad_recuperacion*60;
    alert('Ha definido su tiempo de recuperación en minutos');
  }

  getFormattedDate(){
    var dateObj =new Date()

    var year = dateObj.getFullYear().toString()
    var month = dateObj.getMonth().toString()
    var mes:any = month;
    mes ++;
    var date = dateObj.getDate().toString()
    this.formattedDate = year+'-'+ mes +'-'+ date;
  }

  time(){
    setTimeout(() => {
      this.verificacion();
      if(this.a==1){
      this.time();
      }else{
        this.loading.dismiss();
      }
    }, 2000)
  }

  enviar_entrenamiento(){
    this.loadregistrar();
    this.getFormattedDate();
    this.detalletiempo();

    this.tiempo_ent='00:'+this.tiempoM+':'+this.tiempoS;
    this.tiempo_rec='00:'+this.tiempoRM+':'+this.tiempoRS;
    this.estado=5;
    this.webservices.insertar_entrenamiento(this.id_ent,this.tiempo_ent,this.tiempo_rec,this.formattedDate,this.tipo_entrenamiento,this.estado).then(
      (datos) =>{
        this.respuesta= datos[0].RESPUESTA;
        if(this.respuesta=='OK'){
          alert('El entrenamiento se ha creado satisfactoriamente');
          this.loading.dismiss();
          this.load_espera_respuesta();

        }
        if(this.respuesta=='EXISTE'){
          this.loading.dismiss();
          alert('El usuario ya existe, intente con otro correo')
        }
        if(this.respuesta=='ERROR'){
          this.loading.dismiss();
          alert('Ha ocurrido un error inesperado')
        }
        this.a=1;
        this.time();
        //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        this.loading.dismiss();
        alert('error'+JSON.stringify(error));
      })
  }
  
  pausa_entrenamiento(){
    this.estado=2;
    this.webservices.actualizar_estado_entrenamiento(this.id_ent,this.estado).then(
      (datos) =>{
        this.respuesta= datos[0].RESPUESTA;
        if(this.respuesta=='OK'){
          alert('Los cambios se han realizado satisfactoriamente')
        }else{
          if(this.respuesta=='ERROR'){
            alert('Ha ocurrido un error en la actualizacion')
          }else{
            alert('Ha ocurrido un error en la actualizacion')
          }
        }
      //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        alert('error'+JSON.stringify(error));
      })
  }

  continuar_entrenamiento(){
    this.estado=3;
    this.webservices.actualizar_estado_entrenamiento(this.id_ent,this.estado).then(
      (datos) =>{
        this.respuesta= datos[0].RESPUESTA;
        if(this.respuesta=='OK'){
          alert('Los cambios se han realizado satisfactoriamente')
        }else{
          if(this.respuesta=='ERROR'){
            alert('Ha ocurrido un error en la actualizacion')
          }else{
            alert('Ha ocurrido un error en la actualizacion')
          }
        }
      //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        alert('error'+JSON.stringify(error));
      })
  }

  finalizar_entrenamiento(){
    this.estado=1;
    this.webservices.actualizar_estado_entrenamiento(this.id_ent,this.estado).then(
      (datos) =>{
        this.respuesta= datos[0].RESPUESTA;
        if(this.respuesta=='OK'){
          alert('Los cambios se han realizado satisfactoriamente')
        }else{
          if(this.respuesta=='ERROR'){
            alert('Ha ocurrido un error en la actualizacion')
          }else{
            alert('Ha ocurrido un error en la actualizacion')
          }
        }
      //alert('oka'+JSON.stringify(resultado));
      },
      (error) =>{
        alert('error'+JSON.stringify(error));
      })
  }


  detalletiempo(){
    this.tiempo_recuperacion= (this.tiempoRM*60) + this.tiempoRS;
    this.tiempo_entrenamiento=(this.tiempoM*60) + this.tiempoS;
  }

  verificacion(){
    this.webservices.estado_entrenamiento(this.id_ent).then(
      (datos)=>{
        //alert(JSON.stringify(datos));
        this.estado= datos[0].ESTADO;
        if(this.estado==4){// si es 4 es por que está aceptado el entrenamiento
          this.loading.dismiss();
          this.navCtrl.push(CronometroPage, {id:this.id_ent});
          this.a=0;
        } 
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  volver(){
    this.navCtrl.pop();
  }


}
