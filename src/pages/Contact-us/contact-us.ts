import { Component } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'contact-us',
  templateUrl: 'contact-us.html'
})

export class ContactPage {
		Nutrition: any=[];
		private loading :any;

	constructor(
		public userData: UserData,
		private _loading: LoadingController,
		private _alert: AlertController,
		private emailComposer: EmailComposer,
		private callNumber: CallNumber
		){
	    this.onLoad();
	}

	  onLoad(){	
	   	this.userData.nutritionValues().then(data => {
	   		this.showLoader();
	   		let result: any = {};
	   		result = data;
	   		if(result.status == 200){
	   			this.Nutrition = JSON.parse(result._body).nutrition_values;
	   			this.hideLoader();
	   		}else{
	   			this.hideLoader();
	   			this.doAlert('Error','Please try again !');
	   		}
	   	});
	  }

	sendFeedback() {
    	this.emailComposer.isAvailable().then((available: boolean) =>{
     		if(available) {
       			//Now we know we can send
     		}
    	});

    	let email = {
      		to: 'contactus@dairylac.com',
      		subject: 'Feedback',
      		isHtml: true
    	};

    	// Send a text message using default options
    	this.emailComposer.open(email);
  	}

  	call(){
  		this.callNumber.callNumber("01161616161", true)
		  .then(() => this.doAlert('Success','Launched dialer!'))
		  .catch(() => this.doAlert('Error','Error launching dialer'));
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