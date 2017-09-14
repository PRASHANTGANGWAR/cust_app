import { Component } from '@angular/core';
import { UserData } from '../../providers/user-data';
import { ProductListPage } from '../product-list/product-list';
import { Database } from '../../providers/db-provider';

import { NavController, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';

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
  private loading :any;
  private categories:any=[];

  constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    public confData: ConferenceData,
    private _alert: AlertController,
    private _loading: LoadingController,
    public userData: UserData,
    public dataBase: Database
  ) {
      window.localStorage.setItem('current_page',this.viewCtrl.name);
      console.log(this.viewCtrl.name);
      this.productList();
    }

    productList(){
      this.confData.categories().then((results:any)=>{
           console.log(results);
           this.categories = results.categories;
           this.dataBase.insertProducts(results).then(data =>{
            console.log(data);
           });
      });
    }

    showlist(number: any){
      this.navCtrl.setRoot(ProductListPage,{id: number});
    }

  doAlert(type: string,message: string) {
    let alert = this._alert.create({
      title: type,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  showLoader(){
    this.loading = this._loading.create({
      content: 'Please wait...',
    });
    this.loading.present();
  }

  hideLoader(){
    this.loading.dismiss();
  }
}
