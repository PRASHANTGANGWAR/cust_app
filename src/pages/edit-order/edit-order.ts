import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { SetNonavailabilityPage } from '../set-nonavailability/set-nonavailability';

declare var window:any;
@Component({
  selector: 'page-edit-order',
  templateUrl: 'edit-order.html',
})
export class EditOrderPage {
  private hasOrders:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private confData: ConferenceData) {
    this.getAllOrders();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditOrderPage');
  }

  getAllOrders(){
    this.confData.getAllOrders().then((data)=>{
      console.log(data);
     let allOrders = JSON.parse(window.localStorage.getItem('allOrders'));
       if(allOrders.length){
        this.hasOrders = true;
       }
    });
  }

  nonAvialability(){
  	this.navCtrl.setRoot(SetNonavailabilityPage);
  }

}
