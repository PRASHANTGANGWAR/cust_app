import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { MyAddressPage } from '../my-address/my-address';
import { PrescriptionListPage } from '../prescription-list/prescription-list';

declare var window: any; 
@Component({
  selector: 'place-order',
  templateUrl: 'place-order.html'
})

export class PlaceOrderPage {
	public address: Array<any>;
 	public initDate: Date = new Date();
	constructor(private navCtrl: NavController, private _alert: AlertController){
		let data = JSON.parse(window.localStorage.getItem('user_address'));
		this.showAddress(data);
	}

	showAddress(data: any){
		if(data.addresses.length == 0){
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
		this.navCtrl.setRoot(MyAddressPage,{isAddress: true});
	}

	presentConfirm() {
	    let alert = this._alert.create({
	      message: 'Please add one address.',
	      buttons: [
	        {
	          text: 'CANCEL',
	          handler: () => {
	            this.navCtrl.setRoot(PrescriptionListPage);
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