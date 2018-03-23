import { Component } from '@angular/core';
import { UserData } from '../../providers/user-data';
import { CheckoutModalPage } from '../checkout-modal/checkout-modal';
import { CurrentOrderPage } from '../current-order/current-order';
import { NavController, ViewController,Modal ,ModalController,AlertController } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { Alerts } from '../../providers/alerts-provider';
import { OrderChoicePage } from '../order-choice/order-choice';
import { LoginPage } from '../login/login';
import { MyAddressPage } from '../my-address/my-address';

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
   private ctData:any ={};
   private obj:any = {};
    public myarray: any=[];

  constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    public confData: ConferenceData,
    public userData: UserData,
    public modalCtrl: ModalController,
    private alert:Alerts,
    public alertCtrl: AlertController
  ) { 
      window.localStorage.setItem('current_page',this.viewCtrl.name);
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
             for (var i = this.categories.length - 1; i >= 0; i--) {                    
                     var value = this.categories[i].products[0].image;
                     var key= this.categories[i].products[0].id;

                    this.obj[key] = value;                                                                                
                }
                 window.localStorage.setItem('images',JSON.stringify(this.obj));       
          }else{
              this.alert.presentToast("something went wrong!");
          }
      });
    }

    showlist(number: any,product_type:any){
    let user = JSON.parse(window.localStorage.getItem('login_details'));
    if(user){
        let alladdress=JSON.parse(window.localStorage.getItem('user_address'));
        if(alladdress.addresses.length == 0){
          this.presentConfirm();
        } else{
          this.ctData.product_id=number;
          if(product_type.product_type == "1"){
            this.openModal(1);
          } else {
            let allOrders = JSON.parse(window.localStorage.getItem('allOrders'));
            for(let i = 0;i< allOrders.length ;i++){
              if(allOrders[i].recurring) {
                this.ctData.hideDate = true;
                this.ctData.order_id = allOrders[i].id;
              }
            }
            this.navCtrl.push(OrderChoicePage,{data: this.ctData});
          }
        }
    }
    else{
      this.alert.showLoader();
      this.alert.presentToast('Please login first');
      this.navCtrl.push(LoginPage);
      this.alert.hideLoader();
    }
     
      
      
    }

      openModal(value: number) {
      let order_data:any = {};
      order_data.choice = "";
      order_data.value=value;
      order_data.product_data ={};
      order_data.product_data.product_id = this.ctData.product_id;
      const chekoutModal:Modal = this.modalCtrl.create(CheckoutModalPage,{data: order_data});
      chekoutModal.present();

      chekoutModal.onDidDismiss((data)=>{
        if(data){
         this.navCtrl.setRoot(CurrentOrderPage,{currentOrder: data});
        }
    });
  }

    presentConfirm() {
      let alert = this.alertCtrl.create({
        message: 'Please add your address to place order.',
        buttons: [
          {
            text: 'CANCEL',
            handler: () => {
            }
          },
          {
            text: 'ADD',
            handler: () => {
              this.navCtrl.setRoot(MyAddressPage);
            }
          }
        ]
      });
      alert.present();
  }
}