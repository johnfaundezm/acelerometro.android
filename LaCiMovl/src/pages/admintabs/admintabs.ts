import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, MenuController, Nav } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-admintabs',
  templateUrl: 'admintabs.html'
})
export class AdmintabsPage {

  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;

  deportistasRoot = 'DeportistasPage'
  entrenadoresRoot = 'EntrenadoresPage'
  estadisticasRoot = 'EstadisticasPage'


  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
    this.pages = [
      //{ title: 'Salir', component: HomePage },
      //{ title: 'Cronometro', component: CronometroPage },
      //{ title: 'Cronometroent', component: CronometroentPage }
    ];
  }

  ionViewCanEnter() {
    this.menuCtrl.enable(true, 'Menu');
  }

  metodosalir(){
    this.nav.popToRoot();
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
  
}
