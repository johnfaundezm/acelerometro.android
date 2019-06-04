import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { WebservicesProvider } from '../../providers/webservices/webservices';
import { AdminDeportistaPage } from '../admin-deportista/admin-deportista';
import { PoadmindepComponent } from '../../components/poadmindep/poadmindep';

@IonicPage()
@Component({
  selector: 'page-deportistas',
  templateUrl: 'deportistas.html',
})
export class DeportistasPage {

  deportista: Array<{email:string}>=[{email:''}];

  constructor(public navCtrl: NavController, public navParams: NavParams, private webservices: WebservicesProvider, public popoverCtrl: PopoverController) {
    
  }

  Poadmindep(myEvent) {
    let popover = this.popoverCtrl.create(PoadmindepComponent, {}, {cssClass: 'popover-tamaño'});
    popover.present({
      ev: myEvent
    })
  }

  ionViewDidLoad() {
    while(this.deportista.length>0){
      this.deportista.pop();
    }
    this.vista_deportista();
  }

  vista_deportista(){
    this.webservices.vista_deportista().then(
      (datos) =>{
        let largo=Object.keys(datos).length;
        for(var i=0;i<largo;i++){
          var email= datos[i].CORREO;

          this.deportista.push({"email":email});
        }
      },
      (err)=>{
        alert(JSON.stringify(err))
      })
  }

  detalle2(email){
    this.navCtrl.push(AdminDeportistaPage, {correo:email});
  }

}
