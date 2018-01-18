import { Component } from '@angular/core';
import { NavController, Modal, ModalController, NavParams } from 'ionic-angular';
import { CheckoutModalPage } from '../checkout-modal/checkout-modal';
import { CurrentOrderPage } from '../current-order/current-order';

@Component({
  selector: 'page-order-choice',
  templateUrl: 'order-choice.html',
})
export class OrderChoicePage {
	public order_data:any = {};

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
  	let product_data=this.navParams.get('data');
    console.log('ionViewDidLoad OrderChoicePage');
    this.order_data.product_data = product_data;
  }

  openModal(choice:string) {
  	console.log(choice);
  		this.order_data.choice = choice;
	  	const chekoutModal:Modal = this.modalCtrl.create(CheckoutModalPage,{data:this.order_data});
	  	chekoutModal.present();
		chekoutModal.onDidDismiss((data)=>{
        if(data){
		   	  this.navCtrl.setRoot(CurrentOrderPage,{currentOrder: data});
        }
		});
  }

}
