webpackJsonp([0],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaceOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_conference_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__my_address_my_address__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__categories_categories__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__checkout_checkout__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_alerts_provider__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PlaceOrderPage = (function () {
    function PlaceOrderPage(navCtrl, _alert, confData, alerts) {
        this.navCtrl = navCtrl;
        this._alert = _alert;
        this.confData = confData;
        this.alerts = alerts;
        this.initDate = new Date();
        var data = JSON.parse(window.localStorage.getItem('user_address'));
        this.initDate.setDate(this.initDate.getDate() + 1);
        this.showAddress(data);
        this.getAllOrders();
    }
    PlaceOrderPage.prototype.getAllOrders = function () {
        var _this = this;
        this.confData.getAllOrders().then(function (data) {
            if (data.status == 200) {
                //do nothing
            }
            else {
                _this.alerts.presentToast(data.statusText);
            }
        });
    };
    PlaceOrderPage.prototype.showAddress = function (data) {
        this.alerts.showLoader();
        if (data.addresses.length == 0) {
            this.alerts.hideLoader();
            this.presentConfirm();
        }
        else {
            this.alerts.hideLoader();
            this.address = data.addresses[0];
        }
    };
    PlaceOrderPage.prototype.setDate = function (date) {
        var today = new Date();
        today.setDate(today.getDate() + 1);
        if (date.getDate() >= today.getDate()) {
            this.initDate = date;
        }
        else {
            this.alerts.presentToast("Please choose correct date");
        }
    };
    PlaceOrderPage.prototype.addAddressPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__my_address_my_address__["a" /* MyAddressPage */], { isAddress: true });
    };
    PlaceOrderPage.prototype.checkoutPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__checkout_checkout__["a" /* CheckoutPage */], { deliveryDate: this.initDate });
    };
    PlaceOrderPage.prototype.presentConfirm = function () {
        var _this = this;
        var alert = this._alert.create({
            message: 'Please add one address.',
            buttons: [
                {
                    text: 'CANCEL',
                    handler: function () {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__categories_categories__["a" /* CategoriesPage */]);
                    }
                },
                {
                    text: 'ADD',
                    handler: function () {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__my_address_my_address__["a" /* MyAddressPage */]);
                    }
                }
            ]
        });
        alert.present();
    };
    return PlaceOrderPage;
}());
PlaceOrderPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'place-order',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/place-order/place-order.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle start>\n      <ion-icon name="md-menu"></ion-icon>\n    </button>\n    <ion-title text-uppercase>Place Order</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card class=address-card *ngIf="address" padding>\n    <ion-list class="selection" padding>\n      <ion-item no-lines>\n         <ion-icon name="md-calendar" item-left></ion-icon>Delivery Date : \n        <span ion-datepicker (ionChanged)="setDate($event);" [value]="initDate"\n  	 	   clear class="ScheduleDate">\n  		    <span>{{initDate | date:\'dd/MM/yyyy\'}}</span>\n  		  </span>\n      </ion-item>\n\n      <ion-item no-lines>\n        <ion-icon name="md-alarm" item-left></ion-icon>Delivery Time : 5-7 AM\n      </ion-item>\n    </ion-list>\n  <br>\n    <ion-card-content>\n      <ion-list class="address" padding>\n        <ion-card-title padding class="address-type">{{address.address_type}}</ion-card-title>\n       	 <ion-item no-lines>{{address.name}}</ion-item>\n         <ion-item no-lines>{{address.area.name}},</ion-item>\n         <ion-item no-lines>{{address.area.city.name}}</ion-item>\n         <ion-item no-lines>{{address.area.state.name}}</ion-item>\n        </ion-list>\n   	</ion-card-content>\n </ion-card>\n <div style="padding: 25px">\n    <button color="primary" ion-button round block (click)="addAddressPage()">Edit Address</button>\n    <button color="secondary"  ion-button round block (click)="checkoutPage()">Select\n    Address</button>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/place-order/place-order.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_conference_data__["a" /* ConferenceData */],
        __WEBPACK_IMPORTED_MODULE_6__providers_alerts_provider__["a" /* Alerts */]])
], PlaceOrderPage);

//# sourceMappingURL=place-order.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyAddressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_data__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_conference_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__place_order_place_order__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alerts_provider__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyAddressPage = (function () {
    function MyAddressPage(confData, userData, navCtrl, navParams, alerts) {
        this.confData = confData;
        this.userData = userData;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alerts = alerts;
        this.address = { addressinfo: '' };
        this.submitted = false;
        this.city = "";
        this.area = "";
        this.title = "";
        this.cities = {};
        this.states = [];
        this.cityOption = [];
        this.areaOption = [];
        this.local = "";
        this.type = "Home";
        this.isAddress = false;
        this.isAddress = navParams.get('isAddress');
        this.onLoad();
    }
    MyAddressPage.prototype.selectOption = function (value, area, local) {
        console.log(value);
        for (var i = 0; i < this.states.length; i++) {
            if (this.states[i].name == value) {
                this.cityOption = this.states[i].cities;
                if (area != "null") {
                    for (var j = 0; j < this.states[i].cities.length; j++) {
                        if (this.states[i].cities[j].name == area) {
                            this.areaOption = this.states[i].cities[j].areas;
                            this.local = local;
                        }
                    }
                }
                else {
                    this.areaOption = this.states[i].cities[0].areas;
                    this.local = this.states[i].cities[0].areas[0].id;
                }
            }
        }
    };
    MyAddressPage.prototype.selectOptionCity = function (value) {
        console.log(value);
        for (var j = 0; j < this.cityOption.length; j++) {
            if (this.cityOption[j].name == value) {
                this.areaOption = this.cityOption[j].areas;
                this.local = this.cityOption[j].areas[0].id;
            }
        }
    };
    MyAddressPage.prototype.onLoad = function () {
        var _this = this;
        this.alerts.showLoader();
        this.confData.states().then(function (data) {
            console.log(data);
            _this.states = JSON.parse(window.localStorage.getItem('states'));
            var result = JSON.parse(window.localStorage.getItem('user_address'));
            var st = "";
            if (_this.isAddress) {
                _this.alerts.hideLoader();
                _this.city = result.addresses[0].area.state.name;
                _this.area = result.addresses[0].area.city.name;
                _this.local = result.addresses[0].area.id;
                _this.address.addressinfo = result.addresses[0].name;
                _this.type = result.addresses[0].address_type;
                _this.title = "Update Address";
                _this.selectOption(_this.city, _this.area, _this.local);
            }
            else {
                _this.alerts.hideLoader();
                _this.title = "Add New Address";
                st = _this.states[0].name;
                _this.selectOption(st, "null", "null");
                console.log(_this.states);
            }
        });
    };
    MyAddressPage.prototype.onSubmit = function (form, value) {
        var _this = this;
        this.alerts.showLoader();
        this.submitted = true;
        console.log(value);
        if (form.valid) {
            var address = {};
            address.address_type = value.type;
            address.area_id = value.local;
            address.name = value.addressinfo;
            this.userData.addAddress(address).then(function (result) {
                _this.alerts.hideLoader();
                var data = {};
                data = result;
                if (data.status == 201) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__place_order_place_order__["a" /* PlaceOrderPage */]);
                }
                else {
                    _this.alerts.doAlert('Error', 'something went wrong.');
                }
            });
        }
    };
    MyAddressPage.prototype.onUpdate = function (form, value) {
        var _this = this;
        this.alerts.showLoader();
        this.submitted = true;
        console.log(value);
        if (form.valid) {
            var address = {};
            address.address_type = value.type;
            address.area_id = value.local;
            address.name = value.addressinfo;
            this.userData.updateAddress(address).then(function (result) {
                _this.alerts.hideLoader();
                var data = {};
                data = result;
                if (data.status == 200) {
                    _this.alerts.presentToast("Address updated successfully.");
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__place_order_place_order__["a" /* PlaceOrderPage */]);
                }
                else {
                    _this.alerts.doAlert('Error', 'something went wrong.');
                }
            });
        }
    };
    return MyAddressPage;
}());
MyAddressPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'my-address',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/my-address/my-address.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle start>\n      <ion-icon name="md-menu"></ion-icon>\n    </button>\n    <ion-title text-uppercase>My Address</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="form-content" text-center>\n  <ion-title text-uppercase>{{title}}</ion-title>\n  <br>\n  <div class="Loginpage">\n    <div class="formContainer">\n      <form #addressForm="ngForm" novalidate>\n           <ion-list class="app-form" no-margin>\n            <div no-lines radio-group [(ngModel)]="type" name="type">\n              <ion-item no-lines>\n              <ion-label text-uppercase>home</ion-label>\n               <ion-radio value="Home"></ion-radio>\n            </ion-item>\n            <ion-item no-lines>\n              <ion-label text-uppercase>office</ion-label>\n              <ion-radio value="Office"></ion-radio>\n            </ion-item>\n            </div>\n            <ion-item no-lines>\n              <select [ngModel]="city" name="city"\n                 (ngModelChange)="selectOption($event,\'null\',\'null\')">\n                      <option *ngFor="let state of states">{{state.name}}</option>\n                  </select>\n            </ion-item>\n\n            <ion-item no-lines>\n              <select [ngModel]="area" name="area"(ngModelChange)="selectOptionCity($event)">\n                <option *ngFor="let city of cityOption">{{city.name}}</option>\n              </select>\n            </ion-item>\n\n            <ion-item no-lines>\n              <select [ngModel]="local" name="local">\n                <option *ngFor="let area of areaOption" [attr.value]="area.id">{{area.name}}</option>\n              </select>\n            </ion-item>\n\n            <ion-item no-lines>\n              <ion-textarea [(ngModel)]="address.addressinfo" placeholder="Address" name="addressinfo" #addressinfo="ngModel" style=" min-height: 100px;" spellcheck="false" required></ion-textarea>\n            </ion-item>\n            <p ion-text [hidden]="addressinfo.valid || submitted == false" color="danger" padding-left>\n                Address is required\n            </p>\n          </ion-list>\n          <div padding [hidden]="!isAddress">\n              <button color="primary" (click)="onUpdate(addressForm,addressForm.value)" type="submit" ion-button block round text-uppercase>update</button>\n          </div>\n\n          <div padding [hidden]="isAddress">\n              <button color="secondary" (click)="onSubmit(addressForm,addressForm.value)" type="submit" ion-button block round text-uppercase>save</button>\n          </div>\n      </form>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/my-address/my-address.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_conference_data__["a" /* ConferenceData */],
        __WEBPACK_IMPORTED_MODULE_2__providers_user_data__["a" /* UserData */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_5__providers_alerts_provider__["a" /* Alerts */]])
], MyAddressPage);

//# sourceMappingURL=my-address.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_data__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__change_pas_change_pas__ = __webpack_require__(218);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfilePage = (function () {
    function ProfilePage(datepipe, userData, navCtrl, _loading, toastCtrl, _alert) {
        this.datepipe = datepipe;
        this.userData = userData;
        this.navCtrl = navCtrl;
        this._loading = _loading;
        this.toastCtrl = toastCtrl;
        this._alert = _alert;
        this.Profile = {};
        this.SameRecip = true;
        this.initDate = new Date();
        this.check = true;
        this.onLoad();
    }
    ProfilePage.prototype.onLoad = function () {
        var _this = this;
        this.userData.getProfile().then(function (data) {
            _this.showLoader();
            var result = {};
            result = data;
            if (result.status == 200) {
                _this.Profile = JSON.parse(result._body).user;
                _this.RecName = _this.Profile.name;
                _this.RecNumber = _this.Profile.mobile;
                _this.hideLoader();
            }
            else {
                _this.hideLoader();
                _this.doAlert('Error', 'Please try again !');
            }
        });
    };
    ProfilePage.prototype.updateValidate = function (form) {
        console.log(form);
        var rej = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        var isValid = rej.test(this.Profile.email);
        console.log(isValid);
        if (this.Profile.name == null || this.Profile.name == "") {
            this.presentToast("Enter name");
        }
        else if (this.Profile.mobile == null || this.Profile.mobile == "") {
            this.presentToast("Enter mobile No");
        }
        else if (this.Profile.mobile.length < 10) {
            this.presentToast("Enter 10 digits No");
        }
        else if (!isValid) {
            this.presentToast("Enter valid email");
        }
        else if (this.RecName == null || this.RecName == "") {
            this.presentToast("Enter recipient name");
        }
        else if (this.RecNumber == null || this.RecNumber == "") {
            this.presentToast("Enter recipient number");
        }
        else if (this.RecNumber.length < 10) {
            this.presentToast("Enter 10 digits Recipient No");
        }
        else {
            this.update();
        }
    };
    ProfilePage.prototype.update = function () {
        var _this = this;
        var userDetails = {};
        userDetails.user = {};
        userDetails.user = {
            name: this.Profile.name,
            mobile: this.Profile.mobile,
            dob: this.Profile.dob,
            email: this.Profile.email,
            recipient_name: this.RecName,
            recipient_number: this.RecNumber
        };
        this.userData.updateProfile(userDetails).then(function (data) {
            _this.showLoader();
            var result = {};
            result = data;
            if (result.user && result.user.authentication_token) {
                _this.Profile = result.user;
                _this.RecName = result.user.recipient_name;
                _this.RecNumber = result.user.recipient_number;
                _this.hideLoader();
                _this.presentToast("Profile updated successfully");
            }
            else {
                _this.hideLoader();
                _this.doAlert('Error', 'Please try again !');
            }
        });
    };
    ProfilePage.prototype.sameRec = function () {
        if (this.SameRecip) {
            this.RecName = this.Profile.name;
            this.RecNumber = this.Profile.mobile;
        }
        else {
            this.RecName = "";
            this.RecNumber = "";
        }
    };
    ProfilePage.prototype.changePassword = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__change_pas_change_pas__["a" /* ChangePasPage */]);
    };
    ProfilePage.prototype.doAlert = function (type, message) {
        var alert = this._alert.create({
            title: type,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    ProfilePage.prototype.showLoader = function () {
        this.loading = this._loading.create({
            content: 'Please wait...',
        });
        this.loading.present();
    };
    ProfilePage.prototype.hideLoader = function () {
        this.loading.dismiss();
    };
    ProfilePage.prototype.presentToast = function (msg) {
        this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'bottom'
        }).present();
    };
    return ProfilePage;
}());
ProfilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'profile',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/profile/profile.html"*/'<ion-header>\n	<ion-navbar color="primary">\n		<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>My Profile</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="form-content" text-center>\n\n <ion-grid>\n    <ion-row>\n      <ion-col  class="amount">\n         <ion-card-title>Due Amount </ion-card-title>\n      </ion-col>\n      <ion-col col-4 text-wrap no-lines class="bal">\n         <ion-card-title>\n        <span>&#8377;</span> {{Profile.due_balance}}\n         </ion-card-title>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col class="amount">\n         <ion-card-title>Bill Amount </ion-card-title>\n      </ion-col>\n      <ion-col col-4 text-wrap no-lines class="bal">\n         <ion-card-title>\n        <span>&#8377;</span> {{Profile.billing_amount}}\n         </ion-card-title>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n<div class="Loginpage">\n<div class="formContainer">\n<form #userForm="ngForm" novalidate>\n    <ion-list class="app-form" no-margin>\n      <ion-item no-lines>\n        <ion-icon name="ios-person-outline" item-left></ion-icon>\n        <ion-input [(ngModel)]="Profile.name" class="forminput" placeholder="Name" name="name" type="text" spellcheck="false" autocapitalize="off"\n          required>\n        </ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-icon name="md-tablet-portrait" item-left></ion-icon>\n        <ion-input class="forminput" name="phone" placeholder="Registered Mobile Number" [(ngModel)]="Profile.mobile" type="tel" maxlength="10" required>\n        </ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-icon name="ios-at-outline" item-left></ion-icon>\n        <ion-input class="forminput" placeholder="Email" name="email" [(ngModel)]="Profile.email" type="email" pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" required>\n        </ion-input>\n      </ion-item>\n\n      <ion-item>\n       <ion-icon name="md-calendar" item-left></ion-icon>\n        <ion-input  class="forminput"  [(ngModel)]="Profile.dob" name="dob" type="date" placeholder="Date Of Birth(optional)">\n        </ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label style="color:#999999;font-size:17px;">Same as above</ion-label>\n        <ion-checkbox [(ngModel)]="SameRecip" name="check" (click)="sameRec(userForm)" value="SameRecip">Same as above</ion-checkbox>\n      </ion-item>\n\n      <ion-item>\n        <ion-icon name="ios-person-outline" item-left></ion-icon>\n        <ion-input class="forminput" name="recName" placeholder="Recipient Name" [(ngModel)]="RecName" min="10" type="text" placeholder="Recipient Name" required>\n        </ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-icon name="md-tablet-portrait" item-left></ion-icon>\n        <ion-input class="forminput" name="recNumber" [(ngModel)]="RecNumber" type="tel" maxlength="10" placeholder="Recipient Number" required>\n        </ion-input>\n      </ion-item>\n\n    </ion-list>\n\n	<button color="primary" ion-button (click)="updateValidate(userForm)" type="submit" round block>Update</button>\n	<button color="primary" ion-button (click)="changePassword(userForm)" type="submit" round block>Change Password</button>\n  \n  </form>\n</div>\n</div>\n</ion-content>'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/profile/profile.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* DatePipe */],
        __WEBPACK_IMPORTED_MODULE_3__providers_user_data__["a" /* UserData */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
], ProfilePage);

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 122:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 122;

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserData = (function () {
    function UserData(events, http) {
        this.events = events;
        this.http = http;
        this.baseUrl = 'http://ec2-52-66-32-175.ap-south-1.compute.amazonaws.com';
    }
    UserData.prototype.login = function (username, password) {
        var _this = this;
        var deviceType = window.localStorage.getItem('deviceType');
        console.log(username + "" + password);
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        var data = {};
        data.app_version = "2.1";
        data.login = username;
        data.mobile_key = "";
        data.mobile_type = deviceType;
        data.password = password;
        console.log(JSON.stringify({ user: data }));
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* RequestMethod */].Post,
            headers: headers,
            body: JSON.stringify({ user: data }),
            url: this.baseUrl + '/users/sign_in'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
                window.localStorage.setItem('login_details', JSON.stringify(res.json().user));
                _this.events.publish('user:loggedin');
            }, function (err) {
                resolve(err);
            });
        });
    };
    ;
    UserData.prototype.signup = function (username, email, phone) {
        var _this = this;
        console.log(username + "" + email + "" + phone);
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ "Accept": "application/json", 'Content-Type': 'application/json' });
        var data = {};
        data.dob = "";
        data.email = email;
        data.mobile = phone;
        data.name = username;
        data.recipient_name = username;
        data.recipient_number = phone;
        data.role = "4";
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* RequestMethod */].Post,
            headers: headers,
            body: JSON.stringify({ user: data }),
            url: this.baseUrl + '/users'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                resolve(err);
            });
        });
    };
    ;
    UserData.prototype.resetPassword = function (password) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ "Accept": "application/json", 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* RequestMethod */].Put,
            headers: headers,
            body: password,
            url: this.baseUrl + '/users/change_password'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                resolve(err.json());
            });
        });
    };
    ;
    UserData.prototype.updateProfile = function (userData) {
        var _this = this;
        console.log(userData);
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile, 'X-User-Token': user.authentication_token });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* RequestMethod */].Put,
            headers: headers,
            body: userData,
            url: this.baseUrl + '/users/update_details'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                resolve(err.json());
            });
        });
    };
    ;
    UserData.prototype.forgotPassword = function (phone) {
        var _this = this;
        var data = {};
        data.user = {
            mobile: phone
        };
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ "Accept": "application/json", 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* RequestMethod */].Put,
            headers: headers,
            body: data,
            url: this.baseUrl + '/users/forgot_password'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                resolve(err);
            });
        });
    };
    UserData.prototype.userAddress = function () {
        var _this = this;
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile, 'X-User-Token': user.authentication_token });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* RequestMethod */].Get,
            headers: headers,
            url: this.baseUrl + '/users/addresses'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
                window.localStorage.setItem('user_address', JSON.stringify(res.json().user));
            }, function (err) {
                resolve(err);
            });
        });
    };
    UserData.prototype.addAddress = function (address) {
        var _this = this;
        var data = { addresses: [] };
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile, 'X-User-Token': user.authentication_token });
        address.mobile = user.mobile;
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* RequestMethod */].Post,
            headers: headers,
            body: JSON.stringify({ address: address }),
            url: this.baseUrl + '/addresses'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
                data.addresses.push(res.json());
                window.localStorage.setItem('user_address', JSON.stringify(data));
            }, function (err) {
                resolve(err);
            });
        });
    };
    UserData.prototype.updateAddress = function (address) {
        var _this = this;
        var update = { addresses: [] };
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var data = JSON.parse(window.localStorage.getItem('user_address'));
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile, 'X-User-Token': user.authentication_token });
        address.mobile = user.mobile;
        var address_id = data.addresses[0].id;
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* RequestMethod */].Put,
            headers: headers,
            body: JSON.stringify({ address: address }),
            url: this.baseUrl + '/addresses/' + address_id
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
                update.addresses.push(res.json());
                window.localStorage.setItem('user_address', JSON.stringify(update));
            }, function (err) {
                resolve(err);
            });
        });
    };
    UserData.prototype.nutritionValues = function () {
        var _this = this;
        // let user = JSON.parse(window.localStorage.getItem('login_details'));
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* RequestMethod */].Get,
            headers: headers,
            url: this.baseUrl + '/nutrition_values'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
                // window.localStorage.setItem('user_address', JSON.stringify(res.json().user));
            }, function (err) {
                resolve(err);
            });
        });
    };
    UserData.prototype.getProfile = function () {
        var _this = this;
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile, 'X-User-Token': user.authentication_token });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* RequestMethod */].Get,
            headers: headers,
            url: this.baseUrl + '/current_customer'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
                // window.localStorage.setItem('user_address', JSON.stringify(res.json().user));
            }, function (err) {
                resolve(err);
            });
        });
    };
    UserData.prototype.paymentDue = function () {
        var _this = this;
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile, 'X-User-Token': user.authentication_token });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* RequestMethod */].Get,
            headers: headers,
            url: this.baseUrl + '/current_customer'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
                // window.localStorage.setItem('user_address', JSON.stringify(res.json().user));
            }, function (err) {
                resolve(err);
            });
        });
    };
    UserData.prototype.lastOrders = function () {
        var _this = this;
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile, 'X-User-Token': user.authentication_token });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* RequestMethod */].Get,
            headers: headers,
            params: null,
            url: this.baseUrl + '/deliveries/customer_recent_delivered_deliveries'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
                // window.localStorage.setItem('user_address', JSON.stringify(res.json().user));
            }, function (err) {
                resolve(err);
            });
        });
    };
    return UserData;
}());
UserData = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
], UserData);

//# sourceMappingURL=user-data.js.map

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Alerts; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Alerts = (function () {
    function Alerts(toastCtrl, _loading, _alert) {
        this.toastCtrl = toastCtrl;
        this._loading = _loading;
        this._alert = _alert;
    }
    Alerts.prototype.presentToast = function (msg) {
        this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'bottom'
        }).present();
    };
    Alerts.prototype.showLoader = function () {
        this.loading = this._loading.create({
            content: 'Please wait...',
        });
        this.loading.present();
    };
    Alerts.prototype.hideLoader = function () {
        this.loading.dismiss();
    };
    Alerts.prototype.doAlert = function (type, message) {
        var alert = this._alert.create({
            title: type,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    return Alerts;
}());
Alerts = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], Alerts);

//# sourceMappingURL=alerts-provider.js.map

/***/ }),

/***/ 163:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 163;

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__place_order_place_order__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alerts_provider__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProductListPage = (function () {
    function ProductListPage(navParams, navCtrl, alerts) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.alerts = alerts;
        var id = navParams.get('id');
        this.getProducts(id);
    }
    ProductListPage.prototype.getProducts = function (id) {
        this.alerts.showLoader();
        var categories = JSON.parse(window.localStorage.getItem('categories'));
        this.products = categories[id].products;
        this.alerts.hideLoader();
    };
    ProductListPage.prototype.additionalData = function () {
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        if (user) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__place_order_place_order__["a" /* PlaceOrderPage */]);
        }
        else {
            this.alerts.showLoader();
            this.alerts.presentToast('Please login first');
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
            this.alerts.hideLoader();
        }
    };
    return ProductListPage;
}());
ProductListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'product-list',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/product-list/product-list.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle start>\n      <ion-icon name="md-menu"></ion-icon>\n    </button>\n    <ion-title text-uppercase>Place Order</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card class="card-details" *ngFor="let prod of products; let i = index" \n  (click)="additionalData()">\n    <img src="{{prod.image}}"/>\n    <div>\n      <ion-card-content>\n        <ion-card-title>\n          {{prod.display_name}} - {{prod.name}}\n        </ion-card-title>\n	    <h4 class="price">MRP:{{prod.price | currency:\'INR\':true}}</h4>\n	    <h3>{{\'Save:\'+prod.discount}}</h3>\n	    <h3 class="price">{{prod.price_with_discount | currency:\'INR\':true}}</h3>\n        <p>\n         {{prod.description}}\n        </p>\n      </ion-card-content>\n      \n    </div>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/product-list/product-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_alerts_provider__["a" /* Alerts */]])
], ProductListPage);

//# sourceMappingURL=product-list.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_conference_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkout_modal_checkout_modal__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__current_order_current_order__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alerts_provider__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CheckoutPage = (function () {
    function CheckoutPage(modalCtrl, navCtrl, confData, navParams, alerts) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.confData = confData;
        this.navParams = navParams;
        this.alerts = alerts;
        this.categories = [];
        this.products = [];
        this.orderPackages = [];
        this.allOrders = JSON.parse(window.localStorage.getItem("allOrders"));
        if (this.allOrders.length) {
            this.alerts.showLoader();
            this.orderPackages = this.allOrders[0].order_packages;
            this.alerts.hideLoader();
        }
        else {
            this.getCategories();
        }
        var selectedDate = this.navParams.get('deliveryDate');
        this.deliveryDate = selectedDate.getFullYear() + '-' + ("0" + (selectedDate.getMonth() + 1)).slice(-2) + '-' + selectedDate.getDate();
    }
    CheckoutPage.prototype.openModal = function (index) {
        var _this = this;
        var sendData = [];
        if (this.allOrders.length) {
            sendData = this.orderPackages;
        }
        else {
            sendData = this.products;
        }
        var chekoutModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__checkout_modal_checkout_modal__["a" /* CheckoutModalPage */], { result: sendData });
        chekoutModal.present();
        chekoutModal.onDidDismiss(function (data) {
            if (data) {
                if (_this.allOrders.length) {
                    for (var k = 0; k < data.length; k++) {
                        _this.orderPackages[index].weekdays_qty[k][1] = data[k].currentNumber;
                    }
                }
                else {
                    for (var l = 0; l < data.length; l++) {
                        _this.products[index].weekday[l].currentNumber = data[l].currentNumber;
                    }
                }
            }
            else {
                console.log("cancel clicked");
            }
        });
    };
    CheckoutPage.prototype.getCategories = function () {
        this.alerts.showLoader();
        var data = JSON.parse(window.localStorage.getItem('categories'));
        for (var i = 0; i < data.length; i++) {
            this.categories.push(data[i].products);
        }
        console.log(this.categories);
        this.alerts.hideLoader();
        this.getProducts();
    };
    CheckoutPage.prototype.getProducts = function () {
        var _this = this;
        this.categories.forEach(function (x) {
            x.forEach(function (y) {
                y.weekday = [{ "day": "Mon", "currentNumber": 0 }, { "day": "Tue", "currentNumber": 0 }, { "day": "Wed", "currentNumber": 0 }, { "day": "Thu", "currentNumber": 0 }, { "day": "Fri", "currentNumber": 0 }, { "day": "Sat", "currentNumber": 0 }, { "day": "Sun", "currentNumber": 0 }];
                _this.products.push(y);
                console.log(_this.products);
            });
        });
    };
    CheckoutPage.prototype.checkout = function () {
        var _this = this;
        this.alerts.showLoader();
        //this.validation();
        if (this.allOrders.length) {
            if (this.validationEditOrder()) {
                var order = { "order_packages_attributes": {} };
                order.alter_from = "";
                order.delivery_date = this.deliveryDate;
                order.isNew = "1";
                for (var i = 0; i < this.orderPackages.length; i++) {
                    order["order_packages_attributes"][i] = {};
                    order["order_packages_attributes"][i]["default _qty"] = "3";
                    order["order_packages_attributes"][i]["friday"] = this.orderPackages[i].weekdays_qty[4][1];
                    order["order_packages_attributes"][i]["id"] = this.orderPackages[i].id;
                    order["order_packages_attributes"][i]["monday"] = this.orderPackages[i].weekdays_qty[0][1];
                    order["order_packages_attributes"][i]["package_type"] = "6";
                    order["order_packages_attributes"][i]["product_id"] = this.orderPackages[i].product_id;
                    order["order_packages_attributes"][i]["saturday"] = this.orderPackages[i].weekdays_qty[5][1];
                    order["order_packages_attributes"][i]["sunday"] = this.orderPackages[i].weekdays_qty[6][1];
                    order["order_packages_attributes"][i]["thursday"] = this.orderPackages[i].weekdays_qty[3][1];
                    order["order_packages_attributes"][i]["time_slot_id"] = "5";
                    order["order_packages_attributes"][i]["tuesday"] = this.orderPackages[i].weekdays_qty[1][1];
                    order["order_packages_attributes"][i]["wednesday"] = this.orderPackages[i].weekdays_qty[2][1];
                }
                order.pickup = "false";
                order.recurring = "true";
                order.order_id = this.allOrders[0].id;
                console.log(order);
                this.confData.updateOrder(order).then(function (data) {
                    _this.alerts.hideLoader();
                    if (data.status == 200) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__current_order_current_order__["a" /* CurrentOrderPage */], { currentOrder: data.json() });
                    }
                    else {
                        _this.alerts.presentToast(data.statusText);
                    }
                });
            }
            else {
                this.alerts.hideLoader();
                this.alerts.presentToast("Please choose atleast one product quantity.");
            }
        }
        else {
            if (this.validationNewOrder()) {
                var order = { "order_packages_attributes": {} };
                order.alter_from = "this.deliveryDate";
                order.delivery_date = this.deliveryDate;
                order.isNew = "1";
                for (var j = 0; j < this.products.length; j++) {
                    order["order_packages_attributes"][j] = {};
                    order["order_packages_attributes"][j]["default _qty"] = "3";
                    order["order_packages_attributes"][j]["friday"] = this.products[j].weekday[4].currentNumber;
                    order["order_packages_attributes"][j]["monday"] = this.products[j].weekday[0].currentNumber;
                    order["order_packages_attributes"][j]["package_type"] = "6";
                    order["order_packages_attributes"][j]["product_id"] = this.products[j].id;
                    order["order_packages_attributes"][j]["saturday"] = this.products[j].weekday[5].currentNumber;
                    order["order_packages_attributes"][j]["sunday"] = this.products[j].weekday[6].currentNumber;
                    order["order_packages_attributes"][j]["thursday"] = this.products[j].weekday[3].currentNumber;
                    order["order_packages_attributes"][j]["time_slot_id"] = "5";
                    order["order_packages_attributes"][j]["tuesday"] = this.products[j].weekday[1].currentNumber;
                    order["order_packages_attributes"][j]["wednesday"] = this.products[j].weekday[2].currentNumber;
                }
                order.pickup = "false";
                order.recurring = "true";
                console.log(order);
                this.confData.newOrder(order).then(function (data) {
                    _this.alerts.hideLoader();
                    if (data.status == 201) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__current_order_current_order__["a" /* CurrentOrderPage */], { currentOrder: data.json() });
                    }
                    else {
                        _this.alerts.presentToast(data.statusText);
                    }
                });
            }
            else {
                this.alerts.hideLoader();
                this.alerts.presentToast("Please choose atleast one product quantity.");
            }
        }
    };
    CheckoutPage.prototype.validationNewOrder = function () {
        for (var m = 0; m < this.products.length; m++) {
            for (var n = 0; n < this.products[m].weekday.length; n++) {
                if (this.products[m].weekday[n].currentNumber != 0) {
                    return true;
                }
            }
        }
    };
    CheckoutPage.prototype.validationEditOrder = function () {
        for (var p = 0; p < this.orderPackages.length; p++) {
            for (var q = 0; q < this.orderPackages[p].weekdays_qty.length; q++) {
                if (this.orderPackages[p].weekdays_qty[q][1] != 0) {
                    return true;
                }
            }
        }
    };
    return CheckoutPage;
}());
CheckoutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'checkout',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/checkout/checkout.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title text-uppercase>My current Order</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n<ion-list class="cart-list" *ngIf="orderPackages.length;else other_content">\n<ion-item no-lines  *ngFor="let order of orderPackages; let i= index" (click)="openModal(i)">\n	<ion-thumbnail item-start>\n	    <img src="assets/img/img4.png">\n	</ion-thumbnail>\n	<h4 color="dark">{{ order.product.category.name }} - {{order.product.name}}</h4>\n	  <ion-grid no-padding>\n        <ion-row style="padding-top: 10px">\n         <ion-col text-left col-6>\n        	<p class="bold" text-uppercase>New Order!</p>\n   		 </ion-col>\n          <ion-col text-left col-6>\n          	<button (click)="updateOrder()" ion-button  round color="primary" text-uppercase no-margin>\n              Update\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n	<!-- <ion-card >\n	\n		<ion-card-content style="min-height: 200px;">\n		<ion-row>\n			<ion-col>Mon</ion-col>\n			<ion-col>Tue</ion-col>\n			<ion-col>Wed</ion-col>\n			<ion-col>Thu</ion-col>\n			<ion-col>Fri</ion-col>\n			<ion-col>Sat</ion-col>\n			<ion-col>Sun</ion-col>\n		</ion-row>\n		<ion-row>\n		 	<ion-col *ngFor="let qty of order.weekdays_qty">{{qty[1]}}</ion-col>\n		</ion-row>\n		</ion-card-content>\n	</ion-card> -->\n</ion-item>\n</ion-list> \n<ng-template #other_content>\n<ion-list class="cart-list">\n<ion-item no-lines  *ngFor="let prod of products; let i= index" (click)="openModal(i)">\n	<ion-thumbnail item-start>\n	    <img src="assets/img/img4.png">\n	</ion-thumbnail>\n	<h4 color="dark">{{ prod.display_name }} - {{prod.name}}</h4>\n	  <ion-grid no-padding>\n        <ion-row style="padding-top: 10px">\n    	<ion-col text-left col-6>\n        	<p class="bold" text-uppercase>New Order!</p>\n   		 </ion-col>\n         <ion-col text-left col-6>\n          	<button (click)="updateOrder()" ion-button  round color="primary" text-uppercase no-margin>\n              Update\n            </button>\n         </ion-col>\n        </ion-row>\n      </ion-grid>\n	<!-- <ion-card >\n	\n		<ion-card-content style="min-height: 200px;">\n		<ion-row>\n			<ion-col>Mon</ion-col>\n			<ion-col>Tue</ion-col>\n			<ion-col>Wed</ion-col>\n			<ion-col>Thu</ion-col>\n			<ion-col>Fri</ion-col>\n			<ion-col>Sat</ion-col>\n			<ion-col>Sun</ion-col>\n		</ion-row>\n		<ion-row>\n		 	<ion-col *ngFor="let qty of order.weekdays_qty">{{qty[1]}}</ion-col>\n		</ion-row>\n		</ion-card-content>\n	</ion-card> -->\n</ion-item>\n</ion-list> \n	<!-- <ion-card *ngFor="let prod of products; let i= index" (click)="openModal(i)">\n		<ion-card-header style="border-bottom: 1px solid #bdbdbd;">\n		{{ prod.display_name }} - {{prod.name}}</ion-card-header>\n		<ion-card-content style="min-height: 200px;">\n		<ion-row>\n			<ion-col *ngFor="let day of prod.weekday">{{day.day}}</ion-col>\n		</ion-row>\n		<ion-row>\n		 	<ion-col *ngFor="let day of prod.weekday">{{day.currentNumber}}</ion-col>\n		</ion-row>\n		</ion-card-content>\n	</ion-card> -->\n</ng-template>\n<!-- <button ion-button round (click)="checkout()">Proceed to checkout</button> -->\n\n</ion-content>'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/checkout/checkout.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_conference_data__["a" /* ConferenceData */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_5__providers_alerts_provider__["a" /* Alerts */]])
], CheckoutPage);

//# sourceMappingURL=checkout.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrentOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__categories_categories__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edit_order_edit_order__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CurrentOrderPage = (function () {
    function CurrentOrderPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        var currentOrderData = this.navParams.get('currentOrder');
        this.currentOrderAddress = currentOrderData.address;
        this.orderPackages = currentOrderData.order_packages;
    }
    CurrentOrderPage.prototype.ionViewDidLoad = function () {
    };
    CurrentOrderPage.prototype.editOrderPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__edit_order_edit_order__["a" /* EditOrderPage */]);
    };
    CurrentOrderPage.prototype.mainMenu = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__categories_categories__["a" /* CategoriesPage */]);
    };
    return CurrentOrderPage;
}());
CurrentOrderPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-current-order',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/current-order/current-order.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle start>\n      <ion-icon name="md-menu"></ion-icon>\n    </button>\n    <ion-title text-uppercase>My Current Order</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n	<ion-list class="cart-list" padding>\n		<ion-item no-lines>\n		<h4 class="success">Success!</h4>\n		<h4 color="dark">Thanks for the order.</h4>\n		</ion-item>\n	<ion-item no-lines  *ngFor="let package of orderPackages">\n	<!-- <ion-card *ngFor="let package of orderPackages"> -->\n		<ion-thumbnail item-start>\n		    <img src="assets/img/img4.png">\n		</ion-thumbnail>\n		<h4 color="dark">{{package.product.category.name}} - {{package.product.name}}</h4>\n	<!-- <ion-card-content style="min-height: 200px;">\n	<ion-row>\n		<ion-col>Mon</ion-col>\n		<ion-col>Tue</ion-col>\n		<ion-col>Wed</ion-col>\n		<ion-col>Thu</ion-col>\n		<ion-col>Fri</ion-col>\n		<ion-col>Sat</ion-col>\n		<ion-col>Sun</ion-col>\n	</ion-row>\n	<ion-row>\n	 	<ion-col>{{package.weekdays_qty[0][1]}}</ion-col>\n	 	<ion-col>{{package.weekdays_qty[1][1]}}</ion-col>\n	 	<ion-col>{{package.weekdays_qty[2][1]}}</ion-col>\n	 	<ion-col>{{package.weekdays_qty[3][1]}}</ion-col>\n	 	<ion-col>{{package.weekdays_qty[4][1]}}</ion-col>\n	 	<ion-col>{{package.weekdays_qty[5][1]}}</ion-col>\n	 	<ion-col>{{package.weekdays_qty[6][1]}}</ion-col>\n	</ion-row>\n	</ion-card-content>\n</ion-card> -->\n</ion-item>\n</ion-list>\n<div padding>\n	<ion-list class="address" padding>\n		<ion-item no-lines><h4 color="dark">Address Details</h4></ion-item>\n		<ion-item no-lines>{{currentOrderAddress.name}},</ion-item> \n		<ion-item no-lines>{{currentOrderAddress.area.name}},</ion-item>\n		<ion-item no-lines>{{currentOrderAddress.zone.name}}</ion-item>\n	</ion-list>\n	<button color="primary" ion-button (click)="editOrderPage()" round block>TRACK YOUR ORDER</button>\n	<button color="secondary" ion-button (click)="mainMenu()" round block>BACK TO MENU </button>\n</div>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/current-order/current-order.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], CurrentOrderPage);

//# sourceMappingURL=current-order.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetNonavailabilityPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_alerts_provider__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_conference_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__edit_order_edit_order__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SetNonavailabilityPage = (function () {
    function SetNonavailabilityPage(navCtrl, navParams, alerts, alertCtrl, confData) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alerts = alerts;
        this.alertCtrl = alertCtrl;
        this.confData = confData;
        this.fromDate = new Date();
        this.toDate = new Date();
        this.isDnd = '';
        this.onDndSet();
    }
    SetNonavailabilityPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SetNonavailabilityPage');
    };
    SetNonavailabilityPage.prototype.onDndSet = function () {
        this.alerts.showLoader();
        this.isDnd = window.localStorage.getItem('isDnd');
        if (this.isDnd) {
            var allOrders = JSON.parse(window.localStorage.getItem('allOrders'));
            this.fromDate = new Date(allOrders[0].dnd_from);
            this.toDate = new Date(allOrders[0].dnd_to);
            this.alerts.hideLoader();
        }
        else {
            this.fromDate.setDate(this.fromDate.getDate() + 1);
            this.toDate.setDate(this.toDate.getDate() + 1);
            this.alerts.hideLoader();
        }
    };
    SetNonavailabilityPage.prototype.setfromDate = function (date) {
        var today = new Date();
        today.setDate(today.getDate() + 1);
        if (date.getDate() >= today.getDate()) {
            this.fromDate = date;
            if (this.toDate.getDate() < this.fromDate.getDate()) {
                this.toDate = this.fromDate;
            }
        }
        else {
            this.alerts.presentToast("Please choose correct date");
        }
    };
    SetNonavailabilityPage.prototype.settoDate = function (date) {
        var today = new Date();
        today.setDate(today.getDate() + 1);
        if (date.getDate() >= today.getDate() && date.getDate() >= this.fromDate.getDate()) {
            this.toDate = date;
        }
        else {
            this.alerts.presentToast("Please choose correct date");
        }
    };
    SetNonavailabilityPage.prototype.setDnd = function () {
        var dndFrom = this.fromDate.getFullYear() + '-' + ("0" + (this.fromDate.getMonth() + 1)).slice(-2) + '-' + this.fromDate.getDate();
        var dndTo = this.toDate.getFullYear() + '-' + ("0" + (this.toDate.getMonth() + 1)).slice(-2) + '-' + this.toDate.getDate();
        var order = {};
        order.app_version = "2.1";
        order.dnd_from = dndFrom;
        order.dnd_to = dndTo;
        order.isNew = 1;
        var msg = "Are you sure you want to set Dnd from " + order.dnd_from + " to " + order.dnd_to + " ?";
        this.presentConfirm(msg, order);
    };
    SetNonavailabilityPage.prototype.removeDnd = function () {
        var order = {};
        order.app_version = "2.1";
        order.dnd_from = "";
        order.dnd_to = "";
        order.isNew = 1;
        var msg = "Are you sure you want to remove Dnd?";
        this.deleteConfirm(msg, order);
    };
    SetNonavailabilityPage.prototype.presentConfirm = function (msg, order) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '',
            message: msg,
            buttons: [
                {
                    text: 'CANCEL',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'CONFIRM',
                    handler: function () {
                        _this.alerts.showLoader();
                        _this.confData.createDnd(order).then(function (res) {
                            _this.alerts.hideLoader();
                            if (res.status == 200) {
                                window.localStorage.setItem('isDnd', '1');
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__edit_order_edit_order__["a" /* EditOrderPage */]);
                                _this.alerts.presentToast("Non availability set succesfully");
                            }
                            else {
                                _this.alerts.presentToast(res.statusText);
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    SetNonavailabilityPage.prototype.deleteConfirm = function (msg, order) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '',
            message: msg,
            buttons: [
                {
                    text: 'CANCEL',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'CONFIRM',
                    handler: function () {
                        _this.alerts.showLoader();
                        _this.confData.removeDnd(order).then(function (res) {
                            _this.alerts.hideLoader();
                            if (res.status == 200) {
                                window.localStorage.setItem('isDnd', '');
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__edit_order_edit_order__["a" /* EditOrderPage */]);
                                _this.alerts.presentToast("Non availability removed succesfully");
                            }
                            else {
                                _this.alerts.presentToast(res.statusText);
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    return SetNonavailabilityPage;
}());
SetNonavailabilityPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-set-nonavailability',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/set-nonavailability/set-nonavailability.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle start>\n      <ion-icon name="md-menu"></ion-icon>\n    </button>\n    <ion-title text-uppercase>Set Non Availability</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="form-content" text-center>\n  <div class="Loginpage">\n    <div class="formContainer">\n           <ion-list class="app-form" no-margin>\n            <ion-item no-lines>\n            	<ion-icon name="ios-calendar" item-left></ion-icon>From: \n              <span ion-datepicker (ionChanged)="setfromDate($event);" [value]="fromDate"\n		  	 	   clear class="ScheduleDate">\n		  		    <span>{{fromDate | date:\'dd/MM/yyyy\'}}</span>\n		  		  </span>\n            </ion-item>\n\n            <ion-item no-lines>\n            	<ion-icon name="ios-calendar" item-left></ion-icon>To:\n              <span ion-datepicker (ionChanged)="settoDate($event);" [value]="toDate"\n		  	 	   clear class="ScheduleDate">\n		  		    <span>{{toDate | date:\'dd/MM/yyyy\'}}</span>\n		  		  </span>\n            </ion-item>\n\n          </ion-list>\n         	 <button *ngIf="!isDnd;else other_buttons" ion-button block primary round text-uppercase\n		(click)="setDnd()">create DND</button>\n			<ng-template #other_buttons>\n				<button ion-button block round text-uppercase primary (click)="setDnd()">Update DND</button>\n				<button ion-button block round text-uppercase secondary (click)="removeDnd()">Remove DND</button>\n			</ng-template>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/set-nonavailability/set-nonavailability.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_alerts_provider__["a" /* Alerts */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_conference_data__["a" /* ConferenceData */]])
], SetNonavailabilityPage);

//# sourceMappingURL=set-nonavailability.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditDailyOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checkout_modal_checkout_modal__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_alerts_provider__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_conference_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__edit_order_edit_order__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EditDailyOrderPage = (function () {
    function EditDailyOrderPage(navCtrl, navParams, modalCtrl, alerts, confData, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.alerts = alerts;
        this.confData = confData;
        this.alertCtrl = alertCtrl;
        this.initDate = new Date();
        this.initDate.setDate(this.initDate.getDate() + 1);
        this.allOrders = JSON.parse(window.localStorage.getItem("allOrders"));
        this.orderPackages = this.allOrders[0].order_packages;
    }
    EditDailyOrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditDailyOrderPage');
    };
    EditDailyOrderPage.prototype.setDate = function (date) {
        var today = new Date();
        today.setDate(today.getDate() + 1);
        if (date.getDate() >= today.getDate()) {
            this.initDate = date;
        }
        else {
            this.alerts.presentToast("Please choose correct date");
        }
    };
    EditDailyOrderPage.prototype.openModal = function (index) {
        var _this = this;
        var chekoutModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__checkout_modal_checkout_modal__["a" /* CheckoutModalPage */]);
        chekoutModal.present();
        chekoutModal.onDidDismiss(function (data) {
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    _this.orderPackages[index].weekdays_qty[i][1] = data[i].currentNumber;
                }
            }
            else {
                console.log("cancel clicked");
            }
        });
    };
    EditDailyOrderPage.prototype.updateOrder = function () {
        var order = { "order_packages_attributes": {} };
        var dFrom = this.initDate.getFullYear() + '-' + ("0" + (this.initDate.getMonth() + 1)).slice(-2) + '-' + this.initDate.getDate();
        order.alter_from = "";
        order.delivery_date = dFrom;
        order.isNew = "1";
        for (var i = 0; i < this.orderPackages.length; i++) {
            order["order_packages_attributes"][i] = {};
            order["order_packages_attributes"][i]["default _qty"] = "3";
            order["order_packages_attributes"][i]["friday"] = this.orderPackages[i].weekdays_qty[4][1];
            order["order_packages_attributes"][i]["id"] = this.orderPackages[i].id;
            order["order_packages_attributes"][i]["monday"] = this.orderPackages[i].weekdays_qty[0][1];
            order["order_packages_attributes"][i]["package_type"] = "6";
            order["order_packages_attributes"][i]["product_id"] = this.orderPackages[i].product_id;
            order["order_packages_attributes"][i]["saturday"] = this.orderPackages[i].weekdays_qty[5][1];
            order["order_packages_attributes"][i]["sunday"] = this.orderPackages[i].weekdays_qty[6][1];
            order["order_packages_attributes"][i]["thursday"] = this.orderPackages[i].weekdays_qty[3][1];
            order["order_packages_attributes"][i]["time_slot_id"] = "5";
            order["order_packages_attributes"][i]["tuesday"] = this.orderPackages[i].weekdays_qty[1][1];
            order["order_packages_attributes"][i]["wednesday"] = this.orderPackages[i].weekdays_qty[2][1];
        }
        order.pickup = "false";
        order.recurring = "true";
        order.order_id = this.allOrders[0].id;
        console.log(order);
        var msg = "Are you sure you want to update order?";
        this.presentConfirm(msg, order);
    };
    EditDailyOrderPage.prototype.cancelOrder = function () {
        this.cancelConfirm("Are you sure you want to cancel the order?");
    };
    EditDailyOrderPage.prototype.presentConfirm = function (msg, order) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '',
            message: msg,
            buttons: [
                {
                    text: 'CANCEL',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'CONFIRM',
                    handler: function () {
                        _this.alerts.showLoader();
                        _this.confData.updateOrder(order).then(function (res) {
                            _this.alerts.hideLoader();
                            if (res.status == 200) {
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__edit_order_edit_order__["a" /* EditOrderPage */]);
                                _this.alerts.presentToast("Order updated succesfully");
                            }
                            else {
                                _this.alerts.presentToast(res.statusText);
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    EditDailyOrderPage.prototype.cancelConfirm = function (msg) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '',
            message: msg,
            buttons: [
                {
                    text: 'CANCEL',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'CONFIRM',
                    handler: function () {
                        _this.alerts.showLoader();
                        _this.confData.cancelOrder().then(function (res) {
                            _this.alerts.hideLoader();
                            if (res.status == 204) {
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__edit_order_edit_order__["a" /* EditOrderPage */]);
                                _this.alerts.presentToast("Order cancelled succesfully");
                            }
                            else {
                                _this.alerts.presentToast(res.statusText);
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    return EditDailyOrderPage;
}());
EditDailyOrderPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-edit-daily-order',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/edit-daily-order/edit-daily-order.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle start>\n      <ion-icon name="md-menu"></ion-icon>\n    </button>\n    <ion-title text-uppercase>Edit Daily Order</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-list class="cart-list">\n    <ion-item *ngFor="let order of orderPackages; let i= index" \n	(click)="openModal(i)"  no-lines>\n      <ion-thumbnail item-start>\n        <img src="assets/img/img4.png">\n      </ion-thumbnail>\n      <h4 color="dark">{{ order.product.category.name }} - {{order.product.name}}</h4>\n\n      <ion-grid no-padding>\n        <ion-row>\n          <ion-col text-left col-6>\n            <p class="bold" text-uppercase>From</p>\n          </ion-col>\n          <ion-col class="remove-col" col-6>\n            <p class="status deliver"><span ion-datepicker (ionChanged)="setDate($event);" [value]="initDate"\n	  	 	   clear class="ScheduleDate">\n	  		    <span>{{initDate | date:\'dd/MM/yyyy\'}}</span>\n	  		</span></p>\n          </ion-col>\n        </ion-row>\n\n        <ion-row style="padding-top: 10px">\n          <ion-col text-left col-6>\n          	<button (click)="updateOrder()" ion-button  round color="primary" text-uppercase no-margin>\n              Update\n            </button>\n          </ion-col>\n          <ion-col class="remove-col" col-6>     \n            <button (click)="cancelOrder()" ion-button  round color="dark" text-uppercase no-margin>\n              Cancel\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n  </ion-list> \n</ion-content>'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/edit-daily-order/edit-daily-order.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_alerts_provider__["a" /* Alerts */],
        __WEBPACK_IMPORTED_MODULE_4__providers_conference_data__["a" /* ConferenceData */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], EditDailyOrderPage);

//# sourceMappingURL=edit-daily-order.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditOrderDurationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_alerts_provider__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkout_modal_checkout_modal__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_conference_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__edit_order_edit_order__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EditOrderDurationPage = (function () {
    function EditOrderDurationPage(navCtrl, navParams, confData, alerts, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.confData = confData;
        this.alerts = alerts;
        this.modalCtrl = modalCtrl;
        this.fromDate = new Date();
        this.toDate = new Date();
        this.orderPackages = [];
        this.child_orders = [];
        this.fromDate.setDate(this.fromDate.getDate() + 1);
        this.toDate.setDate(this.toDate.getDate() + 1);
        this.allOrders = JSON.parse(window.localStorage.getItem("allOrders"));
        this.orderPackages = this.allOrders[0].order_packages;
        this.getAllOrders();
    }
    EditOrderDurationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditOrderDurationPage');
    };
    EditOrderDurationPage.prototype.setfromDate = function (date) {
        var today = new Date();
        today.setDate(today.getDate() + 1);
        if (date.getDate() >= today.getDate()) {
            this.fromDate = date;
            if (this.toDate.getDate() < this.fromDate.getDate()) {
                this.toDate = this.fromDate;
            }
        }
        else {
            this.alerts.presentToast("Please choose correct date");
        }
    };
    EditOrderDurationPage.prototype.settoDate = function (date) {
        var today = new Date();
        today.setDate(today.getDate() + 1);
        if (date.getDate() >= today.getDate() && date.getDate() >= this.fromDate.getDate()) {
            this.toDate = date;
        }
        else {
            this.alerts.presentToast("Please choose correct date");
        }
    };
    EditOrderDurationPage.prototype.openModal = function (index) {
        var _this = this;
        var chekoutModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__checkout_modal_checkout_modal__["a" /* CheckoutModalPage */]);
        chekoutModal.present();
        chekoutModal.onDidDismiss(function (data) {
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    _this.orderPackages[index].weekdays_qty[i][1] = data[i].currentNumber;
                }
            }
            else {
                console.log("cancel clicked");
            }
        });
    };
    EditOrderDurationPage.prototype.childOrder = function () {
        var _this = this;
        var order = { "order_packages_attributes": {} };
        var dFrom = this.fromDate.getFullYear() + '-' + ("0" + (this.fromDate.getMonth() + 1)).slice(-2) + '-' + this.fromDate.getDate();
        var dTo = this.toDate.getFullYear() + '-' + ("0" + (this.toDate.getMonth() + 1)).slice(-2) + '-' + this.toDate.getDate();
        order.alter_from = "";
        order.delivery_date = dFrom;
        order.end_date = dTo;
        order.isNew = "1";
        for (var i = 0; i < this.orderPackages.length; i++) {
            order["order_packages_attributes"][i] = {};
            order["order_packages_attributes"][i]["default _qty"] = "3";
            order["order_packages_attributes"][i]["friday"] = this.orderPackages[i].weekdays_qty[4][1];
            order["order_packages_attributes"][i]["monday"] = this.orderPackages[i].weekdays_qty[0][1];
            order["order_packages_attributes"][i]["package_type"] = "1";
            order["order_packages_attributes"][i]["product_id"] = this.orderPackages[i].product_id;
            order["order_packages_attributes"][i]["saturday"] = this.orderPackages[i].weekdays_qty[5][1];
            order["order_packages_attributes"][i]["sunday"] = this.orderPackages[i].weekdays_qty[6][1];
            order["order_packages_attributes"][i]["thursday"] = this.orderPackages[i].weekdays_qty[3][1];
            order["order_packages_attributes"][i]["time_slot_id"] = "5";
            order["order_packages_attributes"][i]["tuesday"] = this.orderPackages[i].weekdays_qty[1][1];
            order["order_packages_attributes"][i]["wednesday"] = this.orderPackages[i].weekdays_qty[2][1];
        }
        order.parent_order_id = this.allOrders[0].id;
        order.pickup = "false";
        order.recurring = "true";
        this.confData.createChildOrder(order).then(function (res) {
            if (res.status == 201) {
                _this.getAllOrders();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__edit_order_edit_order__["a" /* EditOrderPage */]);
                _this.alerts.presentToast("Order updated successfully!");
            }
            else {
                _this.alerts.presentToast(res.statusText);
            }
        });
    };
    EditOrderDurationPage.prototype.getAllOrders = function () {
        var _this = this;
        this.confData.getAllOrders().then(function (res) {
            if (res.status == 200) {
                var allOrders = JSON.parse(window.localStorage.getItem('allOrders'));
                _this.child_orders = allOrders[0].child_orders;
            }
            else {
                _this.alerts.presentToast(res.statusText);
            }
        });
    };
    return EditOrderDurationPage;
}());
EditOrderDurationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-edit-order-duration',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/edit-order-duration/edit-order-duration.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle start>\n      <ion-icon name="md-menu"></ion-icon>\n    </button>\n    <ion-title text-uppercase>Edit Order Duration</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-list class="cart-list">\n    <ion-item *ngFor="let order of orderPackages; let i= index"  no-lines>\n      <ion-thumbnail item-start>\n        <img src="assets/img/img4.png">\n      </ion-thumbnail>\n      <h4 color="dark">{{ order.product.category.name }} - {{order.product.name}}</h4>\n\n      <ion-grid no-padding>\n        <ion-row>\n          <ion-col text-left col-6>\n            <p class="bold" text-uppercase><span ion-datepicker (ionChanged)="setfromDate($event);" [value]="fromDate"\n		  	 	   clear class="ScheduleDate">\n		  		    <span>{{fromDate | date:\'dd/MM/yyyy\'}}</span>\n		  		  </span></p>\n          </ion-col>\n          <ion-col class="remove-col" col-6>\n            <p class="status deliver"><span ion-datepicker (ionChanged)="settoDate($event);" \n		        	[value]="toDate"\n		  	 	   clear class="ScheduleDate">\n		  		    <span>{{toDate | date:\'dd/MM/yyyy\'}}</span>\n		  		  </span></p>\n          </ion-col>\n        </ion-row>\n\n        <ion-row style="padding-top: 10px">\n          <ion-col text-left col-6>\n          	<button (click)="openModal(i)" ion-button  round color="primary" text-uppercase no-margin>\n              Update\n            </button>\n          </ion-col>\n          <ion-col class="remove-col" col-6>     \n            <p class="status deliver" >New Order</p>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n  </ion-list>\n  <ion-list class="cart-list" *ngFor="let child of child_orders">\n    <ion-item   *ngFor="let package of child.child_order_packages" no-lines>\n      <ion-thumbnail item-start>\n        <img src="assets/img/img4.png">\n      </ion-thumbnail>\n      <h4 color="dark">{{ package.product.category.name }} - {{package.product.name}}</h4>\n\n      <ion-grid no-padding>\n        <ion-row>\n          <ion-col text-left col-6>\n            <p class="bold" text-uppercase>Delivery</p>\n          </ion-col>\n          <ion-col class="remove-col" col-6>\n            <p class="status deliver"><span ion-datepicker (ionChanged)="setDate($event);" [value]="initDate"\n	  	 	   clear class="ScheduleDate">\n	  		    <span>{{child.end_date | date:\'dd/MM/yyyy\'}}</span>\n	  		</span></p>\n          </ion-col>\n        </ion-row>\n        <ion-row style="padding-top: 10px">\n          <ion-col text-left col-6>\n          	<button (click)="openModal(i)" ion-button  round color="primary" text-uppercase no-margin>\n              Update\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/edit-order-duration/edit-order-duration.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__providers_conference_data__["a" /* ConferenceData */],
        __WEBPACK_IMPORTED_MODULE_2__providers_alerts_provider__["a" /* Alerts */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
], EditOrderDurationPage);

//# sourceMappingURL=edit-order-duration.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_data__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alerts_provider__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SignupPage = (function () {
    function SignupPage(navCtrl, userData, alerts) {
        this.navCtrl = navCtrl;
        this.userData = userData;
        this.alerts = alerts;
        this.signup = { username: '', email: '', phone: '' };
        this.submitted = false;
    }
    SignupPage.prototype.onSignup = function (form) {
        var _this = this;
        this.submitted = true;
        if (form.valid) {
            this.alerts.showLoader();
            this.userData.signup(this.signup.username, this.signup.email, this.signup.phone).then(function (res) {
                _this.alerts.hideLoader();
                if (res.status == 200) {
                    _this.alerts.doAlert('Success!', 'Please login to continue.');
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                }
                else if (res.status == 422) {
                    _this.alerts.doAlert('', 'this number has already been taken');
                }
                else {
                    //form.resetForm();
                    _this.alerts.doAlert('Error', 'something went wrong');
                }
            });
        }
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/signup/signup.html"*/'<ion-header>\n	<ion-navbar color="primary">\n		<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n		<ion-title>Signup</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content class="form-content" text-center>\n\n  <div class="Loginpage">\n\n    <div class="formContainer">\n      <div class="logo">\n        <img src="assets/img/logo.png" />\n      </div>\n      <br>\n      <form #signupForm="ngForm" novalidate>\n      		<ion-list class="app-form" no-margin>\n            <ion-item no-lines>\n              <ion-icon name="ios-person-outline" item-left></ion-icon>\n              <ion-input [(ngModel)]="signup.username" placeholder = "Name" name="username" type="text" #username="ngModel" required>\n      				</ion-input>\n            </ion-item>\n      		  <p ion-text [hidden]="username.valid || submitted == false" color="danger" padding-left>\n      				Username is required\n      			</p>\n\n            <ion-item no-lines>\n              <ion-icon name="md-tablet-portrait" item-left></ion-icon>\n              <ion-input [(ngModel)]="signup.phone" placeholder = "Phone number" name="phone" type="tel" maxlength="10" #phone="ngModel" required>\n              </ion-input>\n            </ion-item>\n            <p ion-text [hidden]="phone.valid || submitted == false" color="danger" padding-left>\n              Phone number is required\n            </p>\n\n            <ion-item no-lines>\n              <ion-icon name="ios-at-outline" item-left></ion-icon>\n              <ion-input [(ngModel)]="signup.email" placeholder="Email" name="email" type="email" #email="ngModel">\n      			  </ion-input>\n            </ion-item> \n          </ion-list>\n      		<button color="primary" ion-button (click)="onSignup(signupForm)" type="submit" round block>Register</button>\n  		</form>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/signup/signup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_user_data__["a" /* UserData */],
        __WEBPACK_IMPORTED_MODULE_4__providers_alerts_provider__["a" /* Alerts */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentDue; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_data__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PaymentDue = (function () {
    function PaymentDue(userData, _loading, _alert) {
        this.userData = userData;
        this._loading = _loading;
        this._alert = _alert;
        this.Payment = [];
        this.onLoad();
    }
    PaymentDue.prototype.onLoad = function () {
        var _this = this;
        this.userData.paymentDue().then(function (data) {
            _this.showLoader();
            var result = {};
            result = data;
            if (result.status == 200) {
                _this.Payment = JSON.parse(result._body).user;
                _this.hideLoader();
            }
            else {
                _this.hideLoader();
                _this.doAlert('Error', 'Please try again !');
            }
        });
    };
    PaymentDue.prototype.doAlert = function (type, message) {
        var alert = this._alert.create({
            title: type,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    PaymentDue.prototype.showLoader = function () {
        this.loading = this._loading.create({
            content: 'Please wait...',
        });
        this.loading.present();
    };
    PaymentDue.prototype.hideLoader = function () {
        this.loading.dismiss();
    };
    return PaymentDue;
}());
PaymentDue = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'payment-due',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/payment-due/payment-due.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle="left" style="display: inline-block !important;">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Payment Due</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-card style="background-color: #a981d3;" responsive-sm>\n    <ion-item class="custom-item">\n      <ion-grid>\n        <ion-row class="paymentFont">\n          <ion-col col-4 text-wrap no-lines>\n            <b>Name</b>\n          </ion-col>\n          <ion-col col-8 text-wrap no-lines>\n            :{{Payment.name}}\n          </ion-col>\n        </ion-row>\n        <ion-row class="paymentFont">\n          <ion-col col-4 text-wrap no-lines>\n            <b>Email</b>\n          </ion-col>\n          <ion-col col-8 text-wrap no-lines>\n            :{{Payment.email}}\n          </ion-col>\n        </ion-row>\n        <ion-row class="paymentFont">\n          <ion-col col-4 text-wrap no-lines>\n            <b>Mobile</b>\n          </ion-col>\n          <ion-col col-8 text-wrap no-lines>\n            :{{Payment.mobile}}\n          </ion-col>\n        </ion-row>\n        <ion-row st>\n          <ion-col col-8 text-wrap no-lines>\n            <b>Due Amount</b>\n          </ion-col>\n          <ion-col col-4 text-wrap no-lines>\n            :<span>&#8377;</span> {{Payment.due_balance}}\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-8 text-wrap no-lines>\n            <b>Bill Amount</b>\n          </ion-col>\n          <ion-col col-4 text-wrap no-lines>\n            :<span>&#8377;</span> {{Payment.billing_amount}}\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/payment-due/payment-due.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_user_data__["a" /* UserData */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], PaymentDue);

//# sourceMappingURL=payment-due.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LastFiveOrder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_data__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LastFiveOrder = (function () {
    function LastFiveOrder(userData, _loading, _alert) {
        this.userData = userData;
        this._loading = _loading;
        this._alert = _alert;
        this.Deliveries = [];
        this.onLoad();
    }
    LastFiveOrder.prototype.onLoad = function () {
        var _this = this;
        this.showLoader();
        this.userData.lastOrders().then(function (data) {
            _this.hideLoader();
            var result = {};
            result = data;
            if (result.status == 200) {
                _this.Deliveries = result.json().deliveries;
                if (!_this.Deliveries.length) {
                    _this.dataFound = "No deliveries data yet";
                }
            }
            else {
                _this.doAlert('Error', 'Please try again !');
            }
        });
    };
    LastFiveOrder.prototype.doAlert = function (type, message) {
        var alert = this._alert.create({
            title: type,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    LastFiveOrder.prototype.showLoader = function () {
        this.loading = this._loading.create({
            content: 'Please wait...',
        });
        this.loading.present();
    };
    LastFiveOrder.prototype.hideLoader = function () {
        this.loading.dismiss();
    };
    return LastFiveOrder;
}());
LastFiveOrder = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'last-five-order',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/last-five-order/last-five-order.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle="left" style="display: inline-block !important;">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Last Five Deliveries</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card><h2>{{dataFound}}</h2></ion-card>\n	<ion-slides>\n  		<ion-slide *ngFor="let del of Deliveries;let i=index;">\n	<ion-card style="background-color: #a981d3;border:#686868;" responsive-sm>\n			\n    <ion-item class="custom-item">\n      <ion-grid class="font table">\n        <ion-row class="list">\n          <ion-col col-6 text-wrap no-lines>\n            <b>Order Id:</b>\n          </ion-col>\n          <ion-col col-6 text-wrap no-lines>\n            :{{del.order_id}}\n          </ion-col>\n        </ion-row>\n        <ion-row class="list">\n          <ion-col col-6 text-wrap no-lines>\n            <b>Delivery Id:</b>\n          </ion-col>\n          <ion-col col-6 text-wrap no-lines>\n            :{{del.id}}\n          </ion-col>\n        </ion-row>\n        <ion-row class="list">\n          <ion-col col-6 text-wrap no-lines>\n            <b>Date:</b>\n          </ion-col>\n          <ion-col col-6 text-wrap no-lines>\n            :{{del.date}}\n          </ion-col>\n        </ion-row>\n        <ion-row class="list">\n          <ion-col col-6 text-wrap no-lines>\n            <b>Delivery time:</b>\n          </ion-col>\n          <ion-col col-6 text-wrap no-lines>\n            :{{del.time_slot.from_time}}-{{del.time_slot.to_time}}\n          </ion-col>\n        </ion-row>\n        <ion-row class="list" *ngFor="let pro of del.delivery_packages">\n          <ion-col col-6 text-wrap no-lines>\n            <b>{{pro.product.display_name}}:</b>\n          </ion-col>\n          <ion-col col-6 text-wrap no-lines>\n            :{{pro.quantity}}\n          </ion-col>\n        </ion-row>\n        <ion-row class="list">\n          <ion-col col-6 text-wrap no-lines>\n            <b>Status:</b>\n          </ion-col>\n          <ion-col col-6 text-wrap no-lines [hidden]="del.delivery_status!=1">\n            :Completed\n          </ion-col>\n          <ion-col col-6 text-wrap no-lines [hidden]="del.delivery_status==1">\n            :Not completed\n          </ion-col>\n        </ion-row>\n        <ion-row class="list">\n          <ion-col col-6 text-wrap no-lines>\n            <b>Amount:</b>\n          </ion-col>\n          <ion-col col-6 text-wrap no-lines>\n            :{{del.total}}\n          </ion-col>\n        </ion-row>\n        <ion-row class="list">\n          <ion-col col-6 text-wrap no-lines>\n            <b>Amount paid:</b>\n          </ion-col>\n          <ion-col col-6 text-wrap no-lines>\n            :{{del.paid}}\n          </ion-col>\n        </ion-row>\n        <ion-row class="list">\n          <ion-col col-6 text-wrap no-lines>\n            <b>Balance:</b>\n          </ion-col>\n          <ion-col col-6 text-wrap no-lines>\n            :{{del.due_balance}}\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n    <ion-item>\n		<h3 style="text-align: center;padding-top:10px;">{{i+1}}/{{Deliveries.length}}</h3>\n	</ion-item>\n  </ion-card>\n		</ion-slide>\n	</ion-slides>\n</ion-content>'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/last-five-order/last-five-order.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_user_data__["a" /* UserData */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], LastFiveOrder);

//# sourceMappingURL=last-five-order.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NutritionValues; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_data__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NutritionValues = (function () {
    function NutritionValues(userData, _loading, _alert) {
        this.userData = userData;
        this._loading = _loading;
        this._alert = _alert;
        this.Nutrition = [];
        this.onLoad();
    }
    NutritionValues.prototype.onLoad = function () {
        var _this = this;
        this.userData.nutritionValues().then(function (data) {
            _this.showLoader();
            var result = {};
            result = data;
            if (result.status == 200) {
                _this.Nutrition = JSON.parse(result._body).nutrition_values;
                _this.hideLoader();
            }
            else {
                _this.hideLoader();
                _this.doAlert('Error', 'Please try again !');
            }
        });
    };
    NutritionValues.prototype.doAlert = function (type, message) {
        var alert = this._alert.create({
            title: type,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    NutritionValues.prototype.showLoader = function () {
        this.loading = this._loading.create({
            content: 'Please wait...',
        });
        this.loading.present();
    };
    NutritionValues.prototype.hideLoader = function () {
        this.loading.dismiss();
    };
    return NutritionValues;
}());
NutritionValues = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'nutrition-values',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/Nutrition-Values/nutrition-values.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="md-menu"></ion-icon>\n    </button>\n    <ion-title text-uppercase>Nutrition Values</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-slides>\n    <ion-slide *ngFor="let pro of Nutrition;let i=index;" style="overflow:scroll;">\n      <ion-card class="card-details">\n        <ion-card-content>\n        <ion-card-title>\n          {{pro.name}}\n        </ion-card-title>\n       </ion-card-content>\n        <div>\n          <ion-list class="ingredient-list">\n            <ion-item>\n                <span item-start></span>\n                  <p>PRODUCT {{pro.name}}</p>\n            </ion-item>\n            <ion-item>\n                <span item-start></span>\n                  <p>Calcium {{pro.calcium}}</p>\n            </ion-item>\n            <ion-item>\n                <span item-start></span>\n                  <p>Calories {{pro.calories}}</p>\n            </ion-item>\n            <ion-item>\n                <span item-start></span>\n                  <p>Carbohydrates {{pro.carbohydrates}}</p>\n            </ion-item>\n            <ion-item>\n                <span item-start></span>\n                  <p>Fat {{pro.fat}}</p>\n            </ion-item>\n            <ion-item>\n                <span item-start></span>\n                  <p>Minerals {{pro.minerals}}</p>\n            </ion-item>\n            <ion-item>\n                <span item-start></span>\n                  <p>Snf {{pro.snf}}</p>\n            </ion-item>\n            <ion-item>\n                <span item-start></span>\n                  <p>Vitamins {{pro.vitamins}}</p>\n            </ion-item>\n\n         </ion-list>\n        </div>            \n        <ion-item>\n          <h3 class="pageNo">{{i+1}}/{{Nutrition.length}}</h3>\n        </ion-item>\n      </ion-card>\n    </ion-slide>\n  </ion-slides>\n\n</ion-content>'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/Nutrition-Values/nutrition-values.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_user_data__["a" /* UserData */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], NutritionValues);

//# sourceMappingURL=nutrition-values.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_email_composer__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_data__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ContactPage = (function () {
    function ContactPage(userData, _loading, _alert, emailComposer, callNumber) {
        this.userData = userData;
        this._loading = _loading;
        this._alert = _alert;
        this.emailComposer = emailComposer;
        this.callNumber = callNumber;
        this.Nutrition = [];
    }
    ContactPage.prototype.sendFeedback = function () {
        this.emailComposer.isAvailable().then(function (available) {
            if (available) {
                //Now we know we can send
            }
        });
        var email = {
            to: 'contactus@dairylac.com',
            subject: 'Feedback',
            isHtml: true
        };
        // Send a text message using default options
        this.emailComposer.open(email);
    };
    ContactPage.prototype.call = function () {
        var _this = this;
        this.callNumber.callNumber("01161616161", true)
            .then(function () { return console.log('Success', 'Launched dialer!'); })
            .catch(function () { return _this.doAlert('Error', 'Error launching dialer'); });
    };
    ContactPage.prototype.doAlert = function (type, message) {
        var alert = this._alert.create({
            title: type,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    ContactPage.prototype.showLoader = function () {
        this.loading = this._loading.create({
            content: 'Please wait...',
        });
        this.loading.present();
    };
    ContactPage.prototype.hideLoader = function () {
        this.loading.dismiss();
    };
    return ContactPage;
}());
ContactPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'contact-us',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/Contact-us/contact-us.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="md-menu"></ion-icon>\n    </button>\n    <ion-title text-uppercase>contact us</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content text-center padding>\n\n   <div class="logo">\n    <img  class="logoImg" src="assets/img/logo.png" />\n    </div>\n    <br>\n    <ion-card class="shadow">\n    <ion-item class="custom-item">\n    <ion-item color="primary"><b>Contact Us</b></ion-item>\n      <ion-item><b class="gray">Timings: 6am - 2pm(7 days)</b></ion-item>\n      <ion-item teappable ion-item text-wrap no-lines (click)="call()">\n          <ion-icon item-start name="call" class="Phone"></ion-icon><b class="PhoneNo">011-61616161</b>\n      </ion-item>\n      <ion-item teappable ion-item text-wrap no-lines class="marg2" (click)="sendFeedback()">\n          <ion-icon item-start name="mail" class="Phone"></ion-icon><b>contactus@dairylac.com</b>\n      </ion-item>\n      <ion-item>\n        <b text-wrap class="gray">H.O.:B 9/2 2nd Floor, Ring Road,<br> Rajouri Garden,\n          <br>New Delhi-110027</b>\n      </ion-item>  \n      \n    </ion-item>\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/Contact-us/contact-us.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_user_data__["a" /* UserData */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_email_composer__["a" /* EmailComposer */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__["a" /* CallNumber */]])
], ContactPage);

//# sourceMappingURL=contact-us.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_data__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_profile__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChangePasPage = (function () {
    function ChangePasPage(_alert, navCtrl, userData, _loading, toastCtrl, navParams) {
        this._alert = _alert;
        this.navCtrl = navCtrl;
        this.userData = userData;
        this._loading = _loading;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.password = {};
    }
    ChangePasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangePasPage');
    };
    ChangePasPage.prototype.changePassword = function () {
        if (this.password.old == null || this.password.old == "") {
            this.presentToast("Enter current password");
        }
        else if (this.password.new == null || this.password.new == "") {
            this.presentToast("Enter new password");
        }
        else if (this.password.confirm != this.password.new) {
            this.presentToast("Password confirmation do not match");
        }
        else {
            this.updatePassword();
        }
    };
    ChangePasPage.prototype.updatePassword = function () {
        var _this = this;
        var pass = {};
        pass.user = {};
        pass.user = {
            current_password: this.password.old,
            password: this.password.new,
            password_confirmation: this.password.confirm
        };
        this.userData.resetPassword(pass).then(function (data) {
            _this.showLoader();
            var result = {};
            result = data;
            if (result.user && result.user.authentication_token) {
                _this.hideLoader();
                _this.presentToast("Password is changed");
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__profile_profile__["a" /* ProfilePage */]);
            }
            else if (result.current_password) {
                _this.hideLoader();
                _this.doAlert('Error', 'Current password does not match');
            }
            else {
                _this.hideLoader();
                _this.doAlert('Error', 'Please try again !');
            }
        });
    };
    ChangePasPage.prototype.showLoader = function () {
        this.loading = this._loading.create({
            content: 'Please wait...',
        });
        this.loading.present();
    };
    ChangePasPage.prototype.hideLoader = function () {
        this.loading.dismiss();
    };
    ChangePasPage.prototype.doAlert = function (type, message) {
        var alert = this._alert.create({
            title: type,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    ChangePasPage.prototype.presentToast = function (msg) {
        this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'bottom'
        }).present();
    };
    return ChangePasPage;
}());
ChangePasPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-change-pas',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/change-pas/change-pas.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title text-uppercase>Change Password</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="form-content" text-center>\n  <div class="Loginpage">\n    <div class="formContainer">\n      <div class="logo">\n        <img src="assets/img/logo.png" />\n      </div>\n      <br>\n      <form #userForm="ngForm" novalidate>\n          <ion-list class="app-form" no-margin>\n            <ion-item no-lines>\n              <ion-icon name="ios-lock-outline" item-start></ion-icon>\n              <ion-input name="oldPass" [(ngModel)]="password.old" type="text" placeholder="Current Password" required>\n              </ion-input>\n            </ion-item>\n\n            <ion-item no-lines>\n              <ion-icon name="ios-lock" item-start></ion-icon>\n              <ion-input name="newPass" [(ngModel)]="password.new" type="text" placeholder="New Password" required>\n              </ion-input>\n            </ion-item>\n\n            <ion-item no-lines>\n              <ion-icon name="ios-lock" item-start></ion-icon>\n              <ion-input name="confirmPass" [(ngModel)]="password.confirm" placeholder="Cofirm Password" type="text" required>\n              </ion-input>\n            </ion-item>\n          </ion-list>\n          <button color="primary" ion-button (click)="changePassword()" type="submit" round block>Change Password</button>\n        </form>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/change-pas/change-pas.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_user_data__["a" /* UserData */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], ChangePasPage);

//# sourceMappingURL=change-pas.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewAddressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__my_address_my_address__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__categories_categories__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ViewAddressPage = (function () {
    function ViewAddressPage(navCtrl, _alert) {
        this.navCtrl = navCtrl;
        this._alert = _alert;
        var data = JSON.parse(window.localStorage.getItem('user_address'));
        this.showAddress(data);
    }
    ViewAddressPage.prototype.showAddress = function (data) {
        if (data.addresses.length == 0) {
            this.presentConfirm();
        }
        else {
            this.address = data.addresses[0];
        }
    };
    ViewAddressPage.prototype.addAddressPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__my_address_my_address__["a" /* MyAddressPage */], { isAddress: true });
    };
    ViewAddressPage.prototype.presentConfirm = function () {
        var _this = this;
        var alert = this._alert.create({
            message: 'Please add one address.',
            buttons: [
                {
                    text: 'CANCEL',
                    handler: function () {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__categories_categories__["a" /* CategoriesPage */]);
                    }
                },
                {
                    text: 'ADD',
                    handler: function () {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__my_address_my_address__["a" /* MyAddressPage */]);
                    }
                }
            ]
        });
        alert.present();
    };
    return ViewAddressPage;
}());
ViewAddressPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'view-address',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/view-address/view-address.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle start>\n      <ion-icon name="md-menu"></ion-icon>\n    </button>\n    <ion-title text-uppercase>My Address</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-card  *ngIf="address" class=address-card>\n		<ion-card-content>\n			<ion-list class="address" padding>\n				<ion-card-title padding class="address-type">{{address.address_type}}</ion-card-title>\n				<ion-item no-lines> {{address.name}}</ion-item>\n	  			<ion-item no-lines>{{address.area.name}},</ion-item>\n	   			<ion-item no-lines> {{address.area.city.name}},</ion-item>\n	  			<ion-item no-lines>{{address.area.state.name}}</ion-item>\n  			</ion-list>\n		</ion-card-content>\n	</ion-card>\n	<div padding>\n		<button color="primary" (click)="addAddressPage()" ion-button block round padding text-uppercase>edit</button>\n	</div>\n</ion-content>\n'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/view-address/view-address.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], ViewAddressPage);

//# sourceMappingURL=view-address.js.map

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConferenceData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_data__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ConferenceData = (function () {
    function ConferenceData(http, user) {
        this.http = http;
        this.user = user;
        this.baseUrl = 'http://ec2-52-66-32-175.ap-south-1.compute.amazonaws.com';
    }
    ConferenceData.prototype.categories = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Get,
            headers: headers,
            url: this.baseUrl + '/categories'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                resolve(err);
            });
        });
    };
    ConferenceData.prototype.states = function () {
        var _this = this;
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile, 'X-User-Token': user.authentication_token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Get,
            headers: headers,
            url: this.baseUrl + '/states'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
                window.localStorage.setItem('states', JSON.stringify(res.json().states));
            }, function (err) {
                resolve(err);
            });
        });
    };
    ConferenceData.prototype.getAllOrders = function () {
        var _this = this;
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile, 'X-User-Token': user.authentication_token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Get,
            headers: headers,
            url: this.baseUrl + '/orders/customer_orders'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
                window.localStorage.setItem('allOrders', JSON.stringify(res.json()));
            }, function (err) {
                resolve(err);
            });
        });
    };
    ConferenceData.prototype.newOrder = function (data) {
        var _this = this;
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile, 'X-User-Token': user.authentication_token });
        //add required data to send wiht post request in order object 
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Post,
            headers: headers,
            body: JSON.stringify(this.orderData(data)),
            url: this.baseUrl + '/orders'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                resolve(err);
            });
        });
    };
    ConferenceData.prototype.updateOrder = function (data) {
        var _this = this;
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile, 'X-User-Token': user.authentication_token });
        //add required data to send wiht post request in order object 
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Put,
            headers: headers,
            body: JSON.stringify(this.orderData(data)),
            url: this.baseUrl + '/orders/' + data.order_id
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                resolve(err);
            });
        });
    };
    ConferenceData.prototype.orderData = function (data) {
        var userAddress = JSON.parse(window.localStorage.getItem('user_address'));
        var allOrders = JSON.parse(window.localStorage.getItem('allOrders'));
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var order = {};
        order.address_id = userAddress.addresses[0].id;
        order.alter_from = data.alter_from;
        if (allOrders.length) {
            order.alternate = "false";
        }
        else {
            order.alternate = "true";
        }
        order.app_version = "2.1";
        order.customer_id = user.id;
        order.delivery_date = data.delivery_date;
        order.isNew = data.isNew;
        order.order_packages_attributes = data.order_packages_attributes;
        order.pickup = data.pickup;
        order.recurring = data.recurring;
        return { order: order };
    };
    ConferenceData.prototype.cancelOrder = function () {
        var _this = this;
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var allOrders = JSON.parse(window.localStorage.getItem('allOrders'));
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile, 'X-User-Token': user.authentication_token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Delete,
            headers: headers,
            url: this.baseUrl + '/orders/' + allOrders[0].id
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                resolve(err);
            });
        });
    };
    ConferenceData.prototype.createChildOrder = function (order) {
        var _this = this;
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var userAddress = JSON.parse(window.localStorage.getItem('user_address'));
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile, 'X-User-Token': user.authentication_token });
        order.address_id = userAddress.addresses[0].id;
        order.alternate = "false";
        order.app_version = "2.1";
        order.customer_id = user.id;
        //add required data to send wiht post request in order object 
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Post,
            headers: headers,
            body: JSON.stringify({ order: order }),
            url: this.baseUrl + '/orders'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                resolve(err);
            });
        });
    };
    ConferenceData.prototype.createDnd = function (order) {
        var _this = this;
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var allOrders = JSON.parse(window.localStorage.getItem('allOrders'));
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile, 'X-User-Token': user.authentication_token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Put,
            headers: headers,
            body: JSON.stringify({ order: order }),
            url: this.baseUrl + '/orders/' + allOrders[0].id
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                resolve(err);
            });
        });
    };
    ConferenceData.prototype.removeDnd = function (order) {
        var _this = this;
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var allOrders = JSON.parse(window.localStorage.getItem('allOrders'));
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile, 'X-User-Token': user.authentication_token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Put,
            headers: headers,
            body: JSON.stringify({ order: order }),
            url: this.baseUrl + '/orders/' + allOrders[0].id
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                resolve(err);
            });
        });
    };
    return ConferenceData;
}());
ConferenceData = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_2__user_data__["a" /* UserData */]])
], ConferenceData);

//# sourceMappingURL=conference-data.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Splash; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Splash = (function () {
    function Splash(viewCtrl, splashScreen) {
        this.viewCtrl = viewCtrl;
        this.splashScreen = splashScreen;
    }
    Splash.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.splashScreen.hide();
        setTimeout(function () {
            _this.viewCtrl.dismiss();
        }, 4000);
    };
    return Splash;
}());
Splash = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-splash',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/splash/splash.html"*/'<ion-content>\n \n    <img src="assets/img/test.gif">\n \n</ion-content>'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/splash/splash.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _b || Object])
], Splash);

var _a, _b;
//# sourceMappingURL=splash.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(242);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_signup_signup__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_categories_categories__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_product_list_product_list__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_place_order_place_order__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_my_address_my_address__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_view_address_view_address__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_Nutrition_Values_nutrition_values__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_payment_due_payment_due__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_Contact_us_contact_us__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_last_five_order_last_five_order__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_profile_profile__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_change_pas_change_pas__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_checkout_checkout__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_checkout_modal_checkout_modal__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_current_order_current_order__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_edit_order_edit_order__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_set_nonavailability_set_nonavailability__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_edit_daily_order_edit_daily_order__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_edit_order_duration_edit_order_duration__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_conference_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_user_data__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_alerts_provider__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_email_composer__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_ionic2_calendar__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_ionic3_datepicker__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_call_number__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_splash_splash__ = __webpack_require__(220);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





































var config = {
    backButtonText: '',
    backButtonIcon: 'md-arrow-back',
    tabsPlacement: 'bottom',
    pageTransition: 'ios',
    mode: 'ios',
    menuType: 'overlay'
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* ConferenceApp */],
            __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_categories_categories__["a" /* CategoriesPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_product_list_product_list__["a" /* ProductListPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_change_pas_change_pas__["a" /* ChangePasPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_place_order_place_order__["a" /* PlaceOrderPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_my_address_my_address__["a" /* MyAddressPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_view_address_view_address__["a" /* ViewAddressPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_Nutrition_Values_nutrition_values__["a" /* NutritionValues */],
            __WEBPACK_IMPORTED_MODULE_17__pages_payment_due_payment_due__["a" /* PaymentDue */],
            __WEBPACK_IMPORTED_MODULE_18__pages_Contact_us_contact_us__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_last_five_order_last_five_order__["a" /* LastFiveOrder */],
            __WEBPACK_IMPORTED_MODULE_22__pages_checkout_checkout__["a" /* CheckoutPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_checkout_modal_checkout_modal__["a" /* CheckoutModalPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_current_order_current_order__["a" /* CurrentOrderPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_edit_order_edit_order__["a" /* EditOrderPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_set_nonavailability_set_nonavailability__["a" /* SetNonavailabilityPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_edit_daily_order_edit_daily_order__["a" /* EditDailyOrderPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_edit_order_duration_edit_order_duration__["a" /* EditOrderDurationPage */],
            __WEBPACK_IMPORTED_MODULE_36__pages_splash_splash__["a" /* Splash */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_33_ionic2_calendar__["a" /* NgCalendarModule */],
            __WEBPACK_IMPORTED_MODULE_34_ionic3_datepicker__["a" /* DatePickerModule */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* ConferenceApp */], config, {
                links: [
                    { component: __WEBPACK_IMPORTED_MODULE_11__pages_categories_categories__["a" /* CategoriesPage */], name: 'Categories', segment: 'categories' },
                    { component: __WEBPACK_IMPORTED_MODULE_12__pages_product_list_product_list__["a" /* ProductListPage */], name: 'ProductList', segment: 'productList' },
                    { component: __WEBPACK_IMPORTED_MODULE_13__pages_place_order_place_order__["a" /* PlaceOrderPage */], name: 'PlaceOrder', segment: 'placeOrder' },
                    { component: __WEBPACK_IMPORTED_MODULE_14__pages_my_address_my_address__["a" /* MyAddressPage */], name: 'MyAddress', segment: 'myAddress' },
                    { component: __WEBPACK_IMPORTED_MODULE_15__pages_view_address_view_address__["a" /* ViewAddressPage */], name: 'ViewAddress', segment: 'viewAddress' },
                    { component: __WEBPACK_IMPORTED_MODULE_16__pages_Nutrition_Values_nutrition_values__["a" /* NutritionValues */], name: 'NutritionValues', segment: 'nutritionValues' },
                    { component: __WEBPACK_IMPORTED_MODULE_17__pages_payment_due_payment_due__["a" /* PaymentDue */], name: 'PaymentDue', segment: 'paymentDue' },
                    { component: __WEBPACK_IMPORTED_MODULE_18__pages_Contact_us_contact_us__["a" /* ContactPage */], name: 'ContactPage', segment: 'contactUs' },
                    { component: __WEBPACK_IMPORTED_MODULE_19__pages_last_five_order_last_five_order__["a" /* LastFiveOrder */], name: 'LastFiveOrder', segment: 'lastFiveOrder' },
                    { component: __WEBPACK_IMPORTED_MODULE_22__pages_checkout_checkout__["a" /* CheckoutPage */], name: 'Checkout', segment: 'checkout' },
                    { component: __WEBPACK_IMPORTED_MODULE_23__pages_checkout_modal_checkout_modal__["a" /* CheckoutModalPage */], name: 'CheckoutModal', segment: 'checkoutModal' },
                    { component: __WEBPACK_IMPORTED_MODULE_24__pages_current_order_current_order__["a" /* CurrentOrderPage */], name: 'CurrentOrder', segment: 'currentOrder' },
                    { component: __WEBPACK_IMPORTED_MODULE_25__pages_edit_order_edit_order__["a" /* EditOrderPage */], name: 'EditOrder', segment: 'editOrder' },
                    { component: __WEBPACK_IMPORTED_MODULE_26__pages_set_nonavailability_set_nonavailability__["a" /* SetNonavailabilityPage */], name: 'SetNonavailability', segment: 'setNonavailability' },
                    { component: __WEBPACK_IMPORTED_MODULE_27__pages_edit_daily_order_edit_daily_order__["a" /* EditDailyOrderPage */], name: 'EditDaily', segment: 'editDailyOrder' },
                    { component: __WEBPACK_IMPORTED_MODULE_28__pages_edit_order_duration_edit_order_duration__["a" /* EditOrderDurationPage */], name: 'EditOrderDuration', segment: 'editOrderDuration' },
                    { component: __WEBPACK_IMPORTED_MODULE_20__pages_profile_profile__["a" /* ProfilePage */], name: 'ProfilePage', segment: 'profile' },
                    { component: __WEBPACK_IMPORTED_MODULE_21__pages_change_pas_change_pas__["a" /* ChangePasPage */], name: 'ChangePasPage', segment: 'changePassword' },
                    { component: __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */], name: 'LoginPage', segment: 'login' },
                    { component: __WEBPACK_IMPORTED_MODULE_10__pages_signup_signup__["a" /* SignupPage */], name: 'SignupPage', segment: 'signup' }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["a" /* IonicStorageModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* ConferenceApp */],
            __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_categories_categories__["a" /* CategoriesPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_product_list_product_list__["a" /* ProductListPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_place_order_place_order__["a" /* PlaceOrderPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_change_pas_change_pas__["a" /* ChangePasPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_my_address_my_address__["a" /* MyAddressPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_view_address_view_address__["a" /* ViewAddressPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_Nutrition_Values_nutrition_values__["a" /* NutritionValues */],
            __WEBPACK_IMPORTED_MODULE_17__pages_payment_due_payment_due__["a" /* PaymentDue */],
            __WEBPACK_IMPORTED_MODULE_20__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_Contact_us_contact_us__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_last_five_order_last_five_order__["a" /* LastFiveOrder */],
            __WEBPACK_IMPORTED_MODULE_22__pages_checkout_checkout__["a" /* CheckoutPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_checkout_modal_checkout_modal__["a" /* CheckoutModalPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_current_order_current_order__["a" /* CurrentOrderPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_edit_order_edit_order__["a" /* EditOrderPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_set_nonavailability_set_nonavailability__["a" /* SetNonavailabilityPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_edit_daily_order_edit_daily_order__["a" /* EditDailyOrderPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_edit_order_duration_edit_order_duration__["a" /* EditOrderDurationPage */],
            __WEBPACK_IMPORTED_MODULE_36__pages_splash_splash__["a" /* Splash */]
        ],
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_29__providers_conference_data__["a" /* ConferenceData */],
            __WEBPACK_IMPORTED_MODULE_30__providers_user_data__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_31__providers_alerts_provider__["a" /* Alerts */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_32__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_35__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConferenceApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_login__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_payment_due_payment_due__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_categories_categories__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_last_five_order_last_five_order__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_Nutrition_Values_nutrition_values__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_Contact_us_contact_us__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_profile_profile__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_view_address_view_address__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_edit_order_edit_order__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_conference_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_user_data__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_alerts_provider__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_splash_splash__ = __webpack_require__(220);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var ConferenceApp = (function () {
    function ConferenceApp(events, userData, menu, platform, confData, alerts, splashScreen, modalCtrl) {
        this.events = events;
        this.userData = userData;
        this.menu = menu;
        this.platform = platform;
        this.confData = confData;
        this.alerts = alerts;
        this.splashScreen = splashScreen;
        this.modalCtrl = modalCtrl;
        // List of pages that can be navigated to from the left menu
        // the left menu only works after login
        // the login page disables the left menu
        this.appPages = [
            { title: 'Main Menu', name: 'CategoriesPage', component: __WEBPACK_IMPORTED_MODULE_5__pages_categories_categories__["a" /* CategoriesPage */], icon: 'apps', categories: true },
            { title: 'My Profile', name: 'ProfilePage', component: __WEBPACK_IMPORTED_MODULE_9__pages_profile_profile__["a" /* ProfilePage */], icon: 'md-contact', profile: true },
            { title: 'My Orders', name: 'EditOrderPage', component: __WEBPACK_IMPORTED_MODULE_11__pages_edit_order_edit_order__["a" /* EditOrderPage */], icon: 'basket', editOrder: true },
            { title: 'My Address', name: 'ViewAddressPage', component: __WEBPACK_IMPORTED_MODULE_10__pages_view_address_view_address__["a" /* ViewAddressPage */], icon: 'locate', viewAddress: true },
            { title: 'Nutrition Values', name: 'NutritionValues', component: __WEBPACK_IMPORTED_MODULE_7__pages_Nutrition_Values_nutrition_values__["a" /* NutritionValues */], icon: 'nutrition', nutritionValues: true },
            { title: 'Contact Us', name: 'ContactPage', component: __WEBPACK_IMPORTED_MODULE_8__pages_Contact_us_contact_us__["a" /* ContactPage */], icon: 'md-mail', contactUs: true },
            { title: 'Payment Due', name: 'PaymentDue', component: __WEBPACK_IMPORTED_MODULE_4__pages_payment_due_payment_due__["a" /* PaymentDue */], icon: 'logo-usd', paymentdue: true },
            { title: 'Last Five Deliveries', name: 'LastFiveOrder', component: __WEBPACK_IMPORTED_MODULE_6__pages_last_five_order_last_five_order__["a" /* LastFiveOrder */], icon: 'skip-backward', lastOrders: true },
            { title: 'Logout', name: '', component: null, icon: 'log-out', logsOut: true }
        ];
        this.cashboyPages = [
            { title: 'Main Menu', name: 'CategoriesPage', component: __WEBPACK_IMPORTED_MODULE_5__pages_categories_categories__["a" /* CategoriesPage */], icon: 'apps', categories: true },
            { title: 'My Profile', icon: 'md-contact', disable: true },
            { title: 'My Orders', icon: 'basket', disable: true },
            { title: 'My Address', icon: 'locate', disable: true },
            { title: 'Nutrition Values', name: 'NutritionValues', component: __WEBPACK_IMPORTED_MODULE_7__pages_Nutrition_Values_nutrition_values__["a" /* NutritionValues */], icon: 'nutrition', nutritionValues: true },
            { title: 'Contact Us', name: 'ContactPage', component: __WEBPACK_IMPORTED_MODULE_8__pages_Contact_us_contact_us__["a" /* ContactPage */], icon: 'md-mail', contactUs: true },
            { title: 'Payment Due', name: 'PaymentDue', component: __WEBPACK_IMPORTED_MODULE_4__pages_payment_due_payment_due__["a" /* PaymentDue */], icon: 'logo-usd', paymentdue: true, disable: true },
            { title: 'Last Five Deliveries', name: 'LastFiveOrder', component: __WEBPACK_IMPORTED_MODULE_6__pages_last_five_order_last_five_order__["a" /* LastFiveOrder */], icon: 'skip-backward', lastOrders: true, disable: true },
            { title: 'Login', name: '', component: __WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */], icon: 'log-in', login: true }
        ];
        this.isLogin = false;
        if (window.localStorage.getItem('login_details')) {
            this.isLogin = true;
        }
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_categories_categories__["a" /* CategoriesPage */];
        this.platformReady();
        this.listenToUserEvents();
    }
    ConferenceApp.prototype.openPage = function (page) {
        var params = {};
        // the nav component was found using @ViewChild(Nav)
        // setRoot on the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
            params = { tabIndex: page.index };
        }
        if (page.categories === true) {
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_categories_categories__["a" /* CategoriesPage */]);
        }
        if (page.login === true) {
            this.nav.push(__WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */]);
        }
        if (page.viewAddress === true) {
            this.alerts.showLoader();
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_10__pages_view_address_view_address__["a" /* ViewAddressPage */]);
            this.alerts.hideLoader();
        }
        if (page.editOrder === true) {
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_11__pages_edit_order_edit_order__["a" /* EditOrderPage */]);
        }
        // If we are already on tabs just change the selected tab
        // don't setRoot again, this maintains the history stack of the
        // tabs even if changing them from the menupage.
        if (page.logsOut === true) {
            this.alerts.showLoader();
            this.isLogin = false;
            window.localStorage.removeItem('login_details');
            window.localStorage.removeItem('user_address');
            window.localStorage.removeItem('add_address');
            window.localStorage.removeItem('states');
            window.localStorage.removeItem('prescriptions');
            window.localStorage.removeItem('current_page');
            window.localStorage.removeItem('_qrcode');
            window.localStorage.removeItem('device_token');
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_categories_categories__["a" /* CategoriesPage */]);
            this.alerts.hideLoader();
        }
        else {
            if (page.index != 3) {
                if (this.nav.getActiveChildNavs().length && page.index != undefined) {
                    this.nav.getActiveChildNavs()[0].select(page.index);
                    // Set the root of the nav with params if it's a tab index
                }
                else {
                    this.nav.setRoot(page.name, params).catch(function (err) {
                        console.log("Didn't set nav root: " + err);
                    });
                }
            }
        }
    };
    ConferenceApp.prototype.listenToUserEvents = function () {
        var _this = this;
        this.events.subscribe('user:loggedin', function () {
            _this.isLogin = true;
        });
    };
    ConferenceApp.prototype.platformReady = function () {
        var _this = this;
        // Call any initial plugins when ready
        this.platform.ready().then(function () {
            //this.splashScreen.hide();
            var splash = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_15__pages_splash_splash__["a" /* Splash */]);
            splash.present();
            if (_this.platform.is('android')) {
                window.localStorage.setItem('deviceType', "android");
            }
            if (_this.platform.is('ios')) {
                window.localStorage.setItem('deviceType', "ios");
            }
        });
    };
    return ConferenceApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
], ConferenceApp.prototype, "nav", void 0);
ConferenceApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/app/app.template.html"*/'\n\n  <ion-menu [content]="content" small>\n\n    <ion-header text-center>\n      <ion-toolbar color="none" menuClose text-center>\n        <ion-title><img src="assets/img/logo.png"/></ion-title>\n      </ion-toolbar>\n    </ion-header>\n\n    <ion-content>\n      <ion-list [hidden]="!isLogin">\n        <button  ion-item menuClose no-lines *ngFor="let p of appPages" (click)="openPage(p)" color="none" [hidden]="isLogin && disable">\n          <ion-icon item-start [name]="p.icon" class="fontColor"></ion-icon>\n          {{p.title}}\n        </button>\n      </ion-list>\n      <ion-list [hidden]="isLogin">\n        <button ion-item menuClose no-lines *ngFor="let p of cashboyPages" (click)="openPage(p)" color="none" disabled={{p.disable}}>\n          <ion-icon item-start [name]="p.icon" class="fontColor"></ion-icon>\n          {{p.title}}\n        </button>\n      </ion-list>\n    </ion-content>\n\n  </ion-menu>\n\n  <!-- main navigation -->\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false" main name="app"></ion-nav>\n'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/app/app.template.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
        __WEBPACK_IMPORTED_MODULE_13__providers_user_data__["a" /* UserData */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_12__providers_conference_data__["a" /* ConferenceData */],
        __WEBPACK_IMPORTED_MODULE_14__providers_alerts_provider__["a" /* Alerts */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
], ConferenceApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 300:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_user_data__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_list_product_list__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_conference_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alerts_provider__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






;
var CategoriesPage = (function () {
    function CategoriesPage(navCtrl, viewCtrl, confData, userData, alert) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.confData = confData;
        this.userData = userData;
        this.alert = alert;
        this.categories = [];
        window.localStorage.setItem('current_page', this.viewCtrl.name);
        console.log(this.viewCtrl.name);
        this.productList();
    }
    CategoriesPage.prototype.productList = function () {
        var _this = this;
        this.alert.showLoader();
        this.confData.categories().then(function (res) {
            _this.alert.hideLoader();
            if (res.status == 200) {
                var result = res.json();
                _this.categories = result.categories;
                window.localStorage.setItem('categories', JSON.stringify(_this.categories));
            }
            else {
                _this.alert.presentToast("something went wrong!");
            }
        });
    };
    CategoriesPage.prototype.showlist = function (number) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__product_list_product_list__["a" /* ProductListPage */], { id: number });
    };
    return CategoriesPage;
}());
CategoriesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'categories',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/categories/categories.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="md-menu"></ion-icon>\n    </button>\n    <ion-title text-uppercase>Place Order</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <div class="main-list">\n    <ion-card *ngFor="let cat of categories; \n   let i = index" (click)=\'showlist(i)\'>\n      <img src="{{cat.products[0].image}}"/>\n      <div class="card-price">{{cat.products[0].price | currency:\'INR\':true}}</div>\n      <ion-item>\n        <ion-avatar text-center item-start>\n        <ion-icon name="ios-more" color="light"></ion-icon>\n      </ion-avatar>\n      <h2 color="light" no-margin>{{cat.name}}</h2>\n      </ion-item>\n    </ion-card>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/categories/categories.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_conference_data__["a" /* ConferenceData */],
        __WEBPACK_IMPORTED_MODULE_1__providers_user_data__["a" /* UserData */],
        __WEBPACK_IMPORTED_MODULE_5__providers_alerts_provider__["a" /* Alerts */]])
], CategoriesPage);

//# sourceMappingURL=categories.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_conference_data__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__set_nonavailability_set_nonavailability__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__edit_daily_order_edit_daily_order__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__edit_order_duration_edit_order_duration__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_alerts_provider__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EditOrderPage = (function () {
    function EditOrderPage(navCtrl, navParams, confData, alerts) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.confData = confData;
        this.alerts = alerts;
        this.hasOrders = false;
        this.getAllOrders();
    }
    EditOrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditOrderPage');
    };
    EditOrderPage.prototype.getAllOrders = function () {
        var _this = this;
        this.alerts.showLoader();
        this.confData.getAllOrders().then(function (data) {
            if (data.status == 200) {
                var allOrders = JSON.parse(window.localStorage.getItem('allOrders'));
                if (allOrders.length) {
                    _this.hasOrders = true;
                }
            }
            else {
                _this.alerts.presentToast(data.statusText);
            }
        });
        this.alerts.hideLoader();
    };
    EditOrderPage.prototype.nonAvialability = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__set_nonavailability_set_nonavailability__["a" /* SetNonavailabilityPage */]);
    };
    EditOrderPage.prototype.editDailyOrder = function () {
        this.alerts.showLoader();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__edit_daily_order_edit_daily_order__["a" /* EditDailyOrderPage */]);
        this.alerts.hideLoader();
    };
    EditOrderPage.prototype.editOrderDuration = function () {
        this.alerts.showLoader();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__edit_order_duration_edit_order_duration__["a" /* EditOrderDurationPage */]);
        this.alerts.hideLoader();
    };
    return EditOrderPage;
}());
EditOrderPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-edit-order',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/edit-order/edit-order.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle start>\n      <ion-icon name="md-menu"></ion-icon>\n    </button>\n    <ion-title text-uppercase>Edit Order</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list class="cart-list" *ngIf="hasOrders;else other_content">\n    <ion-item no-lines>\n      <ion-thumbnail item-start>\n        <img src="assets/img/set-non-availability.png">\n      </ion-thumbnail>\n      <h4 color="dark">Set non availability</h4>\n      <ion-grid no-padding>\n        <ion-row style="padding-top: 10px">\n          <ion-col text-left col-6>\n            <button (click)="nonAvialability()" ion-button  round color="primary" text-uppercase no-margin>\n              Update\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n    <ion-item no-lines>\n      <ion-thumbnail item-start>\n        <img src="assets/img/edit-order-duration.png">\n      </ion-thumbnail>\n      <h4 color="dark">Edit order for a duration</h4>\n      <ion-grid no-padding>\n        <ion-row style="padding-top: 10px">\n          <ion-col text-left col-6>\n            <button (click)="editOrderDuration()" ion-button  round color="primary" text-uppercase no-margin>\n              Update\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n    <ion-item no-lines>\n      <ion-thumbnail item-start>\n        <img src="assets/img/edit-daily-order.png">\n      </ion-thumbnail>\n      <h4 color="dark">Edit daily order</h4>\n      <ion-grid no-padding>\n        <ion-row style="padding-top: 10px">\n          <ion-col text-left col-6>\n            <button (click)="editDailyOrder()" ion-button  round color="primary" text-uppercase no-margin>\n              Update\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n  </ion-list> \n    <ng-template #other_content>\n    <div><h2>No order yet</h2></div>\n  </ng-template>\n</ion-content>\n'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/edit-order/edit-order.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_conference_data__["a" /* ConferenceData */],
        __WEBPACK_IMPORTED_MODULE_6__providers_alerts_provider__["a" /* Alerts */]])
], EditOrderPage);

//# sourceMappingURL=edit-order.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_data__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__categories_categories__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signup_signup__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alerts_provider__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = (function () {
    function LoginPage(events, navCtrl, userData, menu, alerts) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.userData = userData;
        this.menu = menu;
        this.alerts = alerts;
        this.flag = false;
        this.login = { username: '', password: '' };
        this.submitted = false;
    }
    LoginPage.prototype.onLogin = function (form) {
        var _this = this;
        this.submitted = true;
        if (form.valid) {
            this.alerts.showLoader();
            this.userData.login(this.login.username, this.login.password).then(function (results) {
                var resultData = {};
                resultData = results;
                if (resultData.status == 200) {
                    _this.userData.userAddress().then(function (address) {
                        _this.alerts.hideLoader();
                        var data = {};
                        data = address;
                        if (data.status == 200) {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__categories_categories__["a" /* CategoriesPage */]);
                        }
                        else {
                            _this.alerts.presentToast('something went wrong');
                        }
                    });
                }
                else {
                    _this.alerts.hideLoader();
                    _this.alerts.presentToast('Username and password do not match.');
                }
            });
        }
    };
    LoginPage.prototype.onSignup = function () {
        this.alerts.showLoader();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__signup_signup__["a" /* SignupPage */]);
        this.alerts.hideLoader();
    };
    LoginPage.prototype.forgotPassword = function () {
        var _this = this;
        if (this.login.username.length < 10 || this.login.username.length > 10) {
            this.alerts.presentToast('Enter 10 digits mobile no.');
        }
        else {
            this.alerts.showLoader();
            this.userData.forgotPassword(this.login.username).then(function (res) {
                _this.alerts.hideLoader();
                if (res.status == 200) {
                    _this.alerts.presentToast('You will recieve a message soon.');
                }
                else if (res.status == 500) {
                    _this.alerts.presentToast('Mobile number is not registered');
                }
                else {
                    _this.alerts.presentToast('something went wrong.');
                }
            });
        }
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'login-user',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/login/login.html"*/'<ion-header>\n	<ion-navbar color="primary">\n		<ion-title><b>Login</b></ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content class="form-content" text-center>\n\n  <div class="Loginpage">\n    <div class="formContainer">\n        <div class="logo">\n          <img src="assets/img/logo.png" />\n        </div>\n        <br>\n        <form #loginForm="ngForm" novalidate>\n          <ion-list class="app-form" no-margin>\n            <ion-item no-lines>\n              <ion-icon name="ios-person-outline" item-start></ion-icon>\n              <ion-input [(ngModel)]="login.username" name="username" type="tel"  \n                 #username="ngModel" maxlength="10" placeholder="Registered Number" \n    					   required>     \n              </ion-input>\n            </ion-item>\n      		  <p ion-text [hidden]="username.valid || submitted == false" color="danger">\n      				Username is required\n      			</p>\n\n            <ion-item no-lines>\n              <ion-icon name="ios-lock-outline" item-start></ion-icon>\n              <ion-input [(ngModel)]="login.password" placeholder="Password" \n                name="password" type="password" #password="ngModel" required>\n      				</ion-input>\n            </ion-item>\n      		  <p ion-text [hidden]="password.valid || submitted == false" color="danger">\n      				Password is required\n      			</p>\n          </ion-list>\n\n          <button (click)="onLogin(loginForm)" type="button"  color="primary" ion-button round block>Login</button>\n          <button color="secondary" (click)="onSignup()" ion-button round block>Register</button>\n\n          <p (click)="forgotPassword()" margin-top>Forgot Password ?</p>\n      </form>\n    </div>\n  </div>\n</ion-content>\n\n'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_user_data__["a" /* UserData */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_5__providers_alerts_provider__["a" /* Alerts */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the CheckoutModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CheckoutModalPage = (function () {
    function CheckoutModalPage(navParams, view) {
        this.navParams = navParams;
        this.view = view;
        this.checked = true;
        this.mainNumber = 2;
        this.weekday = [{ "day": "Monday", "currentNumber": 2 }, { "day": "Tuesday", "currentNumber": 2 }, { "day": "Wednesday", "currentNumber": 2 }, { "day": "Thursday", "currentNumber": 2 }, { "day": "Friday", "currentNumber": 2 }, { "day": "Saturday", "currentNumber": 2 }, { "day": "Sunday", "currentNumber": 2 }];
    }
    CheckoutModalPage.prototype.ionViewDidLoad = function () {
        var recieveData = this.navParams.get('result');
        console.log(recieveData);
    };
    CheckoutModalPage.prototype.incrementMain = function () {
        if (this.mainNumber < 20) {
            if (this.mainNumber === 0) {
                this.mainNumber += 2;
                for (var i = 0; i < this.weekday.length; i++) {
                    this.weekday[i].currentNumber = this.mainNumber;
                }
            }
            else {
                this.mainNumber++;
                for (var j = 0; j < this.weekday.length; j++) {
                    this.weekday[j].currentNumber = this.mainNumber;
                }
            }
        }
    };
    CheckoutModalPage.prototype.decrementMain = function () {
        if (this.mainNumber !== 0) {
            if (this.mainNumber === 2) {
                this.mainNumber -= 2;
                for (var i = 0; i < this.weekday.length; i++) {
                    this.weekday[i].currentNumber = this.mainNumber;
                }
            }
            else {
                this.mainNumber--;
                for (var j = 0; j < this.weekday.length; j++) {
                    this.weekday[j].currentNumber = this.mainNumber;
                }
            }
        }
    };
    CheckoutModalPage.prototype.increment = function (index) {
        if (this.weekday[index].currentNumber < 20) {
            if (this.weekday[index].currentNumber === 0) {
                this.weekday[index].currentNumber += 2;
            }
            else {
                this.weekday[index].currentNumber++;
                console.log(this.weekday);
            }
        }
    };
    CheckoutModalPage.prototype.decrement = function (index) {
        if (this.weekday[index].currentNumber !== 0) {
            if (this.weekday[index].currentNumber === 2) {
                this.weekday[index].currentNumber -= 2;
            }
            else {
                this.weekday[index].currentNumber--;
                console.log(this.weekday);
            }
        }
    };
    CheckoutModalPage.prototype.status = function (index) {
        console.log(index);
        var div = document.querySelector("#toggle" + index);
        var display = div.style.display;
        div.style.display = (display === "block") ? "none" : "block";
        this.weekday[index].currentNumber = 0;
    };
    CheckoutModalPage.prototype.closeModal = function () {
        this.view.dismiss(null);
    };
    CheckoutModalPage.prototype.proceed = function () {
        this.view.dismiss(this.weekday);
    };
    return CheckoutModalPage;
}());
CheckoutModalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-checkout-modal',template:/*ion-inline-start:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/checkout-modal/checkout-modal.html"*/'<ion-content>\n	<ion-card class="card-details" [ngSwitch]="det">\n	<ion-card-content>\n      <div class="Qty" text-center>\n        <h3 color="primary" >Choose Quantity</h3>\n        <button ion-button icon-only class="op-btn" color="primary" (click)="decrementMain()">\n          <ion-icon name="md-remove" color="light"></ion-icon>\n        </button>\n        <button ion-button clear class="op-btn mid-btn">\n          {{mainNumber}}\n        </button>\n        <button ion-button icon-only class="op-btn" color="primary" (click)="incrementMain()">\n          <ion-icon name="md-add" color="light"></ion-icon>\n        </button>\n      </div>\n    </ion-card-content>\n	<ion-card-content>\n	      <div class="Qty" text-center *ngFor="let day of weekday; let i=index">\n			<h3 color="primary" >\n				<ion-checkbox id="toggle{{index}}" color="#849513" (click)= "status(i)" \n			       checked></ion-checkbox> {{day.day}}</h3>\n	        <button ion-button icon-only class="op-btn" color="primary" (click)="decrement(i)">\n	          <ion-icon name="md-remove" color="light"></ion-icon>\n	        </button>\n	        <button ion-button clear class="op-btn mid-btn">\n	          {{day.currentNumber}}\n	        </button>\n	        <button ion-button icon-only class="op-btn" color="primary" (click)="increment(i)">\n	          <ion-icon name="md-add" color="light"></ion-icon>\n	        </button>\n	      </div>\n	      <button (click)="closeModal()" type="button"  color="secondary" ion-button block round text-uppercase>CANCEL</button>\n			<button color="primary" (click)="proceed()" ion-button block round text-uppercase>PROCEED</button>\n	</ion-card-content>\n</ion-card>\n</ion-content>'/*ion-inline-end:"/Users/Ruchi/Downloads/dlac_customerapp/src/pages/checkout-modal/checkout-modal.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */]])
], CheckoutModalPage);

//# sourceMappingURL=checkout-modal.js.map

/***/ })

},[223]);
//# sourceMappingURL=main.js.map