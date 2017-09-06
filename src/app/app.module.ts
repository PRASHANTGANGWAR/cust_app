import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { CalendarPage } from '../pages/calendar/calendar';
import { SignupPage } from '../pages/signup/signup';
import { CategoriesPage } from '../pages/categories/categories';
import { ProductListPage } from '../pages/product-list/product-list';
import { PlaceOrderPage } from '../pages/place-order/place-order';
import { MyAddressPage  } from '../pages/my-address/my-address';
import { ViewAddressPage  } from '../pages/view-address/view-address';
import { CheckoutPage } from '../pages/checkout/checkout';
import { CheckoutModalPage } from '../pages/checkout-modal/checkout-modal';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { EmailComposer } from '@ionic-native/email-composer';
import { NgCalendarModule  } from 'ionic2-calendar';
import {Push} from "@ionic-native/push";
import { Facebook  }  from '@ionic-native/facebook';
import { SQLite } from '@ionic-native/sqlite';
import { Database } from '../providers/db-provider';
import { DatePickerModule } from 'ionic3-datepicker';

@NgModule({
  declarations: [
    ConferenceApp,
    LoginPage,
    ResetPassword,
    CalendarPage,
    SignupPage,
    CategoriesPage,
    ProductListPage,
    PlaceOrderPage,
    MyAddressPage,
    ViewAddressPage,
    CheckoutPage,
    CheckoutModalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgCalendarModule,
    DatePickerModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: CalendarPage, name: 'Calendar', segment: 'calendar' },
        { component: CategoriesPage, name: 'Categories', segment: 'categories' },
        { component: ProductListPage, name: 'ProductList', segment: 'productList' },
        { component: PlaceOrderPage, name: 'PlaceOrder', segment: 'placeOrder' },
        { component: MyAddressPage, name: 'MyAddress', segment: 'myAddress' },
        { component: ViewAddressPage, name: 'ViewAddress', segment: 'viewAddress' },
        { component: CheckoutPage, name: 'Checkout', segment: 'checkout' },
        { component: CheckoutModalPage, name: 'CheckoutModal', segment: 'checkoutModal' },
        { component: ResetPassword, name: 'ResetPassword', segment: 'resetPassword' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    LoginPage,
    ResetPassword,
    CalendarPage,
    SignupPage,
    CategoriesPage,
    ProductListPage,
    PlaceOrderPage,
    MyAddressPage,
    ViewAddressPage,
    CheckoutPage,
    CheckoutModalPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    BarcodeScanner,
    EmailComposer,
    Push,
    Facebook,
    SQLite,
    Database
  ]
})
export class AppModule { }
