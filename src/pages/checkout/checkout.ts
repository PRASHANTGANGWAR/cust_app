import { Component } from '@angular/core';
import { Database } from '../../providers/db-provider';
import { Modal, ModalController, NavController, NavParams } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { CheckoutModalPage } from '../checkout-modal/checkout-modal';
import { CurrentOrderPage } from '../current-order/current-order';
import { Alerts } from '../../providers/alerts-provider';

declare var window:any;
@Component({
  selector: 'checkout',
  templateUrl: 'checkout.html'
})

export class CheckoutPage {
	private categories:any =[];
	private products:any =[];
	private deliveryDate:any;
	private orderPackages:any =[];
	private allOrders:any;
	constructor(
		public dataBase: Database,
		private modalCtrl: ModalController,
		public navCtrl: NavController,
		private confData: ConferenceData,
		public navParams: NavParams,
		public alerts: Alerts){
		this.allOrders = JSON.parse(window.localStorage.getItem("allOrders"));
		if(this.allOrders.length){
			this.alerts.showLoader();
			this.orderPackages = this.allOrders[0].order_packages
			this.alerts.hideLoader();
		}else{
			this.getCategories();
		}
		let selectedDate = this.navParams.get('deliveryDate');
		this.deliveryDate = selectedDate.getFullYear()+'-'+("0" + (selectedDate.getMonth() + 1)).slice(-2)+'-'+selectedDate.getDate();
	}

	openModal(index: number) {
	   //this.indx = index;
	   const chekoutModal:Modal = this.modalCtrl.create(CheckoutModalPage);
	   chekoutModal.present();
	   chekoutModal.onDidDismiss((data)=>{
	   	if(data){
	   		if(this.allOrders.length){
	   			for(var k=0;k<data.length;k++){
			   	 	this.orderPackages[index].weekdays_qty[k][1] = data[k].currentNumber;
			   	 }
	   		}else{
			   	 for(var l=0;l<data.length;l++){
			   	 	this.products[index].weekday[l].currentNumber = data[l].currentNumber;
			   	 }
		   	}
	   	} else{
	   		console.log("cancel clicked");
	   	}

	   });
	}

	getCategories(){
		this.alerts.showLoader();
		this.dataBase.getAllProducts().then(results =>{
			console.log(results);
			for(var i=0;i<results.length;i++){
				this.categories.push(JSON.parse(results[i].products));
				console.log(this.categories);
			}
			this.alerts.hideLoader();
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
		this.alerts.showLoader();
		if(this.allOrders.length){
			let order:any={"order_packages_attributes":{}};
			order.alter_from = "";
			order.delivery_date = this.deliveryDate;
			order.isNew = "1";
			for(var i=0;i<this.orderPackages.length;i++){
				order["order_packages_attributes"][i] = {};
				order["order_packages_attributes"][i]["default _qty"] = "3";
				order["order_packages_attributes"][i]["friday"] = this.orderPackages[i].weekdays_qty[4][1];
				order["order_packages_attributes"][i]["id"] = this.orderPackages[i].id;
				order["order_packages_attributes"][i]["monday"] = this.orderPackages[i].weekdays_qty[0][1];
				order["order_packages_attributes"][i]["package_type"] = "6";
				order["order_packages_attributes"][i]["product_id"] = this.orderPackages[i].product_id;
				order["order_packages_attributes"][i]["saturday"] = this.orderPackages[i].weekdays_qty[5][1];
				order["order_packages_attributes"][i]["sunday"] = this.orderPackages[i].weekdays_qty[6][1];
				order["order_packages_attributes"][i]["thursday"] = this.orderPackages[i].weekdays_qty[3][1];
				order["order_packages_attributes"][i]["time_slot_id"] = "5";
				order["order_packages_attributes"][i]["tuesday"] = this.orderPackages[i].weekdays_qty[1][1];
				order["order_packages_attributes"][i]["wednesday"] = this.orderPackages[i].weekdays_qty[2][1];
			}

			order.pickup = "false";
	        order.recurring = "true";
	        order.order_id = this.allOrders[0].id;
	        console.log(order);
			this.confData.updateOrder(order).then((data:any)=>{
				this.alerts.hideLoader();
				if (data.status == 200){
					this.navCtrl.setRoot(CurrentOrderPage,{currentOrder: data.json()});
				}else{
					this.alerts.presentToast(data.statusText);
				}
			});
		}else{
			let order:any={"order_packages_attributes":{}};
			order.alter_from = "this.deliveryDate";
			order.delivery_date = this.deliveryDate;
			order.isNew = "1";
			for(var j=0;j<this.products.length;j++){
				order["order_packages_attributes"][j] = {};
				order["order_packages_attributes"][j]["default _qty"] = "3";
				order["order_packages_attributes"][j]["friday"] = this.products[j].weekday[4].currentNumber;
				order["order_packages_attributes"][j]["monday"] = this.products[j].weekday[0].currentNumber;
				order["order_packages_attributes"][j]["package_type"] = "6";
				order["order_packages_attributes"][j]["product_id"] = this.products[j].id;
				order["order_packages_attributes"][j]["saturday"] = this.products[j].weekday[5].currentNumber;
				order["order_packages_attributes"][j]["sunday"] = this.products[j].weekday[6].currentNumber;
				order["order_packages_attributes"][j]["thursday"] = this.products[j].weekday[3].currentNumber;
				order["order_packages_attributes"][j]["time_slot_id"] = "5";
				order["order_packages_attributes"][j]["tuesday"] = this.products[j].weekday[1].currentNumber;
				order["order_packages_attributes"][j]["wednesday"] = this.products[j].weekday[2].currentNumber;
			}

			order.pickup = "false";
	        order.recurring = "true";
	        console.log(order);
			this.confData.newOrder(order).then((data:any)=>{
				this.alerts.hideLoader();
				if (data.status == 201){
					this.navCtrl.setRoot(CurrentOrderPage,{currentOrder: data.json()});
				}else{
					this.alerts.presentToast(data.statusText);
				}
			});
		}
	}
}