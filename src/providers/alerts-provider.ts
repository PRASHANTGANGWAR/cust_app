import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class Alerts {
	constructor(
		private toastCtrl: ToastController
	) {}

	presentToast(msg: any) {
	    this.toastCtrl.create({
	      message: msg,
	      duration: 2000,
	      position: 'bottom'
	    }).present();
	}
}
