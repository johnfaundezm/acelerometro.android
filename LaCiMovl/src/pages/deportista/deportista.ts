import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the DeportistaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deportista',
  templateUrl: 'deportista.html',
})
export class DeportistaPage {

  ListUser : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, private database: DatabaseProvider ) {
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeportistaPage');
  }

  GetAllUsers(){
    this.database.GetAllUsers().then((data: any) =>{
      console.log(data);
      this.ListUser = data;
    }, (error) =>{
      console.log(error);
    })
  }

}
