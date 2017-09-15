import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { SignupOptions } from '../../interfaces/user-options';

import { LoginPage } from '../login/login';
import { Alerts } from '../../providers/alerts-provider';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: SignupOptions = { username: '', email: '', phone:''};
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    private alerts : Alerts
  ) { }

  onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.alerts.showLoader();
        this.userData.signup(
          this.signup.username,
          this.signup.email,
          this.signup.phone
        ).then((res:any)=>{
            this.alerts.hideLoader();
            if(res.status == 200){
            this.alerts.doAlert('Success!','Please login to continue.');
             this.navCtrl.setRoot(LoginPage);
            }
            else if(res.status == 422){
              this.alerts.doAlert('','this number has already been taken');
            } 
            else{
              //form.resetForm();
              this.alerts.doAlert('Error','something went wrong');
          }
        });
    }
  }
}
