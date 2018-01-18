import { Component } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'last-five-order',
  templateUrl: 'last-five-order.html'
})

export class LastFiveOrder {
		Deliveries: any=[];
		private loading :any;
		private dataFound: string;

	constructor(
		public userData: UserData,
		private _loading: LoadingController,
		private _alert: AlertController
		){
	    this.onLoad();
	}

	  onLoad(){	
	  	this.showLoader();
	   	this.userData.lastOrders().then(data => {
	   		this.hideLoader();
	   		let result: any = {};
	   		result = data;
	   		if(result.status == 200){
	   			this.Deliveries = result.json().deliveries;
	   			if(!this.Deliveries.length){
	   				this.dataFound = "No deliveries data yet";
	   			}
	   		}else{
	   			this.doAlert('Error','Please try again !');
	   		}
	   	});
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