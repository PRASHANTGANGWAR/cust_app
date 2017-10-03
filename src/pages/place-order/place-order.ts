import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { MyAddressPage } from '../my-address/my-address';
import { CategoriesPage } from '../categories/categories';
import { Alerts } from '../../providers/alerts-provider';
import { OrderChoicePage } from '../order-choice/order-choice';


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
	public navParams: NavParams){
		this.getAllOrders();
		let data = JSON.parse(window.localStorage.getItem('user_address'));
		this.initDate.setDate(this.initDate.getDate()+1);
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
	  	}else{
	  		this.alerts.presentToast("Please choose correct date");
	  	}
	}

	addAddressPage(){
		this.navCtrl.setRoot(MyAddressPage,{isAddress: true});
	}

	orderChoice(){
		this.ctData.product_id = this.productId;
		this.ctData.deliveryDate = this.initDate.getFullYear()+'-'+("0" + (this.initDate.getMonth() + 1)).slice(-2)+'-'+this.initDate.getDate();
		this.navCtrl.push(OrderChoicePage,{data:this.ctData});
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