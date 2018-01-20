import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
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
    private alertCtrl:AlertController,
    private alerts: Alerts) {

 
    this.alerts.showLoader();
    let order_id = this.navParams.get('order_id');
    if(order_id) {
      this.order = this.confData.getOrderDetail(order_id);      
    } else {
      this.back();
    }
    this.alerts.hideLoader();

  }

  ionViewDidLoad() {}

  nonAvialability(id:number){this.navCtrl.push(SetNonavailabilityPage,{id: id});}
  back() { this.navCtrl.setRoot(MyOrdersPage);}

  editOrderDuration(id:number) {
    this.alerts.showLoader();
    this.navCtrl.push(EditOrderDurationPage,{id: id});
    this.alerts.hideLoader();
  }

  orderChoice(pkg:any) {
    let editData:any={};
    editData.product_id= pkg.product_id;
    editData.deliveryDate = this.order.delivery_date;
    this.navCtrl.push(OrderChoicePage,{data:editData});
  }

  cancelOrder(id:number) {
    let alert = this.alertCtrl.create({
      title: 'Cancel Order',
      message: "Are you sure you want to cancel the order?",
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'CONFIRM',
          handler: () => {
            this.alerts.showLoader();
            this.confData.cancelOrder(id).then((res:any)=>{
              this.alerts.hideLoader();
              if(res.status == 204){
                this.navCtrl.setRoot(EditOrderPage);
                this.alerts.presentToast("Order cancelled succesfully");
              }else{
                this.alerts.presentToast(res.statusText);
              }
            });
          }
        }
      ]
    });
    alert.present();
  }

}