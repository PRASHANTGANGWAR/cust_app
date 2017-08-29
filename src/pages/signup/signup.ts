import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, AlertController, LoadingController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { SignupOptions } from '../../interfaces/user-options';

import { LoginPage } from '../login/login';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: SignupOptions = { username: '', email: '', phone:''};
  submitted = false;
  private loading :any;

  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    private _alert: AlertController,
    private _loading: LoadingController
  ) { }

  onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.showLoader();
        this.userData.signup(
          this.signup.username,
          this.signup.email,
          this.signup.phone
        ).then(results=>{
            this.hideLoader();
            let resultData : any ={};
             resultData = results;
            if(resultData.status == 200){
            this.doAlert('Success!','Please login to continue.');
             this.navCtrl.setRoot(LoginPage);
            } else{
              //form.resetForm();
              this.doAlert('Error','something went wrong');
          }
        });
    }
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
}
