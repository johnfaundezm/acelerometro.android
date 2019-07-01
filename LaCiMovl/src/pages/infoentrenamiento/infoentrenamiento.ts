import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoentrenamientoPage');
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
