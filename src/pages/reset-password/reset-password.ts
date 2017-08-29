import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { resetOptions } from '../../interfaces/user-options';
import { LoginPage } from '../login/login';


@Component({
  selector: 'reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPassword {
  reset: resetOptions = { email: '' };
  submitted = false;
  private loading :any;


    constructor(
      private navCtrl: NavController,
      private _loading: LoadingController,
      private _alert: AlertController,
      private userData: UserData
    ) { }

    onReset(form: NgForm) {
      this.submitted = true;
      if (form.valid) {
        this.showLoader();
        this.userData.resetPassword(this.reset.email).then(results=>{
          this.hideLoader();
            let resultData : any ={};
             resultData = results;
            if(resultData.status == 200){
              this.navCtrl.setRoot(LoginPage);
              this.doAlert('Success!','Check your E-mail for password reset instructions.');
            } else{
              form.resetForm();
              this.doAlert('Error','Email is not registered.');
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
