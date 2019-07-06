import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Nav } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-entrenadortabs',
  templateUrl: 'entrenadortabs.html'
})
export class EntrenadortabsPage {

  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;

  perfilentRoot = 'PerfilentPage'
  deportistasentRoot = 'DeportistasentPage'

  parametros = {
    correo: ''
  }
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public loadingCtrl: LoadingController) {
    this.parametros.correo = this.navParams.get('correo')

    this.pages = [
      //{ title: 'Salir', component: HomePage },
      //{ title: 'Cronometro', component: CronometroPage },
      //{ title: 'Cronometroent', component: CronometroentPage }
    ];
  }

  ionViewCanEnter() {
    this.menuCtrl.enable(true, 'Menu');
  }

  ionViewDidEnter(){
    this.loading.dismiss();
  }

  metodosalir(){
    this.nav.popToRoot();
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

}
