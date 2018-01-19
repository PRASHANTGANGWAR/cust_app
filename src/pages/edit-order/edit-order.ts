import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { SetNonavailabilityPage } from '../set-nonavailability/set-nonavailability';
import{ MyOrdersPage } from '../my-orders/my-orders';
import { EditOrderDurationPage } from '../edit-order-duration/edit-order-duration';
import { Alerts } from '../../providers/alerts-provider';
import { OrderChoicePage } from '../order-choice/order-choice';

@Component({
  selector: 'page-edit-order',
  templateUrl: 'edit-order.html',
})
export class EditOrderPage {
  order:any = []; //order details
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private confData: ConferenceData,
    private alerts: Alerts) {

 
    this.alerts.showLoader();
    let order_id = this.navParams.get('order_id') != null ? this.navParams.get('order_id') : 0;
    this.order = this.confData.getOrderDetail(order_id);
    this.alerts.hideLoader();

  }

  ionViewDidLoad() {}

  nonAvialability(){this.navCtrl.push(SetNonavailabilityPage);}
  back() { this.navCtrl.setRoot(MyOrdersPage);}

  editOrderDuration(){
    this.alerts.showLoader();
    this.navCtrl.push(EditOrderDurationPage);
    this.alerts.hideLoader();
  }

  orderChoice(pkg:any){
    let editData:any={};
    editData.product_id= pkg.product_id;
    editData.deliveryDate = this.order.delivery_date;
    this.navCtrl.push(OrderChoicePage,{data:editData});

     }

}