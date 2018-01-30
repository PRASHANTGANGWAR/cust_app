import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Alerts } from '../../providers/alerts-provider';
import { ConferenceData } from '../../providers/conference-data';
import { MyOrdersPage } from '../my-orders/my-orders';


@Component({
  selector: 'page-set-nonavailability',
  templateUrl: 'set-nonavailability.html',
})
export class SetNonavailabilityPage {
	public fromDate: Date = new Date();
	public toDate:Date = new Date();
  private isDnd:boolean = false;
  orderId:number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alerts: Alerts,
    private alertCtrl: AlertController,
    private confData: ConferenceData) {
    this.onDndSet();
  }

  onDndSet() {
    this.alerts.showLoader();
    this.orderId = this.navParams.get('id');
    let allOrders = this.confData.getOrderDetail(this.orderId);
    if(allOrders.dnd_from && allOrders.dnd_to){
      this.isDnd = true;
      this.fromDate = new Date(allOrders.dnd_from);
      this.toDate = new Date(allOrders.dnd_to);
      this.alerts.hideLoader();
    }else{
      this.fromDate.setDate(this.fromDate.getDate()+1);
      this.toDate.setDate(this.toDate.getDate()+1);
      this.alerts.hideLoader();
    }
    
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

  setDnd(){
    let dndFrom = this.fromDate.getDate()+'/'+("0" + (this.fromDate.getMonth() + 1)).slice(-2)+'/'+this.fromDate.getFullYear();
    let dndTo = this.toDate.getDate()+'/'+("0" + (this.toDate.getMonth() + 1)).slice(-2)+'/'+this.toDate.getFullYear();
    let order: any={};
    order.app_version = "2.1";
    order.dnd_from = dndFrom;
    order.dnd_to = dndTo;
    order.isNew = 1;
    let msg = "Are you sure to set Do Not Disturb from "+order.dnd_from+" to "+ order.dnd_to+" ? No Delivery shall be made in this period."
    this.presentConfirm(msg,order);
  }

  removeDnd(){
    let order: any={};
    order.app_version = "2.1";
    order.dnd_from = "";
    order.dnd_to = "";
    order.isNew = 1;
    let msg = "Are you sure you want to remove Dnd?"
    this.deleteConfirm(msg,order);
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
            this.confData.createDnd(order,this.orderId).then((res:any)=>{
              if(res.status == 200){
                this.navCtrl.setRoot(MyOrdersPage);
                this.alerts.presentToast("Non availability set succesfully");
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

  deleteConfirm(msg:any,order:any) {
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
            this.confData.removeDnd(order,this.orderId).then((res:any)=>{
              if(res.status == 200){
                this.navCtrl.setRoot(MyOrdersPage);
                this.alerts.presentToast("Non availability removed succesfully");
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
