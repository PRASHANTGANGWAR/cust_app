import { Component, OnInit, ViewChild} from '@angular/core';
import { NavController ,NavParams, ViewController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Alerts } from '../../providers/alerts-provider';
import { ConferenceData } from '../../providers/conference-data';
import { Content } from 'ionic-angular';

@Component({
  selector: 'child-order-update',
  templateUrl: 'child-order.html'
})
export class ChildOrderUpdatePage implements OnInit {
  @ViewChild(Content) content: Content;
  orderId:number;
  orederDetail:any = {};
  weekday:any = [];
  isCow:boolean = true;
  orderInfo:any = {};
  weekdaysCow:any = [{
      "day":"Monday","currentNumber":0
    }, {
      "day":"Tuesday","currentNumber":0
    }, {
      "day":"Wednesday","currentNumber":0
    }, {
      "day":"Thursday","currentNumber":0
    }, {
      "day":"Friday","currentNumber":0
    }, {
      "day":"Saturday","currentNumber":0
    }, {
      "day":"Sunday","currentNumber":0
    }];

  weekdaysBuff = [{
      "day":"Monday","currentNumber":0
    }, {
      "day":"Tuesday","currentNumber":0
    }, {
      "day":"Wednesday","currentNumber":0
    }, {
      "day":"Thursday","currentNumber":0
    }, {
      "day":"Friday","currentNumber":0
    }, {
      "day":"Saturday","currentNumber":0
    }, {
      "day":"Sunday","currentNumber":0
    }];

  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    private alerts : Alerts,
    private navParam: NavParams,
    private confData: ConferenceData,
    private viewCtrl:ViewController
  ) {
    this.orderInfo = this.navParam.get('data');
    this.orderId = this.orderInfo.order_id;
    this.orederDetail = this.confData.getOrderDetail(this.orderId);
  }

 ngOnInit() {
   console.log(this.alerts);
  }

  incrementCow (index: number) {
    if(this.weekdaysCow[index].currentNumber< 20) {
      if(this.weekdaysCow[index].currentNumber === 0 ) {
        this.weekdaysCow[index].currentNumber += 2;
      }else {
        this.weekdaysCow[index].currentNumber++;
      }
    }
  }

  decrementCow(index: number) {
    if(this.weekdaysCow[index].currentNumber !== 0) {
      if(this.weekdaysCow[index].currentNumber === 2 ) {
        this.weekdaysCow[index].currentNumber -= 2;
      }else {
        this.weekdaysCow[index].currentNumber--;
      }
    }
  }

  incrementBuff (index: number) {
    if(this.weekdaysBuff[index].currentNumber< 20) {
      if(this.weekdaysBuff[index].currentNumber === 0 ) {
        this.weekdaysBuff[index].currentNumber += 2;
      }else {
        this.weekdaysBuff[index].currentNumber++;
      }
    }
  }

  decrementBuff(index: number) {
    if(this.weekdaysBuff[index].currentNumber !== 0) {
      if(this.weekdaysBuff[index].currentNumber === 2 ) {
        this.weekdaysBuff[index].currentNumber -= 2;
      }else {
        this.weekdaysBuff[index].currentNumber--;
      }
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  proceedCow() {
    this.content.scrollToTop();
    this.isCow = false;
  }

  proceed() {
    let order:any={"order_packages_attributes":{}};
    order.alternate = "false";
    order.recurring = "true";
    order.order_id = this.orderInfo.id;
    order.delivery_date = this.orderInfo.formDate;
    order.end_date = this.orderInfo.end_date;
    order.parent_order_id = this.orderInfo.id;
    // order pakage for cow
    order["order_packages_attributes"][0] = {};
    order["order_packages_attributes"][0]["id"] = "";
    order["order_packages_attributes"][0]["default_qty"] = 2;
    order["order_packages_attributes"][0]["friday"] = this.weekdaysCow[4].currentNumber;
    order["order_packages_attributes"][0]["monday"] = this.weekdaysCow[0].currentNumber;
    order["order_packages_attributes"][0]["package_type"] = "1";
    order["order_packages_attributes"][0]["product_id"] = 1;
    order["order_packages_attributes"][0]["saturday"] = this.weekdaysCow[5].currentNumber;
    order["order_packages_attributes"][0]["sunday"] = this.weekdaysCow[6].currentNumber;
    order["order_packages_attributes"][0]["thursday"] = this.weekdaysCow[3].currentNumber;
    order["order_packages_attributes"][0]["time_slot_id"] = "5";
    order["order_packages_attributes"][0]["tuesday"] = this.weekdaysCow[1].currentNumber;
    order["order_packages_attributes"][0]["wednesday"] = this.weekdaysCow[2].currentNumber;

    //order pakage for bufflao
    // order["order_packages_attributes"][1] = {};
    // order["order_packages_attributes"][1]["id"] = "";
    // order["order_packages_attributes"][1]["default_qty"] = 2;
    // order["order_packages_attributes"][1]["friday"] = this.weekdaysBuff[4].currentNumber;
    // order["order_packages_attributes"][1]["monday"] = this.weekdaysBuff[0].currentNumber;
    // order["order_packages_attributes"][1]["package_type"] = "1";
    // order["order_packages_attributes"][1]["product_id"] = 2;
    // order["order_packages_attributes"][1]["saturday"] = this.weekdaysBuff[5].currentNumber;
    // order["order_packages_attributes"][1]["sunday"] = this.weekdaysBuff[6].currentNumber;
    // order["order_packages_attributes"][1]["thursday"] = this.weekdaysBuff[3].currentNumber;
    // order["order_packages_attributes"][1]["time_slot_id"] = "5";
    // order["order_packages_attributes"][1]["tuesday"] = this.weekdaysBuff[1].currentNumber;
    // order["order_packages_attributes"][1]["wednesday"] = this.weekdaysBuff[2].currentNumber;

    this.confData.createChildOrder(order).then((data:any)=>{
          if (data.status == 201){
            this.confData.getAllOrders().then((orderdata:any) => {
                if(orderdata.status == 200) {
                  this.alerts.hideLoader();
                  this.viewCtrl.dismiss(data.json());
                } else {
                  this.alerts.hideLoader();
                }
              })
          } else {
            this.alerts.hideLoader();
            this.alerts.presentToast(data.statusText);
          }
    });
  }

}
