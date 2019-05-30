import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';


@IonicPage()
@Component({
  selector: 'page-perfildep',
  templateUrl: 'perfildep.html',
})
export class PerfildepPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  presentPopover(myEvent) {
    //this.navCtrl.push(PopoverComponent, {correo:this.correo});
    let popover = this.popoverCtrl.create(PopoverComponent, {}, {cssClass: 'popover-tamaño'});
    popover.present({
      ev: myEvent
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfildepPage');
  }

}
