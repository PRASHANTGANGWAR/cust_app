import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, MenuController, Events } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { CategoriesPage } from '../categories/categories';
import { SignupPage } from '../signup/signup';
import { Alerts } from '../../providers/alerts-provider';

@Component({
  selector: 'login-user',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  public flag : boolean = false;
  login: UserOptions = { mobile: '', password: '' };
  submitted = false;
  loginForm:any;

  constructor(
    public events: Events,
    private navCtrl: NavController, 
    public userData: UserData,
    public menu: MenuController,
    public alerts:Alerts,
    private fb: FormBuilder
    ) { 
      }

 ngOnInit() {
    this.loginForm = this.fb.group({
      'mobile':[null,[Validators.required,Validators.pattern(/^[\s()+-]*([0-9][\s()+-]*){1,10}$/)]],
      'password':[null,[Validators.required]]
    });
  } 

  onLogin() {
    if (this.loginForm.valid) {
      this.alerts.showLoader();
      this.userData.login(this.login.mobile,this.login.password).then(results=>{
          let resultData : any = {};
           resultData = results;
          if(resultData.status == 200){
            this.userData.userAddress().then(address=>{
              this.alerts.hideLoader();
              let data : any = {};
              data = address;
              if(data.status == 200){
                this.navCtrl.setRoot(CategoriesPage);
                } else{
                  this.alerts.presentToast('something went wrong');
                }
            });
          } else{
            this.alerts.hideLoader();
            this.alerts.presentToast('Username and password do not match.');
          }
      });
    }else{
      this.submitted = true;
      return false;
    }
  }

  onSignup() {
    this.alerts.showLoader();
    this.navCtrl.push(SignupPage);
    this.alerts.hideLoader();
  }

  forgotPassword() {
    if(this.login.mobile.length < 10 || this.login.mobile.length > 10){
        this.alerts.presentToast('Enter 10 digits mobile no.');
    }else{
      this.alerts.showLoader();
        this.userData.forgotPassword(this.login.mobile).then((res:any)=>{
          this.alerts.hideLoader();
          if(res.status == 200){
            this.alerts.presentToast('You will recieve a message soon.');
          } 
          else if(res.status == 500){
            this.alerts.presentToast('Mobile number is not registered');
          }
          else{
            this.alerts.presentToast('something went wrong.');
          }
      });
    }
    
  }
}
