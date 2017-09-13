import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { ConferenceApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { CategoriesPage } from '../pages/categories/categories';
import { ProductListPage } from '../pages/product-list/product-list';
import { PlaceOrderPage } from '../pages/place-order/place-order';
import { MyAddressPage  } from '../pages/my-address/my-address';
import { ViewAddressPage  } from '../pages/view-address/view-address';
import { NutritionValues  } from '../pages/Nutrition-Values/nutrition-values';
import { PaymentDue  } from '../pages/payment-due/payment-due';
import { ContactPage  } from '../pages/Contact-us/contact-us';
import { LastFiveOrder  } from '../pages/last-five-order/last-five-order';
import { ProfilePage } from '../pages/profile/profile';
import { ChangePasPage } from '../pages/change-pas/change-pas';
import { CheckoutPage } from '../pages/checkout/checkout';
import { CheckoutModalPage } from '../pages/checkout-modal/checkout-modal';
import { CurrentOrderPage } from '../pages/current-order/current-order';
import { EditOrderPage } from '../pages/edit-order/edit-order';
import { SetNonavailabilityPage } from '../pages/set-nonavailability/set-nonavailability';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { Alerts } from '../providers/alerts-provider';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';
import { NgCalendarModule  } from 'ionic2-calendar';
import { Push } from "@ionic-native/push";
import { Facebook  }  from '@ionic-native/facebook';
import { SQLite } from '@ionic-native/sqlite';
import { Database } from '../providers/db-provider';
import { DatePickerModule } from 'ionic3-datepicker';

@NgModule({
  declarations: [
    ConferenceApp,
    LoginPage,
    SignupPage,
    CategoriesPage,
    ProductListPage,
    ChangePasPage,
    PlaceOrderPage,
    MyAddressPage,
    ViewAddressPage,
    NutritionValues,
    PaymentDue,
    ContactPage,
    ProfilePage,
    LastFiveOrder,
    CheckoutPage,
    CheckoutModalPage,
    CurrentOrderPage,
    EditOrderPage,
    SetNonavailabilityPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgCalendarModule,
    DatePickerModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: CategoriesPage, name: 'Categories', segment: 'categories' },
        { component: ProductListPage, name: 'ProductList', segment: 'productList' },
        { component: PlaceOrderPage, name: 'PlaceOrder', segment: 'placeOrder' },
        { component: MyAddressPage, name: 'MyAddress', segment: 'myAddress' },
        { component: ViewAddressPage, name: 'ViewAddress', segment: 'viewAddress' },
        { component: NutritionValues, name: 'NutritionValues', segment: 'nutritionValues' },
        { component: PaymentDue, name: 'PaymentDue', segment: 'paymentDue' },
        { component: ContactPage, name: 'ContactPage', segment: 'contactUs' },
        { component: LastFiveOrder, name: 'LastFiveOrder', segment: 'lastFiveOrder' },
        { component: CheckoutPage, name: 'Checkout', segment: 'checkout' },
        { component: CheckoutModalPage, name: 'CheckoutModal', segment: 'checkoutModal' },
        { component: CurrentOrderPage, name: 'CurrentOrder', segment: 'currentOrder' },
        { component: EditOrderPage, name: 'EditOrder', segment: 'editOrder' },
        { component: SetNonavailabilityPage, name: 'SetNonavailability', segment: 'setNonavailability' },
        { component: ProfilePage, name: 'ProfilePage', segment: 'profile' },
        { component: ChangePasPage, name: 'ChangePasPage', segment: 'changePassword' },
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
    SignupPage,
    CategoriesPage,
    ProductListPage,
    PlaceOrderPage,
    ChangePasPage,
    MyAddressPage,
    ViewAddressPage,
    NutritionValues,
    PaymentDue,
    ProfilePage,
    ContactPage,
    LastFiveOrder,
    CheckoutPage,
    CheckoutModalPage,
    CurrentOrderPage,
    EditOrderPage,
    SetNonavailabilityPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    Alerts,
    InAppBrowser,
    SplashScreen,
    BarcodeScanner,
    EmailComposer,
    CallNumber,
    Push,
    Facebook,
    SQLite,
    DatePipe,
    Database
  ]
})
export class AppModule { }
