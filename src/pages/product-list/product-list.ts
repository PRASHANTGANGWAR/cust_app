import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Database } from '../../providers/db-provider';
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
		public dataBase: Database,
		private navCtrl: NavController,
		private alerts: Alerts) {
		let id = navParams.get('id');
		console.log("this is id" +" "+id);
		this.getProducts(id);

	}


	getProducts(id: any){
		this.alerts.showLoader();
		this.dataBase.getProducts(id).then(results =>{
			this.alerts.hideLoader();
			console.log(results);
			this.products = JSON.parse(results[0].products);
		});	
	}

	additionalData(){
		let user = JSON.parse(window.localStorage.getItem('login_details'));
		if(user){
			this.navCtrl.setRoot(PlaceOrderPage);
		}
		else{
			this.alerts.showLoader();
			this.alerts.presentToast('Please login first');
			this.navCtrl.push(LoginPage);
			this.alerts.hideLoader();
		}
	}
}