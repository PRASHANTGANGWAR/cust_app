import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Database } from '../../providers/db-provider';
import { LoginPage } from '../login/login';
import { NavController, ToastController } from 'ionic-angular';

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
		private toastCtrl: ToastController) {
		let id = navParams.get('id');
		console.log("this is id" +" "+id);
		this.getProducts(id);

	}


	getProducts(id: any){
		this.dataBase.getProducts(id).then(results =>{
			debugger;
			console.log(results);
			this.products = JSON.parse(results[0].products);
		});	
	}

	additionalData(){
		let user = JSON.parse(window.localStorage.getItem('login_details'));
		let token = user.authentication_token
		if(token){
			//do something
		}
		else{
			this.presentToast();
			this.navCtrl.setRoot(LoginPage);
		}
	}

	presentToast() {
	  this.toastCtrl.create({
	    message: 'Please login first',
	    duration: 2000,
	    position: 'bottom'
	  }).present();
	}
}