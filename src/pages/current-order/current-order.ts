import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { EditOrderPage } from '../edit-order/edit-order';

@Component({
  selector: 'page-current-order',
  templateUrl: 'current-order.html',
})
export class CurrentOrderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentOrderPage');
  }

  editOrderPage(){
  	this.navCtrl.setRoot(EditOrderPage);
  }

  mainMenu(){
  	this.navCtrl.setRoot(CategoriesPage);
  }

}
