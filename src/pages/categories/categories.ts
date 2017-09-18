import { Component } from '@angular/core';
import { UserData } from '../../providers/user-data';
import { ProductListPage } from '../product-list/product-list';

import { NavController, ViewController } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { Alerts } from '../../providers/alerts-provider';

declare var window: any;

export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean|void;
};

@Component({
  selector: 'categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {
  private categories:any=[];

  constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    public confData: ConferenceData,
    public userData: UserData,
    private alert:Alerts
  ) {
      window.localStorage.setItem('current_page',this.viewCtrl.name);
      console.log(this.viewCtrl.name);
      this.productList();
    }

    productList(){
      this.alert.showLoader();
      this.confData.categories().then((res:any)=>{
         this.alert.hideLoader();
         if(res.status == 200){
             let result = res.json();
             this.categories = result.categories;
             window.localStorage.setItem('categories',JSON.stringify(this.categories));
          }else{
              this.alert.presentToast("something went wrong!");
          }
      });
    }

    showlist(number: any){
      this.navCtrl.setRoot(ProductListPage,{id: number});
    }
}