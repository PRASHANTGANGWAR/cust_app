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
  currentOrderData:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.currentOrderData = this.navParams.get('currentOrder');
    this.currentOrderAddress = this.currentOrderData.address;
    this.orderPackages = this.currentOrderData.order_packages;
  }

  ionViewDidLoad() {

  }

  editOrderPage(){
  	this.navCtrl.setRoot(EditOrderPage, {order_id: this.currentOrderData.id});
  }

  mainMenu(){
  	this.navCtrl.setRoot(CategoriesPage);
  }

}
