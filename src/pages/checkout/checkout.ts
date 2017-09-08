import { Component } from '@angular/core';
import { Database } from '../../providers/db-provider';
import { Modal, ModalController, NavController } from 'ionic-angular';
//import { ConferenceData } from '../../providers/conference-data';
import { CheckoutModalPage } from '../checkout-modal/checkout-modal';
import { CurrentOrderPage } from '../current-order/current-order';

@Component({
  selector: 'checkout',
  templateUrl: 'checkout.html'
})

export class CheckoutPage {
	private categories:any =[];
	private products:any =[];
	constructor(
		public dataBase: Database,
		private modalCtrl: ModalController,
		public navCtrl: NavController){
		this.getCategories();
	}

	openModal(index: number) {
	   const chekoutModal:Modal = this.modalCtrl.create(CheckoutModalPage);
	   chekoutModal.present();
	   chekoutModal.onDidDismiss((data)=>{
	   	if(data){
		   	 for(var k=0;k<data.length;k++){
		   	 	this.products[index].weekday[k].currentNumber = data[k].currentNumber;
		   	 }
	   	} else{
	   		console.log("cancel clicked");
	   	}

	   });
	}

	getCategories(){
		this.dataBase.getAllProducts().then(results =>{
			console.log(results);
			for(var i=0;i<results.length;i++){
				this.categories.push(JSON.parse(results[i].products));
				console.log(this.categories);
			}
			this.getProducts();
		});	
	}

	getProducts() {
	    this.categories.forEach((x:any)=> { 
	      x.forEach((y:any) => {
	      	y.weekday = [{"day":"Mon","currentNumber":0}, {"day":"Tue","currentNumber":0}, {"day":"Wed","currentNumber":0}, {"day":"Thu","currentNumber":0}, {"day":"Fri","currentNumber":0}, {"day":"Sat","currentNumber":0}, {"day":"Sun","currentNumber":0}];
	        this.products.push(y);
	        console.log(this.products);
	      })
	    })
	}

	checkout(){
		/*this.confData.newOrder().then(data=>{
			//response of create order api
			console.log(data);
		});*/
		this.navCtrl.setRoot(CurrentOrderPage);
	}


}