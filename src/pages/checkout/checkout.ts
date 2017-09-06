import { Component } from '@angular/core';
import { Database } from '../../providers/db-provider';
import { Modal, ModalController } from 'ionic-angular';
import { CheckoutModalPage } from '../checkout-modal/checkout-modal';

@Component({
  selector: 'checkout',
  templateUrl: 'checkout.html'
})

export class CheckoutPage {
	private categories:any =[];
	constructor(public dataBase: Database, private modalCtrl: ModalController){
	}

	openModal() {
	   const chekoutModal:Modal = this.modalCtrl.create(CheckoutModalPage);
	   chekoutModal.present();
	}

}