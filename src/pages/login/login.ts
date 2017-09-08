import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController, NavController, LoadingController, MenuController, Events } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { CategoriesPage } from '../categories/categories';
import { SignupPage } from '../signup/signup';
import { Database } from '../../providers/db-provider';

@Component({
  selector: 'login-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  public flag : boolean = false;
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  private loading :any;
  scanData : {};

  constructor(
    private toastCtrl: ToastController,
    public dataBase: Database,
    public events: Events,
    private navCtrl: NavController, 
    public userData: UserData,
    private _loading: LoadingController,
    public menu: MenuController
    ) { 
      }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.showLoader();
      this.userData.login(this.login.username,this.login.password).then(results=>{
          let resultData : any = {};
           resultData = results;
          if(resultData.status == 200){
            this.userData.userAddress().then(address=>{
              let data : any = {};
              data = address;
              if(data.status == 200){
                  this.deleteTable();
                } else{
                  this.presentToast('something went wrong');
                }
            });
            this.hideLoader();
          } else{
            this.hideLoader();
            this.presentToast('Username and password do not match.');
          }
      });
    }
  }

  deleteTable(){
    this.dataBase.deleteTableData().then(data =>{
      console.log(data);
       this.navCtrl.setRoot(CategoriesPage);
    }); 
  }

  onSignup() {
    this.showLoader();
    this.navCtrl.push(SignupPage);
    this.hideLoader();
  }

  forgotPassword() {
    if(this.login.username.length < 10 || this.login.username.length > 10){
        this.presentToast('Enter 10 digits mobile no.');
    }else{
      this.showLoader();
        this.userData.resetPassword(this.login.username).then(results=>{
          let resultData : any = {};
           resultData = results;
          if(resultData.user){
            this.presentToast('You will get a msg soon.');
            this.hideLoader();
          } else{
            this.hideLoader();
            this.presentToast('something went wrong.');
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

  presentToast(msg: any) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    }).present();
  }
}
