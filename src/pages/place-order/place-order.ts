import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { MyAddressPage } from '../my-address/my-address';

declare var window: any; 
@Component({
  selector: 'place-order',
  templateUrl: 'place-order.html'
})

export class PlaceOrderPage {
	public address: Array<any>;
 	public initDate: Date = new Date();
	constructor(private navCtrl: NavController){
		this.showAddress();
	}

	showAddress(){
		let user = JSON.parse(window.localStorage.getItem('user_address'));
		if (user.addresses.length == 0){
			alert("add address");
		}
		else{
			this.address = user.addresses[0];
		}
	}

	setDate(date: Date) {
	    console.log(date);
	    this.initDate = date;
	}

	addAddressPage(){
		this.navCtrl.setRoot(MyAddressPage);
	}
}