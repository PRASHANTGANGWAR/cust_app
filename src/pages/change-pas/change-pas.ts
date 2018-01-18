import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Events } from 'ionic-angular';


@Component({
  selector: 'page-change-pas',
  templateUrl: 'change-pas.html',
})
export class ChangePasPage {
	password: any={};
	private loading :any;
  constructor(private _alert: AlertController, public navCtrl: NavController,public userData: UserData, private _loading: LoadingController, private toastCtrl: ToastController, public navParams: NavParams,
  	public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasPage');
  }

  changePassword(){
  	if(this.password.old == null || this.password.old == "" ){
  		this.presentToast("Enter current password");
  	}else if(this.password.new == null || this.password.new == "" ){
  		this.presentToast("Enter new password");
  	}else if(this.password.confirm != this.password.new ){
  		this.presentToast("Password confirmation do not match");
  	}else{
  		this.updatePassword();
  	}
  }

  updatePassword(){
  	let pass: any={};
  	pass.user={};
  	pass.user = {
  		current_password: this.password.old,
  		password: this.password.new,
  		password_confirmation: this.password.confirm
  	}
  	this.userData.resetPassword(pass).then(data => {
	   		this.showLoader();
	   		let result: any = {};
	   		result = data;
	   		if(result.user && result.user.authentication_token){
	   			this.hideLoader();
	   			this.events.publish('user:loggedOut');
	   			this.presentToast("Password is changed");
	   		}else if(result.current_password){
	   			this.hideLoader();
	   			this.doAlert('Error','Current password does not match');
	   		}
	   		else{
	   			this.hideLoader();
	   			this.doAlert('Error','Please try again !');
	   		}
	   	});
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

	doAlert(type: string,message: string) {
	    let alert = this._alert.create({
	      title: type,
	      subTitle: message,
	      buttons: ['OK']
	    });
	    alert.present();
	}

  	presentToast(msg: any) {
	  this.toastCtrl.create({
	    message: msg,
	    duration: 2000,
	    position: 'bottom'
	  }).present();
	}

}
