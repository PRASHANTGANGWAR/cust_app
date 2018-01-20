import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform,ModalController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { PaymentDue  } from '../pages/payment-due/payment-due';
import { CategoriesPage } from '../pages/categories/categories';
import { LastFiveOrder  } from '../pages/last-five-order/last-five-order';
import { ContactPage  } from '../pages/Contact-us/contact-us';
import { ProfilePage } from '../pages/profile/profile';
import { ViewAddressPage } from '../pages/view-address/view-address';
import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { Alerts } from '../providers/alerts-provider';
import { Splash } from '../pages/splash/splash';
import { AlertController } from 'ionic-angular';


declare var window: any;
declare let cordova: any;
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
  viewAddress?:boolean;
  editOrder?:boolean;
  nutritionValues?: boolean;
  paymentdue?: boolean;
  lastOrders?: boolean;
  contactUs?: boolean;
  login?: boolean;
  disable?: boolean;
  profile?: boolean;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Main Menu',name: 'CategoriesPage', component: CategoriesPage, icon: 'apps', categories: true },
    { title: 'My Profile', name: 'ProfilePage', component: ProfilePage, icon: 'md-contact', profile: true },
    { title: 'My Orders',name:'MyOrdersPage',component:MyOrdersPage, icon: 'basket',editOrder:true },
    { title: 'Contact Us', name: 'ContactPage', component: ContactPage, icon: 'md-mail', contactUs: true },
    { title: 'Payment Due', name: 'PaymentDue', component: PaymentDue, icon: 'logo-usd', paymentdue: true },
    { title: 'Last Five Deliveries', name: 'LastFiveOrder', component: LastFiveOrder, icon: 'skip-backward', lastOrders: true },
    { title: 'Logout', name: '', component: null, icon: 'log-out', logsOut: true }
  ];
  cashboyPages: PageInterface[] = [
    { title: 'Main Menu',name: 'CategoriesPage', component: CategoriesPage, icon: 'apps', categories: true },
    { title: 'My Profile', icon: 'md-contact', disable: true },
    { title: 'My Orders', icon: 'basket', disable: true  },
    { title: 'Contact Us', name: 'ContactPage', component: ContactPage, icon: 'md-mail', contactUs: true },
    { title: 'Payment Due', name: 'PaymentDue', component: PaymentDue, icon: 'logo-usd', paymentdue: true, disable: true },
    { title: 'Last Five Deliveries', name: 'LastFiveOrder', component: LastFiveOrder, icon: 'skip-backward', lastOrders: true, disable: true },
    { title: 'Login', name: '', component: LoginPage, icon: 'log-in', login: true }
  ];
  rootPage: any;
  userId: any;
  isLogin: boolean = false;
  constructor(
    private alertCtrl: AlertController,
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public alerts: Alerts, 
    public splashScreen: SplashScreen,
    public modalCtrl: ModalController
  ) {
      if(window.localStorage.getItem('login_details')){
        this.isLogin = true;
      }
      this.rootPage = CategoriesPage;
      this.platformReady()
      this.listenToUserEvents();
   }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    if(page.categories === true){
      this.nav.setRoot(CategoriesPage);
    }

    if(page.login=== true){ 
        this.nav.push(LoginPage);
    }

    if(page.viewAddress === true){
      this.alerts.showLoader();
      this.nav.setRoot(ViewAddressPage);
      this.alerts.hideLoader();
    }

    if(page.editOrder === true){
      this.nav.setRoot(MyOrdersPage);
    }
    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menupage.
    if (page.logsOut === true) {     
    let alert = this.alertCtrl.create({
      title: 'Logout',
      message: 'Do you want to logout?',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'CONFIRM',
          handler: () => {
            this.alerts.showLoader();
            this.logoutPassChange();
          }
        }
      ]
    });
    alert.present();
    
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
  
  listenToUserEvents() {
      this.events.subscribe('user:loggedin', () => {
        this.isLogin = true;
      });
      //user logged out after password change
      this.events.subscribe('user:loggedOut', () => {
        this.logoutPassChange();
      });
  }

  logoutPassChange(){
    this.isLogin = false;
    window.localStorage.removeItem('login_details');
    window.localStorage.removeItem('user_address');
    window.localStorage.removeItem('add_address');
    window.localStorage.removeItem('states');
    window.localStorage.removeItem('prescriptions');
    window.localStorage.removeItem('current_page');
    window.localStorage.removeItem('_qrcode');
    window.localStorage.removeItem('device_token');
    this.nav.setRoot(CategoriesPage);
    this.alerts.hideLoader();
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      //this.splashScreen.hide();
      let splash = this.modalCtrl.create(Splash);
            splash.present();
      if(this.platform.is('android')){
        window.localStorage.setItem('deviceType',"android");
      }
      if(this.platform.is('ios')){
        window.localStorage.setItem('deviceType',"ios");
      }
      if(window.cordova && window.cordova.plugins.Keyboard) {

        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      }
      this.platform.registerBackButtonAction(() => {
         if(this.nav.canGoBack()){
           this.nav.pop();
         }else{
          
         }
      });
    });
  }
}