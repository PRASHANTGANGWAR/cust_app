import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Alerts } from '../../providers/alerts-provider';
import { ConferenceData } from '../../providers/conference-data';
import { EditOrderPage } from '../edit-order/edit-order';

declare var window:any;
@Component({
  selector: 'page-set-nonavailability',
  templateUrl: 'set-nonavailability.html',
})
export class SetNonavailabilityPage {
	public fromDate: Date = new Date();
	public toDate:Date = new Date();
  private isDnd:string ='';

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
    this.isDnd = window.localStorage.getItem('isDnd');
    if(this.isDnd){
      let allOrders = JSON.parse(window.localStorage.getItem('allOrders'));
      this.fromDate = new Date(allOrders[0].dnd_from);
      this.toDate = new Date(allOrders[0].dnd_to);
    }else{
      this.fromDate.setDate(this.fromDate.getDate()+1);
      this.toDate.setDate(this.toDate.getDate()+1)
    }
    
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
            this.confData.createDnd(order).then((res:any)=>{
              if(res.status == 200){
                window.localStorage.setItem('isDnd','1');
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
            this.confData.removeDnd(order).then((res:any)=>{
              if(res.status == 200){
                window.localStorage.setItem('isDnd','');
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
