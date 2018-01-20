import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AlertController, NavController, LoadingController, ToastController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { ChangePasPage } from '../change-pas/change-pas';
import { MyAddressPage } from '../my-address/my-address';
import { CategoriesPage } from '../categories/categories';
declare var window: any; 
@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {
	public address: Array<any>;
		Profile: any={};
		RecName: string;
		RecNumber: string;
		SameRecip: boolean =false;
		check: boolean;
		private loading :any;
		public initDate: Date = new Date();

	constructor(
		public datepipe: DatePipe,
		public userData: UserData,
		private navCtrl: NavController,
		private _loading: LoadingController,
		private toastCtrl: ToastController,
		private _alert: AlertController
		){
		this.check = true;
	    this.onLoad();
	    let data = JSON.parse(window.localStorage.getItem('user_address'));
		this.showAddress(data);
	}
	
		showAddress(data: any){
		if(data.addresses.length == 0){
				this.presentConfirm();
			}
			else{
				this.address = data.addresses[0];
			}
	}

	addAddressPage(){
	 	this.navCtrl.setRoot(MyAddressPage,{isAddress: true});
	}

	presentConfirm() {
	    let alert = this._alert.create({
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

	 setDate(date:Date){
	 	let dob = date.getDate()+'/'+("0" + (date.getMonth() + 1)).slice(-2)+'/'+date.getFullYear();
	 	this.Profile.dob = dob;
	 }

	  onLoad(){	
	   	this.userData.getProfile().then(data => {
	   		this.showLoader();
	   		let result: any = {};
	   		result = data;
	   		if(result.status == 200){
	   			var userValues = JSON.parse(result._body).user;
	   			userValues.dob=userValues.dob.split('-').reverse().join("-");
	   			this.Profile = userValues;
	   			this.RecName = this.Profile.recipient_name;
	   			this.RecNumber = this.Profile.recipient_number;
	   			this.hideLoader();
	   		}else{
	   			this.hideLoader();
	   			this.doAlert('Error','Please try again !');
	   		}
	   	});
	  }

	  updateValidate(form: NgForm){
	  	console.log(form);
	  	var rej = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
	  	var isValid = rej.test(this.Profile.email);
	  	console.log(isValid);
	  	if(this.Profile.name == null || this.Profile.name ==""){
	  		this.presentToast("Enter name");
	  	}
	  	else if(this.Profile.mobile == null || this.Profile.mobile == ""){
	  		this.presentToast("Enter mobile No");
	  	}else if(this.Profile.mobile.length < 10){
	  		this.presentToast("Enter 10 digits No");
	  	}
	  	else if(!isValid){
	  		this.presentToast("Enter valid email");
	  	}else if(this.RecName == null || this.RecName == ""){
	  		this.presentToast("Enter recipient name");
	  	}else if(this.RecNumber == null || this.RecNumber == ""){
	  		this.presentToast("Enter recipient number");
	  	}else if(this.RecNumber.length < 10){
	  		this.presentToast("Enter 10 digits Recipient No");
	  	}
	  	else{
	  		this.update();
	  	}
	  }

	  update(){
	  	let userDetails: any={};
	  	userDetails.user={};
	  	userDetails.user = {
	  		name: this.Profile.name,
	  		mobile: this.Profile.mobile,
	  		dob: this.Profile.dob,
	  		email: this.Profile.email,
	  		recipient_name: this.RecName,
	  		recipient_number: this.RecNumber
	  	}
	  	this.userData.updateProfile(userDetails).then(data => {
	   		this.showLoader();
	   		let result: any = {};
	   		result = data;
	   		if(result.user && result.user.authentication_token){
	   			this.Profile = result.user;
	   			this.Profile.dob=result.user.dob.split('-').reverse().join("-");
	   			this.RecName = result.user.recipient_name;
	   			this.RecNumber = result.user.recipient_number;
	   			this.hideLoader();
	   			this.presentToast("Profile updated successfully");
	   		}else{
	   			this.hideLoader();
	   			this.doAlert('Error','Please try again !');
	   		}
	   	});
	  }

	  sameRec(){
	  	if(this.SameRecip){
	  		this.RecName = this.Profile.name;
	   		this.RecNumber = this.Profile.mobile;
	  	}else{
	  		this.RecName = "";
	   		this.RecNumber = "";
	  	}
	  }

	  changePassword(){
	  	this.navCtrl.setRoot(ChangePasPage);
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

	presentToast(msg: any) {
	  this.toastCtrl.create({
	    message: msg,
	    duration: 2000,
	    position: 'bottom'
	  }).present();
	}
}