import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { MyAddressPage } from '../my-address/my-address';
import { CategoriesPage } from '../categories/categories';
import { CheckoutPage } from '../checkout/checkout';
import { Alerts } from '../../providers/alerts-provider';


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
	private confData: ConferenceData,
	public alerts: Alerts){
		let data = JSON.parse(window.localStorage.getItem('user_address'));
		this.initDate.setDate(this.initDate.getDate()+1);
		this.showAddress(data);
		this.getAllOrders();
	}

	getAllOrders(){
		this.confData.getAllOrders().then((data:any)=>{
			if(data.status == 200){
				//do nothing
			}else{
				this.alerts.presentToast(data.statusText);
			}
		});
	}

	showAddress(data: any){
		this.alerts.showLoader();
		if(data.addresses.length == 0){
				this.alerts.hideLoader();
				this.presentConfirm();
			}
			else{
				this.alerts.hideLoader();
				this.address = data.addresses[0];
			}
	}

	setDate(date: Date) {
	    let today = new Date();
	  	today.setDate(today.getDate());
	  	if(date.getTime() >= today.getTime()){
	  		this.initDate = date;
	  	}else{
	  		this.alerts.presentToast("Please choose correct date");
	  	}
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