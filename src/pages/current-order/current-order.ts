import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { EditOrderPage } from '../edit-order/edit-order';
import { Alerts } from '../../providers/alerts-provider';

@Component({
  selector: 'page-current-order',
  templateUrl: 'current-order.html',
})
export class CurrentOrderPage {
  private orderPackages:any;
  private currentOrderAddress:any;
  currentOrderData:any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alert:Alerts) {

    this.alert.showLoader();
    this.currentOrderData = this.navParams.get('currentOrder');
    this.currentOrderAddress = this.currentOrderData.address;
    this.orderPackages = this.currentOrderData.order_packages;
    this.alert.hideLoader();
  }

  ionViewDidLoad() {

  }

  editOrderPage(){
    let id = this.currentOrderData.id;
    if(this.currentOrderData.parent_order_id){
      id = this.currentOrderData.parent_order_id;
    }
  	this.navCtrl.setRoot(EditOrderPage, {order_id: id });
  }

  mainMenu(){
  	this.navCtrl.setRoot(CategoriesPage);
  }

}
