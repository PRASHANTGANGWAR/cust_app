import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Alerts } from '../../providers/alerts-provider';
import { ConferenceData } from '../../providers/conference-data';
import { EditOrderPage } from '../edit-order/edit-order';


@Component({
  selector: 'page-set-nonavailability',
  templateUrl: 'set-nonavailability.html',
})
export class SetNonavailabilityPage {
	public fromDate: Date = new Date();
	public toDate:Date = new Date();
  private isDnd:boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alerts: Alerts,
    private alertCtrl: AlertController,
    private confData: ConferenceData) {
    this.onDndSet();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetNonavailabilityPage');
  }

  onDndSet(){
    this.alerts.showLoader();
    let allOrders = this.confData.getOrderDetail(this.navParams.get('id'));
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
    let dndFrom = this.fromDate.getFullYear()+'-'+("0" + (this.fromDate.getMonth() + 1)).slice(-2)+'-'+this.fromDate.getDate();
    let dndTo = this.toDate.getFullYear()+'-'+("0" + (this.toDate.getMonth() + 1)).slice(-2)+'-'+this.toDate.getDate();
    let order: any={};
    order.app_version = "2.1";
    order.dnd_from = dndFrom;
    order.dnd_to = dndTo;
    order.isNew = 1;
    let msg = "Are you sure you want to set Dnd from "+order.dnd_from+" to "+ order.dnd_to+" ?"
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
            this.alerts.showLoader();
            this.confData.createDnd(order).then((res:any)=>{
              this.alerts.hideLoader();
              if(res.status == 200){
                this.navCtrl.setRoot(EditOrderPage);
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
            this.alerts.showLoader();
            this.confData.removeDnd(order).then((res:any)=>{
              this.alerts.hideLoader();
              if(res.status == 200){
                this.navCtrl.setRoot(EditOrderPage);
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
