import { Component } from '@angular/core';
import { NavController, Modal, ModalController, NavParams } from 'ionic-angular';
import { CheckoutModalPage } from '../checkout-modal/checkout-modal';

@Component({
  selector: 'page-order-choice',
  templateUrl: 'order-choice.html',
})
export class OrderChoicePage {

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
  	let product_id=this.navParams.get('data');
    console.log('ionViewDidLoad OrderChoicePage'+product_id);
  }

  openModal(choice:string) {
  	console.log(choice);
	  	const chekoutModal:Modal = this.modalCtrl.create(CheckoutModalPage,{data:choice});
	  	chekoutModal.present();
		chekoutModal.onDidDismiss((data)=>{
		   	console.log(data);
		});
  }

}
