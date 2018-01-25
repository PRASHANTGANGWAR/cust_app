import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Alerts } from '../../providers/alerts-provider';
import { ConferenceData } from '../../providers/conference-data';
import { ChildOrderUpdatePage } from '../child-order/child-order';

@Component({
  selector: 'page-edit-order-duration',
  templateUrl: 'edit-order-duration.html',
})
export class EditOrderDurationPage {
	public fromDate: Date = new Date();
	public toDate:Date = new Date();
	private allOrders:any;
  private child_orders:any =[];
  orderId:number;

	constructor(public navCtrl: NavController,
	  	public navParams: NavParams,
      public confData: ConferenceData,
	  	public alerts:Alerts,
	  	public modalCtrl: ModalController) {

      this.orderId = this.navParams.get('id');
	    this.allOrders = this.confData.getOrderDetail(this.orderId);
      this.fromDate = new Date(this.allOrders.delivery_date);
      this.toDate = new Date(this.allOrders.delivery_date);
      this.getAllOrders();
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditOrderDurationPage');
  }

  setfromDate(date: Date) {
  	let today = new Date();
    today.setDate(today.getDate());
    if(date.getTime() >= today.getTime()){
    	this.fromDate = date;
      if(this.toDate.getTime() < this.fromDate.getTime()){
        this.toDate = this.fromDate;
      } 
    }else{
    	this.alerts.presentToast("Please choose correct date");
    }
  }

  settoDate(date: Date) {
    let today = new Date();
    today.setDate(today.getDate());
    if(date.getTime() >= today.getTime() && date.getTime() >= this.fromDate.getTime()){
    	 this.toDate = date;
    }else{
    	this.alerts.presentToast("Please choose correct date");
    }
  }


  orderChoice(){
    let editData:any={};
    let dFrom = this.fromDate.getFullYear()+'-'+("0" + (this.fromDate.getMonth() + 1)).slice(-2)+'-'+this.fromDate.getDate();
    let dTo = this.toDate.getFullYear()+'-'+("0" + (this.toDate.getMonth() + 1)).slice(-2)+'-'+this.toDate.getDate();
    editData.formDate = dFrom;
    editData.end_date = dTo;
    editData.order_id = this.orderId;
    this.navCtrl.push(ChildOrderUpdatePage,{data:editData});
  }

  getAllOrders(){
    this.confData.getAllOrders().then((res:any)=>{
      if(res.status == 200){
       let allOrders = this.confData.getOrderDetail(this.orderId);
       this.child_orders = allOrders.child_orders;
      }else{
        this.alerts.presentToast(res.statusText);
      }
    });
  }
}
