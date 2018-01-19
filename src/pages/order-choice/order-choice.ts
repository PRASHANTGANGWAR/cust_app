import { Component } from '@angular/core';
import { NavController, Modal, ModalController, NavParams } from 'ionic-angular';
import { CheckoutModalPage } from '../checkout-modal/checkout-modal';
import { Alerts } from '../../providers/alerts-provider';
import { CurrentOrderPage } from '../current-order/current-order';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-order-choice',
  templateUrl: 'order-choice.html',
})
export class OrderChoicePage {
	public order_data:any = {};
  public initDate: Date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
    public alerts: Alerts,
  	private modalCtrl: ModalController,
    private confData: ConferenceData) {
     this.getAllOrders();
  }

    getAllOrders(){
     this.confData.getAllOrders().then((data:any)=>{
        if(data.status == 200){
        }else{
          this.alerts.presentToast(data.statusText);
        }
      });
    }

  ionViewDidLoad() {
    this.order_data.deliveryDate=this.initDate;
  	let product_data=this.navParams.get('data');
    this.order_data.product_data = product_data;
  }

  openModal(choice:string) {
  	console.log(choice);
  		this.order_data.choice = choice;
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
      if(date.getTime() >= today.getTime()){
        this.initDate = date;
        window.localStorage.setItem('changed_date',JSON.stringify(this.initDate));
        this.order_data.deliveryDate=this.initDate;
      }else{
        this.alerts.presentToast("Please choose correct date");
      }
  }

}
