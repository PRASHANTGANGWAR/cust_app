import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { EditOrderPage } from '../edit-order/edit-order';
import { ConferenceData } from '../../providers/conference-data';
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
    private confData:ConferenceData,
    private alert:Alerts) {
    this.currentOrderData = this.navParams.get('currentOrder');
    this.currentOrderAddress = this.currentOrderData.address;
    this.orderPackages = this.currentOrderData.order_packages;

    // for update items in localstorage @need to modify
    this.alert.showLoader();
    this.confData.getAllOrders().then((data:any)=>{
    if(data.status == 200){
        this.alert.hideLoader();
    } else {
      this.alert.hideLoader();
      this.alert.presentToast(data.statusText);
    }

    })
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
