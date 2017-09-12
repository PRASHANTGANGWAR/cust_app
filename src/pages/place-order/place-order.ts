import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { MyAddressPage } from '../my-address/my-address';
import { CategoriesPage } from '../categories/categories';
import { CheckoutPage } from '../checkout/checkout';


declare var window: any; 
@Component({
  selector: 'place-order',
  templateUrl: 'place-order.html'
})

export class PlaceOrderPage {
	public address: Array<any>;
 	public initDate: Date = new Date();
	constructor(private navCtrl: NavController,
	private _alert: AlertController,
	private confData: ConferenceData){
		let data = JSON.parse(window.localStorage.getItem('user_address'));
		this.showAddress(data);
		this.getAllOrders();
	}

	getAllOrders(){
		this.confData.getAllOrders().then((data)=>{
			console.log(data);
		});
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

	checkoutPage(){
		this.navCtrl.setRoot(CheckoutPage,{deliveryDate: this.initDate});
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