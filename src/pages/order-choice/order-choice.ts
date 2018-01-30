import { Component } from '@angular/core';
import { NavController,Modal, AlertController, ModalController, NavParams } from 'ionic-angular';
import { CheckoutModalPage } from '../checkout-modal/checkout-modal';
import { Alerts } from '../../providers/alerts-provider';
import { CurrentOrderPage } from '../current-order/current-order';
import { ConferenceData } from '../../providers/conference-data';
import{ MyOrdersPage } from '../my-orders/my-orders';

@Component({
  selector: 'page-order-choice',
  templateUrl: 'order-choice.html',
})
export class OrderChoicePage {
	public order_data:any = {};
  public initDate: Date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);;
  private showCancel:boolean = false;
  private hideDate:boolean = false;// if an recurring oreder is already running

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
    public alerts: Alerts,
  	private modalCtrl: ModalController,
    private confData: ConferenceData,
    private alertCtrl: AlertController) {

    let product_data=this.navParams.get('data');
    this.order_data.product_data = product_data;
    // hide date
    if(product_data.hideDate) {
      this.hideDate = true;
      this.initDate = new Date(this.confData.getOrderDetail(product_data.order_id).delivery_date)
    }

    if(product_data && product_data.deliveryDate ) {
      this.showCancel = true;
      this.initDate = new Date(product_data.deliveryDate);
    }
  }


  openModal(choice:string) {
  		this.order_data.choice = choice;
      this.order_data.deliveryDate = this.initDate;
	  	const chekoutModal:Modal = this.modalCtrl.create(CheckoutModalPage,{data:this.order_data});
	  	chekoutModal.present();
  		chekoutModal.onDidDismiss((data)=>{
          if(data){
  		   	  this.navCtrl.setRoot(CurrentOrderPage,{currentOrder: data});
          }
  		});
  }


  setDate(date: Date) {
    let today = new Date();
    today.setDate(today.getDate());
    if(this.order_data.product_data.end_date){
      let endDate = new Date(this.order_data.product_data.end_date);
      if((endDate.getTime() >= date.getTime()) && (date.getTime() >= today.getTime())){
        this.order_data.deliveryDate = date;
        this.initDate = date;
      } else {
        this.alerts.presentToast("Please choose correct date");
      }
    } else {
      if(date.getTime() >= today.getTime()){
        this.initDate = date;
        window.localStorage.setItem('changed_date',JSON.stringify(this.initDate));
        this.order_data.deliveryDate = this.initDate;
      }else{
        this.alerts.presentToast("Please choose correct date");
      }
    }
  }

  cancelOrder() {
    let alert = this.alertCtrl.create({
      title: 'Cancel Order',
      message: "Are you sure you want to cancel this package?",
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
            this.confData.cancelPackage(this.order_data.product_data.packageId).then((res:any)=>{
              this.alerts.hideLoader();
              if(res.status == 204) {
                this.navCtrl.setRoot(MyOrdersPage);
                this.alerts.presentToast("Package cancelled succesfully");
              } else if(res.status == 422) {
                this.alerts.presentToast(JSON.parse(res._body).error_msg);
              }
                else{
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
