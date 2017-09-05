import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, AlertController, LoadingController, MenuController, Events } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { CategoriesPage } from '../categories/categories';
import { SignupPage } from '../signup/signup';
import { ResetPassword } from '../reset-password/reset-password';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Database } from '../../providers/db-provider';

declare var window: any;
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
  options :BarcodeScannerOptions;

  constructor(
    public dataBase: Database,
    public events: Events,
    private navCtrl: NavController, 
    public userData: UserData,
    private _loading: LoadingController,
    private _alert: AlertController,
    public menu: MenuController,
    private barcodeScanner: BarcodeScanner
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
                  this.doAlert('Error','something went wrong.');
                }
            });
            this.hideLoader();
          } else{
            this.hideLoader();
            this.doAlert('Error','something went wrong.');
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
    this.showLoader();
    this.flag = true;
    this.navCtrl.push(ResetPassword);
    this.hideLoader();
  }

  // scan QR code
  scan(){
    this.showLoader();
    this.hideLoader();
    this.options = {
        prompt : "Scan your barcode "
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {
      this.scanData = barcodeData;
        window.localStorage.setItem('_qrcode', (this.scanData as any).text);
      if((this.scanData as any).text.length > 0){
        let alert = this._alert.create({
          title: 'Success!',
          message: 'QR code scanned succesfully.Please login or signup to continue',
          buttons: [{ text: 'THANKS'  }]
        });
        alert.present();
      }
    }, (err) => {
        this.doAlert('Unable to scan barcode',err);
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

  ionViewDidEnter() {
    // the root left menu should be disabled on the login page
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the login page
    this.menu.enable(true);
  }
}
