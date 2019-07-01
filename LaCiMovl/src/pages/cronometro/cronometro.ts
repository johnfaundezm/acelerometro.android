import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CronometroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cronometro',
  templateUrl: 'cronometro.html',
})
export class CronometroPage {

  public tipo_entrenamiento: String;
  public tiempo_entrenamiento: number;
  public unidad_entrenamiento: number;

  public aceleracion : number;
  public potencia: number;
  public fuerza: number;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CronometroPage');
  }

  segEntrenamiento(){
    alert('Ha definido su tiempo de entrenamiento en segundos');
    this.tiempo_entrenamiento=this.unidad_entrenamiento;
  }
  minEntrenamiento(){
    this.tiempo_entrenamiento= this.unidad_entrenamiento*60;
    alert('Ha definido su tiempo de entrenamiento en minutos');
  }
  enviar_entrenamiento(){
    
    alert('Se envió un nuevo entrenamiento');
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
  