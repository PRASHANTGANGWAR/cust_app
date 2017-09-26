import { Component } from '@angular/core';
import { ViewController,NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
 import { CategoriesPage } from '../categories/categories';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class Splash {
 
  constructor(public viewCtrl: ViewController, public splashScreen: SplashScreen, public navCtrl : NavController) {
 
  }
 
  ionViewDidEnter() {
 
    this.splashScreen.hide();
 
    setTimeout(() => {
      this.viewCtrl.dismiss();
      this.navCtrl.setRoot(CategoriesPage);
    }, 4000);
 
  }
 
}