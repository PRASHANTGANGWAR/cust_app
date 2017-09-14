import { Component } from '@angular/core';
import { NavController, NavParams, Modal, ModalController } from 'ionic-angular';
import { Alerts } from '../../providers/alerts-provider';
import { CheckoutModalPage } from '../checkout-modal/checkout-modal';
import { ConferenceData } from '../../providers/conference-data';
import { EditOrderPage } from '../edit-order/edit-order';

declare var window:any;
@Component({
  selector: 'page-edit-order-duration',
  templateUrl: 'edit-order-duration.html',
})
export class EditOrderDurationPage {
	public fromDate: Date = new Date();
	public toDate:Date = new Date();
	private allOrders:any;
	private orderPackages:any =[];
  private child_orders:any =[];

	constructor(public navCtrl: NavController,
	  	public navParams: NavParams,
      public confData: ConferenceData,
	  	public alerts:Alerts,
	  	public modalCtrl: ModalController) {
	  	this.fromDate.setDate(this.fromDate.getDate()+1);
	    this.toDate.setDate(this.toDate.getDate()+1);
	    this.allOrders = JSON.parse(window.localStorage.getItem("allOrders"));
  		this.orderPackages = this.allOrders[0].order_packages;
      this.getAllOrders();
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditOrderDurationPage');
  }

  setfromDate(date: Date) {
  	let today = new Date();
    today.setDate(today.getDate()+1);
    if(date.getDate() >= today.getDate()){
    	this.fromDate = date;
      if(this.toDate.getDate() < this.fromDate.getDate()){
        this.toDate = this.fromDate;
      } 
    }else{
    	this.alerts.presentToast("Please choose correct date");
    }
  }

  settoDate(date: Date) {
    let today = new Date();
    today.setDate(today.getDate()+1);
    if(date.getDate() >= today.getDate() && date.getDate() >= this.fromDate.getDate()){
    	 this.toDate = date;
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

    childOrder(){
      let order:any={"order_packages_attributes":{}};
      let dFrom = this.fromDate.getFullYear()+'-'+("0" + (this.fromDate.getMonth() + 1)).slice(-2)+'-'+this.fromDate.getDate();
      let dTo = this.toDate.getFullYear()+'-'+("0" + (this.toDate.getMonth() + 1)).slice(-2)+'-'+this.toDate.getDate();
      order.alter_from = "";
      order.delivery_date = dFrom;
      order.end_date = dTo;
      order.isNew = "1";
      for(var i=0;i<this.orderPackages.length;i++){
        order["order_packages_attributes"][i] = {};
        order["order_packages_attributes"][i]["default _qty"] = "3";
        order["order_packages_attributes"][i]["friday"] = this.orderPackages[i].weekdays_qty[4][1];
        order["order_packages_attributes"][i]["monday"] = this.orderPackages[i].weekdays_qty[0][1];
        order["order_packages_attributes"][i]["package_type"] = "1";
        order["order_packages_attributes"][i]["product_id"] = this.orderPackages[i].product_id;
        order["order_packages_attributes"][i]["saturday"] = this.orderPackages[i].weekdays_qty[5][1];
        order["order_packages_attributes"][i]["sunday"] = this.orderPackages[i].weekdays_qty[6][1];
        order["order_packages_attributes"][i]["thursday"] = this.orderPackages[i].weekdays_qty[3][1];
        order["order_packages_attributes"][i]["time_slot_id"] = "5";
        order["order_packages_attributes"][i]["tuesday"] = this.orderPackages[i].weekdays_qty[1][1];
        order["order_packages_attributes"][i]["wednesday"] = this.orderPackages[i].weekdays_qty[2][1];
      }
      order.parent_order_id = this.allOrders[0].id;
      order.pickup = "false";
      order.recurring = "true";
      this.confData.createChildOrder(order).then((res:any)=>{
        if(res.status == 201){
          this.getAllOrders();
           this.navCtrl.setRoot(EditOrderPage);
           this.alerts.presentToast("Order updated successfully!");
        }else{
          this.alerts.presentToast(res.statusText);
        }
      });
    }

  getAllOrders(){
    this.confData.getAllOrders().then((res:any)=>{
      if(res.status == 200){
       let allOrders = JSON.parse(window.localStorage.getItem('allOrders'));
       this.child_orders = allOrders[0].child_orders;
      }else{
        this.alerts.presentToast(res.statusText);
      }
    });
  }
}
