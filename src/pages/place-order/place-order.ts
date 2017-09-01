import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { MyAddressPage } from '../my-address/my-address';

declare var window: any; 
@Component({
  selector: 'place-order',
  templateUrl: 'place-order.html'
})

export class PlaceOrderPage {
	public address: Array<any>;
 	public initDate: Date = new Date();
	constructor(private navCtrl: NavController, private _alert: AlertController){
		this.showAddress();
	}

	showAddress(){
		let data = JSON.parse(window.localStorage.getItem('user_address'));
		if(!data){
				this.presentConfirm();
			}
			else{
				this.address = data.addresses[0];
			}
	}

	setDate(date: Date) {
	    console.log(date);
	    this.initDate = date;
	}

	addAddressPage(){
		//this.navCtrl.setRoot(MyAddressPage);
	}

	presentConfirm() {
	    let alert = this._alert.create({
	      message: 'Please add one address.',
	      buttons: [
	        {
	          text: 'CANCEL',
	          role: 'cancel',
	          handler: () => {
	            console.log('Cancel clicked');
	          }
	        },
	        {
	          text: 'ADD',
	          handler: () => {
	            this.navCtrl.setRoot(MyAddressPage);
	          }
	        }
	      ]
	    });
	    alert.present();
	}
}