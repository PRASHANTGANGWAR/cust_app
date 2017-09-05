import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, AlertController, Nav, LoadingController, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { LoginPage } from '../pages/login/login';
import { PaymentDue  } from '../pages/payment-due/payment-due';
import { CalendarPage } from '../pages/calendar/calendar';
import { CategoriesPage } from '../pages/categories/categories';
import { LastFiveOrder  } from '../pages/last-five-order/last-five-order';
import { NutritionValues  } from '../pages/Nutrition-Values/nutrition-values';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { EmailComposer } from '@ionic-native/email-composer';
import { Database } from '../providers/db-provider';

declare var window: any;
export interface PageInterface {
  title: string;
  name?: string;
  component?: any;
  icon?: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
  categories?: boolean;
  calendar?: boolean;
  nutritionValues?: boolean;
  paymentdue?: boolean;
  lastOrders?: boolean;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  private loading :any;
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Main Menu',name: 'CategoriesPage', component: CategoriesPage, icon: 'contacts', categories: true },
    { title: 'My Profile', icon: 'calendar' },
    { title: 'My Orders', icon: 'calendar' },
    { title: 'My Address', icon: 'calendar' },
    { title: 'Nutrition Values', name: 'NutritionValues', component: NutritionValues, icon: 'calendar', nutritionValues: true },
    { title: 'contact us', icon: 'calendar' },
    { title: 'Payment Due', name: 'PaymentDue', component: PaymentDue, icon: 'calendar', paymentdue: true },
    { title: 'Last Five Deliveries', name: 'LastFiveOrder', component: LastFiveOrder, icon: 'calendar', lastOrders: true },
   // { title: 'Prescriptions', name: 'PrescriptionListPage', component: PrescriptionListPage, icon: 'contacts', prescription: true },
    //{ title: 'Calendar', name: 'CalendarPage', component: CalendarPage, icon: 'calendar', calendar: true },
    //{ title: 'Feedback', name: '', component: null, index: 3, icon: 'information-circle' },
    { title: 'Logout', name: '', component: null, icon: 'log-out', logsOut: true },
    //{ title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' }
  ];
  rootPage: any;
  userId: any;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public dataBase: Database,
    public push: Push,
    public splashScreen: SplashScreen,
    public _alert: AlertController,
    public _loading: LoadingController,
    private emailComposer: EmailComposer
  ) {
      this.rootPage = CategoriesPage;
      this.platformReady()
      this.listenToUserEvents();
   }

  openPage(page: PageInterface) {
    if(page.index === 3){
      this.showLoader();
      this.hideLoader();
      this.sendFeedback();
    }
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }
    if(page.categories === true){
      this.showLoader();
      //this.nav.setRoot(PrescriptionListPage);
      this.hideLoader();
    }
    if(page.calendar=== true){ 
      this.showLoader();
      this.nav.setRoot(CalendarPage);
      this.hideLoader();
    }
    if(page.nutritionValues=== true){ 
      this.nav.setRoot(NutritionValues);
    }
    if(page.paymentdue=== true){ 
      this.nav.setRoot(PaymentDue);
    }
    if(page.lastOrders=== true){ 
      this.nav.setRoot(LastFiveOrder);
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menupage.
    if (page.logsOut === true) {
      this.showLoader();
      window.localStorage.removeItem('login_details');
      window.localStorage.removeItem('user_address');
      window.localStorage.removeItem('add_address');
      window.localStorage.removeItem('states');
      window.localStorage.removeItem('prescriptions');
      window.localStorage.removeItem('current_page');
      window.localStorage.removeItem('_qrcode');
      window.localStorage.removeItem('device_token');
      window.localStorage.removeItem('deviceType');
      this.nav.setRoot(LoginPage);
      this.hideLoader();
    } else {
      if(page.index != 3){
          if (this.nav.getActiveChildNavs().length && page.index != undefined) {
            this.nav.getActiveChildNavs()[0].select(page.index);
          // Set the root of the nav with params if it's a tab index
        } else {
            this.nav.setRoot(page.name, params).catch((err: any) => {
              console.log(`Didn't set nav root: ${err}`);
            });
          }
      }
    }

  }

  sendFeedback() {
    this.emailComposer.isAvailable().then((available: boolean) =>{
     if(available) {
       //Now we know we can send
     }
    });

    let email = {
      to: 'yahya.akilan@outlook.com',
      subject: 'Dwak Test Mail',
      isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);
  }

  listenToUserEvents() {
      this.events.subscribe('user:loggedin', () => {
        let user = JSON.parse(window.localStorage.getItem('login_details'));
        this.userId = user.serial;
      });
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.initPushNotification();
      if(this.platform.is('android')){
        window.localStorage.setItem('deviceType',"isandroid");
      }
      if(this.platform.is('ios')){
        window.localStorage.setItem('deviceType',"isIOS");
      }
    });
  }

  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: '981155431666'
      },
      ios: {},
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      //alert('device token -> ' + data.registrationId);
      window.localStorage.setItem('device_token',data.registrationId);
      //TODO - send device token to server
    });
    let that = this;
    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.message);
      let event;
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = that._alert.create({
          title: 'Confirm Action',
          message: 'Take '+data.additionalData.name+' at '+data.additionalData.time,
          buttons: [
            {
              text: 'MISS',
              handler: () => {
                event = "missed";
                let presData :any ={};
                  presData.userid = data.additionalData.userid;
                  presData.prescription_id = data.additionalData.pres_id;
                  presData.status = event;
                  presData.dose_time = data.additionalData.time;
                  presData.time = null;
                  that.showLoader();
                  that.confData.eventScheduler(presData).then(results=>{
                    let resultData : any ={};
                    resultData = results;
                    if(resultData.status == 200){
                      that.hideLoader();
                    }else{
                      that.hideLoader();
                      that.doAlert('Error','something went wrong.');
                    }
                  });
              }
            },
            {
              text: 'POSTPONE', 
              handler: () =>{
                that.presentPrompt(data);
              }
            },
            {
              text: 'TAKE', 
              handler: () =>{
                event = "taken";
                let presData :any ={};
                  presData.userid = data.additionalData.userid;
                  presData.prescription_id = data.additionalData.pres_id;
                  presData.status = event;
                  presData.dose_time = data.additionalData.time;
                  presData.time = null;
                  that.showLoader();
                  that.confData.eventScheduler(presData).then(results=>{
                    let resultData : any ={};
                    resultData = results;
                    if(resultData.status == 200){
                      that.hideLoader();
                    }else{
                      that.hideLoader();
                      that.doAlert('Error','something went wrong.');
                    }
                  });
              }
            }
          ],
          cssClass: 'custom-alert'
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        //that.nav.push(PrescriptionListPage, { message: data.message });
        console.log('Push notification clicked');
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
  }

  presentPrompt(presdata: any) {
      this._alert.create({
      title: 'Postpone Medicine',
      inputs: [
        {
          name: 'postpone_time',
          placeholder: 'In Minutes',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked'+data);
          }
        },
        {
          text: 'POSTPONE',
          handler: data => {
          let post_time = data.postpone_time;
            if (post_time >=1 && post_time <= 120){
              let presData :any ={};
                presData.userid = presdata.additionalData.userid;
                presData.prescription_id = presdata.additionalData.pres_id;
                presData.status = "reschedule";
                presData.dose_time = presdata.additionalData.time;
                presData.time = null;
                this.showLoader();
                this.confData.eventScheduler(presData).then(results=>{
                  let resultData : any ={};
                  resultData = results;
                  if(resultData.status == 200){
                    this.hideLoader();
                  }else{
                    this.hideLoader();
                    this.doAlert('Error','something went wrong.');
                  }
                });
            } else {
              return false;
            }
          }
        }
      ]
    }).present();
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
