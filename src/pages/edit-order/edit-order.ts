import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { SetNonavailabilityPage } from '../set-nonavailability/set-nonavailability';
import{ EditDailyOrderPage } from '../edit-daily-order/edit-daily-order';
import { EditOrderDurationPage } from '../edit-order-duration/edit-order-duration';
import { Alerts } from '../../providers/alerts-provider';

declare var window:any;
@Component({
  selector: 'page-edit-order',
  templateUrl: 'edit-order.html',
})
export class EditOrderPage {
  private hasOrders:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private confData: ConferenceData,
    private alerts: Alerts) {
    this.getAllOrders();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditOrderPage');
  }

  getAllOrders(){
    this.alerts.showLoader();
    this.confData.getAllOrders().then((data:any)=>{
      if(data.status == 200){
       let allOrders = JSON.parse(window.localStorage.getItem('allOrders'));
       if(allOrders.length){
        this.hasOrders = true;
       }
     }else{
      this.alerts.presentToast(data.statusText);
     }
    });
    this.alerts.hideLoader();
  }

  nonAvialability(){
  	this.navCtrl.push(SetNonavailabilityPage);
  }

  editDailyOrder(){
    this.alerts.showLoader();
    this.navCtrl.push(EditDailyOrderPage);
    this.alerts.hideLoader();
  }

  editOrderDuration(){
    this.alerts.showLoader();
    this.navCtrl.push(EditOrderDurationPage);
    this.alerts.hideLoader();
  }

}
