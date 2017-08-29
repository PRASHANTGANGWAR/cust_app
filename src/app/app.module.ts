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
import { PrescriptionListPage } from '../pages/prescription-list/prescription-list';
import { ProductListPage } from '../pages/product-list/product-list';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { EmailComposer } from '@ionic-native/email-composer';
import { NgCalendarModule  } from 'ionic2-calendar';
import {Push} from "@ionic-native/push";
import { Facebook  }  from '@ionic-native/facebook';
import { SQLite } from '@ionic-native/sqlite';
import { Database } from '../providers/db-provider';

@NgModule({
  declarations: [
    ConferenceApp,
    LoginPage,
    ResetPassword,
    CalendarPage,
    SignupPage,
    PrescriptionListPage,
    ProductListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgCalendarModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: CalendarPage, name: 'Calendar', segment: 'calendar' },
        { component: PrescriptionListPage, name: 'PrescriptionList', segment: 'prescriptionList' },
        { component: ProductListPage, name: 'ProductList', segment: 'productList' },
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
    PrescriptionListPage,
    ProductListPage
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
