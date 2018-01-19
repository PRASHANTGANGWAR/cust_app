import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Alerts } from '../../providers/alerts-provider';
import { ConferenceData } from '../../providers/conference-data';
import { EditOrderPage } from '../edit-order/edit-order';
import { OrderChoicePage } from '../order-choice/order-choice';

declare var window:any;
@Component({
  selector: 'page-edit-daily-order',
  templateUrl: 'edit-daily-order.html',
})
export class EditDailyOrderPage {
	private initDate:Date = new Date();
	private allOrders:any;
	private allOrderPackages:any = [];

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public modalCtrl: ModalController,
  	public alerts: Alerts,
    public confData: ConferenceData,
    public alertCtrl: AlertController
  	) {
  	this.allOrders = JSON.parse(window.localStorage.getItem("allOrders"));
    let self = this;
    self.allOrders.forEach(function(order:any){
      self.allOrderPackages.push(order);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDailyOrderPage');
  }

  setDate(date:Date){
  	let today = new Date();
  	today.setDate(today.getDate());
  	if(date.getTime() >= today.getTime()){
  		this.initDate = date;
  	}else{
  		this.alerts.presentToast("Please choose correct date");
  	}
  }

  orderChoice(product_id:number){
    let editData:any={};
    let dFrom = this.initDate.getFullYear()+'-'+("0" + (this.initDate.getMonth() + 1)).slice(-2)+'-'+this.initDate.getDate();
    editData.product_id=product_id;
    editData.deliveryDate=dFrom;
    this.navCtrl.push(OrderChoicePage,{data:editData});
  }

	cancelOrder(){
    this.cancelConfirm("Are you sure you want to cancel the order?");
	}

  cancelConfirm(msg:any) {
    let alert = this.alertCtrl.create({
      title: 'Cancel Order',
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
            this.confData.cancelOrder().then((res:any)=>{
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
