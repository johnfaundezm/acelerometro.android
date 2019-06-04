import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopovercoachComponent } from '../../components/popovercoach/popovercoach';


@IonicPage()
@Component({
  selector: 'page-perfilent',
  templateUrl: 'perfilent.html',
})
export class PerfilentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  presentPopovercoach(myEvent) {
    let popover = this.popoverCtrl.create(PopovercoachComponent, {}, {cssClass: 'popover-tamaño'});
    popover.present({
      ev: myEvent
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilentPage');
  }

}
