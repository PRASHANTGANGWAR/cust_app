import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { MyAddressPage } from '../my-address/my-address';
import { CategoriesPage } from '../categories/categories';

declare var window: any; 
@Component({
  selector: 'view-address',
  templateUrl: 'view-address.html'
})

export class ViewAddressPage {
	public address: Array<any>;
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
	            this.navCtrl.setRoot(CategoriesPage);
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