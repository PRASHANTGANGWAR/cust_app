import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Alerts } from '../../providers/alerts-provider';
import { ConferenceData } from '../../providers/conference-data';
import { EditOrderPage } from '../edit-order/edit-order';

declare var window:any;
@Component({
  selector: 'my-orders',
  templateUrl: 'my-orders.html',
})
export class MyOrdersPage {
	private allOrders:any;
	private allOrderPackages:any = [];
  private hasOrders:boolean = false;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public modalCtrl: ModalController,
  	public alerts: Alerts,
    public confData: ConferenceData,
    public alertCtrl: AlertController
  	) {

    this.alerts.showLoader();
    this.confData.getAllOrders().then((data:any)=>{
    if(data.status == 200){
        this.allOrders = JSON.parse(window.localStorage.getItem("allOrders"));
        let self = this;
        if(self.allOrders.length > 0) {
          self.hasOrders = true;
        }
        self.allOrders.forEach(function(order:any) {
          self.allOrderPackages.push(order);
        });
        this.alerts.hideLoader();
    } else {
      this.alerts.hideLoader();
      this.alerts.presentToast(data.statusText);
     }
    });  	
  }

  orderChoice(order:any) {
      this.navCtrl.setRoot(EditOrderPage, {order_id: order.id});
  }

}
