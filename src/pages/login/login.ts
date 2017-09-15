import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, MenuController, Events } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { CategoriesPage } from '../categories/categories';
import { SignupPage } from '../signup/signup';
import { Database } from '../../providers/db-provider';
import { Alerts } from '../../providers/alerts-provider';

@Component({
  selector: 'login-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  public flag : boolean = false;
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  scanData : {};

  constructor(
    public dataBase: Database,
    public events: Events,
    private navCtrl: NavController, 
    public userData: UserData,
    public menu: MenuController,
    public alerts:Alerts
    ) { 
      }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.alerts.showLoader();
      this.userData.login(this.login.username,this.login.password).then(results=>{
          let resultData : any = {};
           resultData = results;
          if(resultData.status == 200){
            this.userData.userAddress().then(address=>{
              this.alerts.hideLoader();
              let data : any = {};
              data = address;
              if(data.status == 200){
                this.navCtrl.setRoot(CategoriesPage);
                  this.deleteTable();
                } else{
                  this.alerts.presentToast('something went wrong');
                }
            });
          } else{
            this.alerts.hideLoader();
            this.alerts.presentToast('Username and password do not match.');
          }
      });
    }
  }

  deleteTable(){
    this.dataBase.deleteTableData().then(data =>{
      console.log(data);
    }); 
  }

  onSignup() {
    this.alerts.showLoader();
    this.navCtrl.push(SignupPage);
    this.alerts.hideLoader();
  }

  forgotPassword() {
    if(this.login.username.length < 10 || this.login.username.length > 10){
        this.alerts.presentToast('Enter 10 digits mobile no.');
    }else{
      this.alerts.showLoader();
        this.userData.forgotPassword(this.login.username).then((res:any)=>{
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
