import { Component } from '@angular/core';
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
		let data = JSON.parse(window.localStorage.getItem('categories'));
		for(var i=0;i<data.length;i++){
			this.categories.push(data[i].products);
		}
		console.log(this.categories);
		this.alerts.hideLoader();
		this.getProducts();
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
		//this.validation();
		if(this.allOrders.length){
			if(this.validationEditOrder()){
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
				this.alerts.hideLoader();
				this.alerts.presentToast("Please choose atleast one product quantity.");
			}
		}else{
			if(this.validationNewOrder()){
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
			}else{
				this.alerts.hideLoader();
				this.alerts.presentToast("Please choose atleast one product quantity.");
			}
		}
	}

	validationNewOrder(){
		for(var m=0;m<this.products.length;m++){
			for(var n=0;n<this.products[m].weekday.length;n++){
				if(this.products[m].weekday[n].currentNumber != 0 ){
					return true;
				}
			}
		}
	}

	validationEditOrder(){
		for(var p=0;p<this.orderPackages.length;p++){
			for(var q=0;q<this.orderPackages[p].weekdays_qty.length;q++){
				if(this.orderPackages[p].weekdays_qty[q][1] !=0){
					return true;
				}
			}
		}
	}
}