import { Component } from '@angular/core';
import { NavController, AlertController , Modal, ModalController, NavParams } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { MyAddressPage } from '../my-address/my-address';
import { CategoriesPage } from '../categories/categories';
import { Alerts } from '../../providers/alerts-provider';
import { OrderChoicePage } from '../order-choice/order-choice';
import { CurrentOrderPage } from '../current-order/current-order';
import { CheckoutModalPage } from '../checkout-modal/checkout-modal';


declare var window: any; 
@Component({
  selector: 'place-order',
  templateUrl: 'place-order.html'
})

export class PlaceOrderPage {
	public address: Array<any>;
 	public initDate: Date = new Date();
 	public showDate: boolean = true;
 	private ctData:any ={};
 	public productId:number;

	constructor(private navCtrl: NavController,
	private _alert: AlertController,
	private confData: ConferenceData,
	public alerts: Alerts,
	public modalCtrl: ModalController,
	public navParams: NavParams){
		this.getAllOrders();
		let data = JSON.parse(window.localStorage.getItem('user_address'));
		if(JSON.parse(window.localStorage.getItem('changed_date'))){
			let abc = JSON.parse(window.localStorage.getItem('changed_date'));
			this.initDate = new Date(abc);
		}else{
			this.initDate.setDate(this.initDate.getDate()+1);
		}
		this.showAddress(data);
		this.productId = this.navParams.get('productId');
	}

	getAllOrders(){
		this.confData.getAllOrders().then((data:any)=>{
			if(data.status == 200){
				this.checkOrder();
			}else{
				this.alerts.presentToast(data.statusText);
			}
		});
	}

	checkOrder(){
		let allOrders = JSON.parse(window.localStorage.getItem('allOrders'));
		if(allOrders.length){
			this.showDate = false;
		}
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
	  		window.localStorage.setItem('changed_date',JSON.stringify(this.initDate));
	  	}else{
	  		this.alerts.presentToast("Please choose correct date");
	  	}
	}

	addAddressPage(){
		this.navCtrl.setRoot(MyAddressPage,{isAddress: true,placeorder:true,productId:this.productId});
	}

	orderChoice(){
		this.ctData.product_id = this.productId;
		this.ctData.deliveryDate = this.initDate.getFullYear()+'-'+("0" + (this.initDate.getMonth() + 1)).slice(-2)+'-'+this.initDate.getDate();
		//check for one time order 
		if(this.productId == 3){
			this.openModal(1);
		}else if(this.productId == 4){
			this.openModal(2);
		}
		else{
			window.localStorage.removeItem('changed_date');
			this.navCtrl.push(OrderChoicePage,{data:this.ctData});
		}
	}

	openModal(value: number) {
  		let order_data:any = {};
  		order_data.choice = "";
  		order_data.value=value;
  		order_data.product_data = this.ctData;
	  	const chekoutModal:Modal = this.modalCtrl.create(CheckoutModalPage,{data: order_data});
	  	chekoutModal.present();

		chekoutModal.onDidDismiss((data)=>{
        if(data){
	   	  this.navCtrl.setRoot(CurrentOrderPage,{currentOrder: data});
        }
		});
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