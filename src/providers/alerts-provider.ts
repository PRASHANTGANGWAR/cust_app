import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';

@Injectable()
export class Alerts {
	private loading:any;
	constructor(
		private toastCtrl: ToastController,
		private _loading: LoadingController,
		private _alert: AlertController
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

	doAlert(type: string,message: string) {
	    let alert = this._alert.create({
	      title: type,
	      subTitle: message,
	      buttons: ['OK']
	    });
	    alert.present();
  	}
}
