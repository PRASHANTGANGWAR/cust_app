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
		  .then(() => console.log('Success','Launched dialer!'))
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