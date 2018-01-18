import { Component } from '@angular/core';
import { NavParams, NavController, ViewController,AlertController } from 'ionic-angular';
import { Alerts } from '../../providers/alerts-provider';
import { ConferenceData } from '../../providers/conference-data';

/**
 * Generated class for the CheckoutModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var window:any;
@Component({
  selector: 'page-checkout-modal',
  templateUrl: 'checkout-modal.html',
})
export class CheckoutModalPage {
	checked:boolean = true;
	public title = "";
	private mainNumber = 0;
	private weekday:any = [];
	private apiWeek:any = [{"day":"Monday","currentNumber":0}, {"day":"Tuesday","currentNumber":0}, {"day":"Wednesday","currentNumber":0}, {"day":"Thursday","currentNumber":0}, {"day":"Friday","currentNumber":0}, {"day":"Saturday","currentNumber":0}, {"day":"Sunday","currentNumber":0}];
	private recieveChoice:any ={};
  constructor( public navParams: NavParams, private view: ViewController,
  	private alertCtrl: AlertController,
  	private alerts:Alerts,
  	public navCtrl: NavController,
  	private confData: ConferenceData
  	) {
  }

  ionViewDidLoad() {
  	this.recieveChoice = this.navParams.get('data');
   	console.log(this.recieveChoice);
   	if(this.recieveChoice.choice=="everyday"){
   		this.title = "Everyday";
      this.everydayData();
   	} else if(this.recieveChoice.choice == "alternate"){
   		this.title = "Alternate Day";
      this.everydayData();
  	} else if(this.recieveChoice.choice == "mwf"){
  		this.title = "Mon-Wed-Fri";
      this.weekday=[{"day":"Monday","currentNumber":0}, {"day":"Wednesday","currentNumber":0}, {"day":"Friday","currentNumber":0}];
      this.fillQuantityData(this.weekday);
  	} else if(this.recieveChoice.choice == "mf"){
  		this.title = "Mon-Fri";
  		this.weekday=[{"day":"Monday","currentNumber":0}, {"day":"Tuesday","currentNumber":0}, {"day":"Wednesday","currentNumber":0}, {"day":"Thursday","currentNumber":0}, {"day":"Friday","currentNumber":0}];
  	  this.fillQuantityData(this.weekday);
    } else if(this.recieveChoice.choice == "tts"){
  		this.title = "Tue-Thu-Sat";
  		this.weekday=[{"day":"Tuesday","currentNumber":0}, {"day":"Thursday","currentNumber":0}, {"day":"Saturday","currentNumber":0}];
  	  this.fillQuantityData(this.weekday);
    } else if(this.recieveChoice.choice == "custom"){
  		this.title = "Custom";
  		this.weekday=[{"day":"Monday","currentNumber":0}, {"day":"Tuesday","currentNumber":0}, {"day":"Wednesday","currentNumber":0}, {"day":"Thursday","currentNumber":0}, {"day":"Friday","currentNumber":0}, {"day":"Saturday","currentNumber":0}, {"day":"Sunday","currentNumber":0}];
  	  this.fillQuantityData(this.weekday);
    }
  }

  fillQuantityData(weekday:any){
    let allOrders=JSON.parse(window.localStorage.getItem('allOrders'));
    if(allOrders.length){
       for(var i=0;i<allOrders[0].order_packages.length;i++){
          if(allOrders[0].order_packages[i].product_id == this.recieveChoice.product_data.product_id){
            for(var j=0;j<weekday.length;j++){
              for(var k=0;k<allOrders[0].order_packages[i].weekdays_qty.length;k++){
                if(weekday[j].day==allOrders[0].order_packages[i].weekdays_qty[k][0]){
                  weekday[j].currentNumber=allOrders[0].order_packages[i].weekdays_qty[k][1];
                }
              }
            }
        }
      }
    }
  }

  everydayData(){
    let allOrders=JSON.parse(window.localStorage.getItem('allOrders'));
    if(allOrders.length){
       for(var i=0;i<allOrders[0].order_packages.length;i++){
          if(allOrders[0].order_packages[i].product_id == this.recieveChoice.product_data.product_id){
              for(var k=1;k<allOrders[0].order_packages[i].weekdays_qty.length;k++){
                if(allOrders[0].order_packages[i].weekdays_qty[0][1]!==allOrders[0].order_packages[i].weekdays_qty[k][1]){
                 this.mainNumber = 0;
                }else{
                  this.mainNumber = allOrders[0].order_packages[i].weekdays_qty[0][1];
                }
              }
            }
        }
      }
  }

  	incrementMain(){
  		if(this.mainNumber <20){
			if(this.mainNumber === 0){
				this.mainNumber += 2;
				for(var i=0; i<this.weekday.length; i++){
					this.weekday[i].currentNumber = this.mainNumber;
				}
			}
			else{
				this.mainNumber++;
				for(var j=0; j<this.weekday.length; j++){
					this.weekday[j].currentNumber = this.mainNumber;
				}
			}
		}
	}

	decrementMain(){
		if(this.mainNumber !== 0){
			if(this.mainNumber === 2){
				this.mainNumber -= 2;
				for(var i=0; i<this.weekday.length; i++){
					this.weekday[i].currentNumber = this.mainNumber;
				}
			}
			else{
				this.mainNumber--;
				for(var j=0; j<this.weekday.length; j++){
					this.weekday[j].currentNumber = this.mainNumber;
				}
			}
		}
	}

	increment (index: number){
		if(this.weekday[index].currentNumber< 20){
			if(this.weekday[index].currentNumber === 0 ){
				this.weekday[index].currentNumber += 2;
			}else{
				this.weekday[index].currentNumber++;
				console.log(this.weekday);
			}
		}
	}

	decrement(index: number){
		if(this.weekday[index].currentNumber !== 0){
			if(this.weekday[index].currentNumber === 2 ){
				this.weekday[index].currentNumber -= 2;
			}else{
				this.weekday[index].currentNumber--;
				console.log(this.weekday);
			}
		}
	}

	closeModal(){
	  	this.view.dismiss(null);
	}

	proceed(){
		if(this.recieveChoice.choice == "everyday"){
			for(var i=0;i<this.apiWeek.length;i++){
	   			this.apiWeek[i].currentNumber=this.mainNumber;
	   		}
   		} else if(this.recieveChoice.choice == "alternate"){
   			for(var j=0;j<this.apiWeek.length;j++){
          this.apiWeek[j].currentNumber=this.mainNumber;
        }
   		}else if(this.recieveChoice.choice == "mwf"){
   			for(var l=0;l<this.weekday.length;l++){
   				for(var m=0;m<this.apiWeek.length;m++){
   					if(this.weekday[l].day==this.apiWeek[m].day){
   						this.apiWeek[m].currentNumber = this.weekday[l].currentNumber;
   					}
   				}
   			}
   		}else if(this.recieveChoice.choice == "mf"){
   			for(var n=0;n<this.weekday.length;n++){
   				for(var o=0;o<this.apiWeek.length;o++){
   					if(this.weekday[n].day==this.apiWeek[o].day){
   						this.apiWeek[o].currentNumber = this.weekday[n].currentNumber;
   					}
   				}
   			}
   		}else if(this.recieveChoice.choice == "tts"){
   			for(var p=0;p<this.weekday.length;p++){
   				for(var q=0;q<this.apiWeek.length;q++){
   					if(this.weekday[p].day==this.apiWeek[q].day){
   						this.apiWeek[q].currentNumber = this.weekday[p].currentNumber;
   					}
   				}
   			}
   		}else if(this.recieveChoice.choice== "custom"){
   			for(var r=0;r<this.weekday.length;r++){
   				for(var s=0;s<this.apiWeek.length;s++){
   					if(this.weekday[r].day==this.apiWeek[s].day){
   						this.apiWeek[s].currentNumber = this.weekday[r].currentNumber;
   					}
   				}
   			}
   		}
   		console.log(this.apiWeek);
		this.orderConfirmation("",this.apiWeek);
	}

	orderConfirmation(msg:any,apiWeek:any) {
		console.log(apiWeek);
    let alert = this.alertCtrl.create({
      title: 'Place this order!',
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
            if(this.validationEditOrder()){
              this.placeOrder();
            } else{
              this.alerts.hideLoader();
              this.alerts.presentToast("Please choose atleast one quantity");
            }
          }
        }
      ]
    });
    alert.present();
  }

  placeOrder(){
  	let allOrders=JSON.parse(window.localStorage.getItem('allOrders'));
    let order:any={"order_packages_attributes":{}};
    order.delivery_date = this.recieveChoice.product_data.deliveryDate;
    if(this.recieveChoice.choice == "alternate"){
       order.alternate = "true";
    }else{
      order.alternate = "false";
    }
    order["order_packages_attributes"][0] = {};
    order["order_packages_attributes"][0]["id"] = "";
    //check if there is an existing order
    if(allOrders.length){
    	//update order
		order["order_packages_attributes"][0]["default _qty"] = "3";
		order["order_packages_attributes"][0]["friday"] = this.apiWeek[4].currentNumber;
		order["order_packages_attributes"][0]["monday"] = this.apiWeek[0].currentNumber;
		order["order_packages_attributes"][0]["package_type"] = "1";
		order["order_packages_attributes"][0]["product_id"] = this.recieveChoice.product_data.product_id;
		order["order_packages_attributes"][0]["saturday"] = this.apiWeek[5].currentNumber;
		order["order_packages_attributes"][0]["sunday"] = this.apiWeek[6].currentNumber;
		order["order_packages_attributes"][0]["thursday"] = this.apiWeek[3].currentNumber;
		order["order_packages_attributes"][0]["time_slot_id"] = "5";
		order["order_packages_attributes"][0]["tuesday"] = this.apiWeek[1].currentNumber;
		order["order_packages_attributes"][0]["wednesday"] = this.apiWeek[2].currentNumber;
		order.order_id = allOrders[0].id;
      if(this.recieveChoice.product_data.end_date){
         //update order for a duration
          order.end_date=this.recieveChoice.product_data.end_date;
          order.parent_order_id = allOrders[0].id;
          this.confData.createChildOrder(order).then((data:any)=>{
          this.alerts.hideLoader();
          if (data.status == 201){
            this.view.dismiss(data.json());
          }else{
            this.alerts.presentToast(data.statusText);
          }
        });
      } else{
          for(var t=0;t<allOrders[0].order_packages.length;t++){
            if(allOrders[0].order_packages[t].product_id == this.recieveChoice.product_data.product_id){
              order["order_packages_attributes"][0]["id"]= allOrders[0].order_packages[t].id;
            }
          }
    	    this.confData.updateOrder(order).then((data:any)=>{
      			this.alerts.hideLoader();
      			if (data.status == 200){
              this.view.dismiss(data.json());
      			}else{
      				this.alerts.presentToast(data.statusText);
      			}
    		  });
      }
	} else{
		//create new order
		order["order_packages_attributes"][0] = {};
		order["order_packages_attributes"][0]["default _qty"] = "3";
		order["order_packages_attributes"][0]["friday"] = this.apiWeek[4].currentNumber;
		order["order_packages_attributes"][0]["monday"] = this.apiWeek[0].currentNumber;
		order["order_packages_attributes"][0]["package_type"] = "1";
		order["order_packages_attributes"][0]["product_id"] = this.recieveChoice.product_data.product_id;
		order["order_packages_attributes"][0]["saturday"] = this.apiWeek[5].currentNumber;
		order["order_packages_attributes"][0]["sunday"] = this.apiWeek[6].currentNumber;
		order["order_packages_attributes"][0]["thursday"] = this.apiWeek[3].currentNumber;
		order["order_packages_attributes"][0]["time_slot_id"] = "5";
		order["order_packages_attributes"][0]["tuesday"] = this.apiWeek[1].currentNumber;
		order["order_packages_attributes"][0]["wednesday"] = this.apiWeek[2].currentNumber;
	    this.confData.newOrder(order).then((data:any)=>{
			this.alerts.hideLoader();
			if (data.status == 201){
				this.view.dismiss(data.json());
			}else{
				this.alerts.presentToast(data.statusText);
			}
		});

	}
  }

  validationEditOrder(){
    for(var i=0;i<this.apiWeek.length;i++){
      if(this.apiWeek[i].currentNumber != 0){
        return true;
      }
    }
  }
}
