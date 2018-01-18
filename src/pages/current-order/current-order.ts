import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { EditOrderPage } from '../edit-order/edit-order';

@Component({
  selector: 'page-current-order',
  templateUrl: 'current-order.html',
})
export class CurrentOrderPage {
  private orderPackages:any;
  private currentOrderAddress:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let currentOrderData = this.navParams.get('currentOrder');
    this.currentOrderAddress = currentOrderData.address;
    this.orderPackages = currentOrderData.order_packages;
  }

  ionViewDidLoad() {

  }

  editOrderPage(){
  	this.navCtrl.setRoot(EditOrderPage);
  }

  mainMenu(){
  	this.navCtrl.setRoot(CategoriesPage);
  }

}
