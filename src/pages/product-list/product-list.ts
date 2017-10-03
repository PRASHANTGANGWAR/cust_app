import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { PlaceOrderPage } from '../place-order/place-order';
import { NavController } from 'ionic-angular';
import { Alerts } from '../../providers/alerts-provider';


declare var window: any; 
@Component({
  selector: 'product-list',
  templateUrl: 'product-list.html'
})

export class ProductListPage {
	public products: Array<any>; 

	constructor(
		public navParams: NavParams,
		private navCtrl: NavController,
		private alerts: Alerts) {
		let id = navParams.get('id');
		this.getProducts(id);

	}


	getProducts(id: any){
		this.alerts.showLoader();
		let categories = JSON.parse(window.localStorage.getItem('categories'));
		this.products = categories[id].products;
		this.alerts.hideLoader();
	}

	additionalData(product_id:number){
		let user = JSON.parse(window.localStorage.getItem('login_details'));
		console.log(product_id);
		if(user){
			this.navCtrl.push(PlaceOrderPage, { productId:product_id });
		}
		else{
			this.alerts.showLoader();
			this.alerts.presentToast('Please login first');
			this.navCtrl.push(LoginPage);
			this.alerts.hideLoader();
		}
	}
}