import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';

@Injectable()
export class Alerts {
	private loading:any;
	constructor(
		private toastCtrl: ToastController,
		private _loading: LoadingController,
	) {}

	presentToast(msg: any) {
	    this.toastCtrl.create({
	      message: msg,
	      duration: 2000,
	      position: 'bottom'
	    }).present();
	}

	showLoader(){
	    this.loading = this._loading.create({
	      content: 'Please wait...',
	    });
	    this.loading.present();
	}

	hideLoader(){
	    this.loading.dismiss();
	}
}
