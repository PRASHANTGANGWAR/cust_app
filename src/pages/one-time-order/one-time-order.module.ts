import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyOrdersPage } from '../my-orders/my-orders';
import { Alerts } from '../../providers/alerts-provider';
import { ConferenceData } from '../../providers/conference-data';

// import { Events } from 'ionic-angular';


@Component({
  selector: 'one-time-order',
  templateUrl: 'one-time-order.html',
})


export class OneTimeOrderPage {

	oneTimeOreder:any = {};
	showCancel:boolean = false;

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private alert: Alerts,
		private confData: ConferenceData
		) {
			this.alert.showLoader();
			this.oneTimeOreder = this.navParams.get('order');
			if(this.oneTimeOreder && this.oneTimeOreder.id){
				let today = new Date();
				let deldate = new Date(this.oneTimeOreder.delivery_date);
				if(today.getTime() < deldate.getTime()){
					this.showCancel = true;
				}	
			} else {
				this.navCtrl.setRoot(MyOrdersPage);	
			}
			this.alert.hideLoader();
		}

	back() {
		this.navCtrl.setRoot(MyOrdersPage);
	}

	cancelOrder() {
		this.alert.showLoader();
		this.confData.cancelOrder().then((res:any)=> {
              this.alert.hideLoader();
              if(res.status == 204){
                this.navCtrl.setRoot(MyOrdersPage);
                this.alert.presentToast("Order cancelled succesfully");
              }else{
                this.alert.presentToast(res.statusText);
              }
            });
	}
}
