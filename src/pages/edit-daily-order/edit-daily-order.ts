import { Component } from '@angular/core';
import { NavController, NavParams, Modal, ModalController, AlertController, ToastController } from 'ionic-angular';
import { CheckoutModalPage } from '../checkout-modal/checkout-modal';
import { Alerts } from '../../providers/alerts-provider';
import { ConferenceData } from '../../providers/conference-data';
import { EditOrderPage } from '../edit-order/edit-order';

declare var window:any;
@Component({
  selector: 'page-edit-daily-order',
  templateUrl: 'edit-daily-order.html',
})
export class EditDailyOrderPage {
	private initDate:Date = new Date();
	private allOrders:any;
	private orderPackages:any;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public modalCtrl: ModalController,
  	public toastCtrl: ToastController,
  	public alerts: Alerts,
    public confData: ConferenceData,
    public alertCtrl: AlertController
  	) {
  	this.initDate.setDate(this.initDate.getDate()+1);
  	this.allOrders = JSON.parse(window.localStorage.getItem("allOrders"));
  	this.orderPackages = this.allOrders[0].order_packages;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDailyOrderPage');
  }

  setDate(date:Date){
  	let today = new Date();
  	today.setDate(today.getDate()+1);
  	if(date.getDate() >= today.getDate()){
  		this.initDate = date;
  	}else{
  		this.alerts.presentToast("Please choose correct date");
  	}
  }

	openModal(index: number) {
	   const chekoutModal:Modal = this.modalCtrl.create(CheckoutModalPage);
	   chekoutModal.present();
	   chekoutModal.onDidDismiss((data)=>{
	   	if(data){
	   		for(var i=0;i<data.length;i++){
			   	this.orderPackages[index].weekdays_qty[i][1] = data[i].currentNumber;
			}
	   	} else{
	   		console.log("cancel clicked");
	   	}
	   });
	}

	updateOrder(){
    let order:any={"order_packages_attributes":{}};
     let alterFrom = this.initDate.getFullYear()+'-'+("0" + (this.initDate.getMonth() + 1)).slice(-2)+'-'+this.initDate.getDate();
      order.alter_from = alterFrom;
      order.delivery_date = alterFrom;
      order.isNew = "1";
      for(var i=0;i<this.orderPackages.length;i++){
        order["order_packages_attributes"][i] = {};
        order["order_packages_attributes"][i]["default _qty"] = "3";
        order["order_packages_attributes"][i]["friday"] = this.orderPackages[i].weekdays_qty[4][1];
        order["order_packages_attributes"][i]["id"] = this.orderPackages[i].id;
        order["order_packages_attributes"][i]["monday"] = this.orderPackages[i].weekdays_qty[0][1];
        order["order_packages_attributes"][i]["package_type"] = "6";
        order["order_packages_attributes"][i]["product_id"] = this.orderPackages[i].product_id;
        order["order_packages_attributes"][i]["saturday"] = this.orderPackages[i].weekdays_qty[5][1];
        order["order_packages_attributes"][i]["sunday"] = this.orderPackages[i].weekdays_qty[6][1];
        order["order_packages_attributes"][i]["thursday"] = this.orderPackages[i].weekdays_qty[3][1];
        order["order_packages_attributes"][i]["time_slot_id"] = "5";
        order["order_packages_attributes"][i]["tuesday"] = this.orderPackages[i].weekdays_qty[1][1];
        order["order_packages_attributes"][i]["wednesday"] = this.orderPackages[i].weekdays_qty[2][1];
      }
      order.pickup = "false";
          order.recurring = "true";
          order.order_id = this.allOrders[0].id;
          console.log(order);
          let msg = "Are you sure you want to update order?"
          this.presentConfirm(msg,order);
	}

	cancelOrder(){
    this.cancelConfirm("Are you sure you want to cancel the order?");
	}

  presentConfirm(msg:any,order:any) {
    let alert = this.alertCtrl.create({
      title: '',
      message: msg,
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
            this.confData.updateOrder(order).then((res:any)=>{
              if (res.status == 200){
                this.navCtrl.setRoot(EditOrderPage);
                this.alerts.presentToast("Order updated succesfully");
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

  cancelConfirm(msg:any) {
    let alert = this.alertCtrl.create({
      title: '',
      message: msg,
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
            this.confData.cancelOrder().then((res:any)=>{
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
