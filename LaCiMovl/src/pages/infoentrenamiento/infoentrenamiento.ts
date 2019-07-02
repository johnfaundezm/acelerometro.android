import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';


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

  public tipo_entrenamiento: String;
  public tiempo_entrenamiento: number;
  public unidad_entrenamiento: number;
  
  public tiempo_recuperacion :number;
  public unidad_recuperacion : number;

  ide:any;
  formattedDate;

  respuesta:any;
  loading:any;

  //valores iniciales para el tiempo de entrenamiento
  tiempoM: any= 0;
  tiempoS: any= 0;
  tiempoRM: any= 0;
  tiempoRS: any= 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider,
    public loadingCtrl: LoadingController) {
    this.ide = this.navParams.get('ide');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoentrenamientoPage');
  }

  loadregistrar() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Cargando...',
      dismissOnPageChange: true
    });
  
    this.loading.present();
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

  enviar_entrenamiento(){
    this.getFormattedDate();
    this.webservices.insertar_entrenamiento(this.ide,this.tiempo_entrenamiento,this.tiempo_recuperacion,this.formattedDate,this.tipo_entrenamiento).then(
      (datos) =>{
        this.respuesta= datos[0].RESPUESTA;
        if(this.respuesta=='OK'){
          alert('El entrenamiento se ha creado satisfactoriamente');
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
  
  pausa_entrenamiento(){
    
    alert('Se envió mensaje de pausa de entremiento');
  }

  continuar_entrenamiento(){
    
    alert('Se envió mensaje para continuar entrenamiento');
  }
  finalizar_entrenamiento(){
    
    alert('Se envió mensaje de finalización de entrenamiento');
  }
}
