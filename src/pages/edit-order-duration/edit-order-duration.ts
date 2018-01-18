import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Alerts } from '../../providers/alerts-provider';
import { ConferenceData } from '../../providers/conference-data';
import { OrderChoicePage } from '../order-choice/order-choice';

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
	    this.allOrders = JSON.parse(window.localStorage.getItem("allOrders"));
  		this.orderPackages = this.allOrders[0].order_packages;
      var datefrom=new Date(this.allOrders[0].delivery_date)
      var dateto=new Date(this.allOrders[0].delivery_date)
      this.fromDate.setDate(datefrom.getDate());
      this.toDate.setDate(dateto.getDate());
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


  orderChoice(product_id:number){
    let editData:any={};
    let dFrom = this.fromDate.getFullYear()+'-'+("0" + (this.fromDate.getMonth() + 1)).slice(-2)+'-'+this.fromDate.getDate();
    let dTo = this.toDate.getFullYear()+'-'+("0" + (this.toDate.getMonth() + 1)).slice(-2)+'-'+this.toDate.getDate();
    editData.product_id=product_id;
    editData.deliveryDate=dFrom;
    editData.end_date = dTo;
    this.navCtrl.push(OrderChoicePage,{data:editData});
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
