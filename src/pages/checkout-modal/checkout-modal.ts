import { Component } from '@angular/core';
import { NavParams, NavController, ViewController,AlertController } from 'ionic-angular';
import { Alerts } from '../../providers/alerts-provider';
import { ConferenceData } from '../../providers/conference-data';
import { MyAddressPage } from '../my-address/my-address';
import { CategoriesPage } from '../categories/categories';

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
	private mainNumber = 2;
  public initDate: Date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
	private weekday:any = [];
  deliveryDate:any;
	private apiWeek:any = [{"day":"Monday","currentNumber":0}, {"day":"Tuesday","currentNumber":0}, {"day":"Wednesday","currentNumber":0}, {"day":"Thursday","currentNumber":0}, {"day":"Friday","currentNumber":0}, {"day":"Saturday","currentNumber":0}, {"day":"Sunday","currentNumber":0}];
	private recieveChoice:any ={};
  constructor( public navParams: NavParams, private view: ViewController,
  	private alertCtrl: AlertController,
  	private alerts:Alerts,
  	public navCtrl: NavController,
  	private confData: ConferenceData
  	) {
      this.getAllOrders();
    }

    getAllOrders(){
      this.confData.getAllOrders().then((data:any)=>{
        if(data.status == 200){
         console.log(data)
        }else{
          this.alerts.presentToast(data.statusText);
        }
      });
    }

  ionViewDidLoad() {
    this.deliveryDate=this.initDate;
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
    } else if(this.recieveChoice.choice == ""){
      this.title = "One Time Order";
      this.everydayData();
    }
  }

  setDate(date: Date) {
      let today = new Date();
      today.setDate(today.getDate());
      if(date.getTime() >= today.getTime()){
        this.initDate = date;
        window.localStorage.setItem('changed_date',JSON.stringify(this.initDate));
        this.deliveryDate=this.initDate;
      }else{
        this.alerts.presentToast("Please choose correct date");
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
                 this.mainNumber = 2;
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
      
        if(this.recieveChoice.choice == ""){
          this.mainNumber += 1; 
      }
      else{
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
	}

	decrementMain(){
		if(this.mainNumber !== 0){
         if(this.recieveChoice.choice == ""){
          this.mainNumber -= 1; 
      }
      else{
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
    if(this.mainNumber < 1 ) {
      this.alerts.presentToast("Please choose atleast one quantity");
      return;
    }
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
   		}else if(this.recieveChoice.choice== ""){
        for(var t=0;t<this.weekday.length;t++){
          for(var u=0;u<this.apiWeek.length;u++){
            if(this.weekday[t].day==this.apiWeek[t].day){
              this.apiWeek[u].currentNumber = this.weekday[u].currentNumber;
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

  presentConfirm() {
      let alert = this.alertCtrl.create({
        message: 'Please add one address.',
        buttons: [
          {
            text: 'CANCEL',
            handler: () => {
              this.navCtrl.setRoot(CategoriesPage);
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

  placeOrder(){

    let alladdress=JSON.parse(window.localStorage.getItem('user_address'));
    if(alladdress.addresses.length == 0){
     this.alerts.hideLoader();
      this.presentConfirm();
    }else{
    let order:any={"order_packages_attributes":{}};
    if(this.recieveChoice.choice == ''){
        order.delivery_date = this.deliveryDate;
    }else{
        order.delivery_date = this.recieveChoice.deliveryDate; 
    }
    if(this.recieveChoice.choice == "alternate"){
       order.alternate = "true";
    }else{
      order.alternate = "false";
    }
    if(this.recieveChoice.choice == ""){
        order.recurring = "false";
    }else{
        order.recurring = "true";
    }
    order["order_packages_attributes"][0] = {};
    order["order_packages_attributes"][0]["id"] = "";
    //check if there is an existing order
    if(this.recieveChoice.product_data.order_id && order.recurring != "false"){
    	//update order
		order["order_packages_attributes"][0]["default_qty"] = this.mainNumber;
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
    // find current order details
    let orderDetail = this.confData.getOrderDetail(this.recieveChoice.product_data.order_id);
		order.order_id = orderDetail.id;
   
    
      if(this.recieveChoice.product_data.end_date){
         //update order for a duration
          order.end_date=this.recieveChoice.product_data.end_date;
          order.parent_order_id = orderDetail.id;
          this.confData.createChildOrder(order).then((data:any)=>{
          this.alerts.hideLoader();
          if (data.status == 201){
            this.view.dismiss(data.json());
          }else{
            this.alerts.presentToast(data.statusText);
          }
        });
      } else {
          for(var t=0;t<orderDetail.order_packages.length;t++){
            if(orderDetail.order_packages[t].product_id == this.recieveChoice.product_data.product_id){
              order["order_packages_attributes"][0]["id"]= orderDetail.order_packages[t].id;
            }
          }
    	    this.confData.updateOrder(order).then((data:any)=>{
      			if (data.status == 200){
              this.confData.getAllOrders().then((orderdata:any) => {
                if(orderdata.status == 200) {
                  this.alerts.hideLoader();
                  this.view.dismiss(data.json());
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
	}else if(order.recurring == "false" && this.mainNumber == 0){
      this.alerts.hideLoader();
      this.alerts.presentToast("Please choose atleast one quantity");
  }
   else{
		//create new order
		order["order_packages_attributes"][0] = {};
		order["order_packages_attributes"][0]["default_qty"] = this.mainNumber;
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
			if (data.status == 201){
        this.confData.getAllOrders().then((orderdata:any) => {
                if(orderdata.status == 200) {
                  this.alerts.hideLoader();
                  this.view.dismiss(data.json());
                } else {
                  this.alerts.hideLoader();
                }
              })
			}else {
        this.alerts.hideLoader();
				this.alerts.presentToast(data.statusText);
			}
		});

	}
  }
  }

  validationEditOrder(){
    if(this.recieveChoice.choice == ''){
       return true;
      }else{
      for(var i=0;i<this.apiWeek.length;i++){
        if(this.apiWeek[i].currentNumber != 0){
          return true;
        }
      }
  }
  }
}
