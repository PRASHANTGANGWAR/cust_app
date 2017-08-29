webpackJsonp([0],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrescriptionListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_user_data__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_list_product_list__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_conference_data__ = __webpack_require__(55);
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
var PrescriptionListPage = (function () {
    function PrescriptionListPage(navCtrl, confData, _alert, _loading, userData, dataBase) {
        this.navCtrl = navCtrl;
        this.confData = confData;
        this._alert = _alert;
        this._loading = _loading;
        this.userData = userData;
        this.dataBase = dataBase;
        this.speakers = [];
        this.prescriptions = [];
        this.listLength = false;
        this.username = 'john';
        this.listStatus = false;
        //this.prescriptionList();
        //let user = JSON.parse(window.localStorage.getItem('login_details'));
        //this.username = user.name;
        this.productList();
    }
    PrescriptionListPage.prototype.productList = function () {
        var _this = this;
        this.confData.categories().then(function (results) {
            console.log(results);
            _this.dataBase.insertProducts(results);
        });
    };
    PrescriptionListPage.prototype.showlist = function (number) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__product_list_product_list__["a" /* ProductListPage */], { id: number });
    };
    PrescriptionListPage.prototype.prescriptionList = function () {
        var _this = this;
        this.showLoader();
        this.confData.prescriptionData(null).then(function (results) {
            var resultData = {};
            resultData = results;
            if (resultData.status == 200) {
                _this.hideLoader();
                _this.prescriptions = resultData.message;
                for (var i = 0; i < _this.prescriptions.length; i++) {
                    var date = new Date(_this.prescriptions[i].dos);
                    if (!_this.prescriptions[i].duration) {
                        _this.prescriptions[i].duration = 3650;
                    }
                    console.log(date.setTime(date.getTime() + (_this.prescriptions[i].duration - 1) * 86400000));
                    _this.prescriptions[i].doe = date.toString();
                    console.log(_this.prescriptions);
                    window.localStorage.setItem('prescriptions', JSON.stringify(_this.prescriptions));
                    if (_this.prescriptions[i].status == 'on going') {
                        _this.listStatus = true;
                    }
                }
                if (_this.prescriptions.length == 0) {
                    _this.listLength = true;
                }
            }
            else {
                _this.hideLoader();
                _this.doAlert('Error', 'something went wrong.');
            }
        });
    };
    PrescriptionListPage.prototype.update = function (index, medicine, event) {
        if (event == "reschedule") {
            this.presentPrompt(index, medicine, event);
        }
        else {
            this.presentConfirm(index, medicine, event);
        }
    };
    PrescriptionListPage.prototype.toggle = function (index) {
        var div = document.querySelector("#hide-show" + index);
        var display = div.style.display;
        console.log(document.querySelector("#hide-show" + index));
        div.style.display = (display === "block") ? "none" : "block";
    };
    PrescriptionListPage.prototype.presentPrompt = function (index, medicine, event) {
        var _this = this;
        var alert = this._alert.create({
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
                    handler: function (data) {
                        console.log(data + 'Cancel clicked');
                    }
                },
                {
                    text: event.toUpperCase(),
                    handler: function (data) {
                        var post_time = data.postpone_time;
                        if (post_time && post_time <= 120) {
                            _this.showLoader();
                            _this.decide(index, medicine, event, post_time);
                        }
                        else {
                            return false;
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    PrescriptionListPage.prototype.presentConfirm = function (index, medicine, event) {
        var _this = this;
        var alert = this._alert.create({
            title: 'Confirm Action',
            message: 'Do you want to ' + event + ' this medicine?',
            buttons: [
                {
                    text: 'CANCEL',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: event.toUpperCase(),
                    handler: function () {
                        if (event == "miss") {
                            event = "missed";
                            _this.showLoader();
                        }
                        else {
                            event = "taken";
                            _this.showLoader();
                        }
                        _this.decide(index, medicine, event, null);
                    }
                }
            ]
        });
        alert.present();
    };
    PrescriptionListPage.prototype.decide = function (index, medicine, event, post_time) {
        var _this = this;
        var dtime;
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var serialId = user.serial.toString();
        if (medicine.intervals) {
            dtime = medicine.intervals[index].time;
        }
        else if (medicine.frequency) {
            dtime = medicine.frequency[index].time;
        }
        var presData = {};
        presData.userid = serialId;
        presData.prescription_id = medicine._id;
        presData.status = event;
        presData.dose_time = dtime;
        presData.time = post_time;
        this.confData.eventScheduler(presData).then(function (results) {
            var resultData = {};
            resultData = results;
            if (resultData.status == 200) {
                _this.hideLoader();
                _this.prescriptionList();
            }
            else {
                _this.hideLoader();
                _this.doAlert('Error', 'something went wrong.');
            }
        });
    };
    PrescriptionListPage.prototype.doAlert = function (type, message) {
        var alert = this._alert.create({
            title: type,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    PrescriptionListPage.prototype.showLoader = function () {
        this.loading = this._loading.create({
            content: 'Please wait...',
        });
        this.loading.present();
    };
    PrescriptionListPage.prototype.hideLoader = function () {
        this.loading.dismiss();
    };
    return PrescriptionListPage;
}());
PrescriptionListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-prescription-list',template:/*ion-inline-start:"/Users/user/Desktop/ionic3-projects/customer-app/src/pages/prescription-list/prescription-list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle="left" style="display: inline-block !important;">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Place Order</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <button ion-button outline block round icon-left (click)=\'showlist(1)\'>\n    <ion-icon name="analytics"></ion-icon>\n    DESI COW MILK\n  </button>\n\n  <button ion-button outline block round icon-left (click)=\'showlist(4)\'>\n    <ion-icon name="analytics"></ion-icon>\n    DESI BUFFALO MILK\n  </button>\n</ion-content>\n'/*ion-inline-end:"/Users/user/Desktop/ionic3-projects/customer-app/src/pages/prescription-list/prescription-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_5__providers_conference_data__["a" /* ConferenceData */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1__providers_user_data__["a" /* UserData */],
        __WEBPACK_IMPORTED_MODULE_3__providers_db_provider__["a" /* Database */]])
], PrescriptionListPage);

//# sourceMappingURL=prescription-list.js.map

/***/ }),

/***/ 114:
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
webpackEmptyAsyncContext.id = 114;

/***/ }),

/***/ 155:
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
webpackEmptyAsyncContext.id = 155;

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_db_provider__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(44);
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
    function ProductListPage(navParams, dataBase, navCtrl, toastCtrl) {
        this.navParams = navParams;
        this.dataBase = dataBase;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        var id = navParams.get('id');
        console.log("this is id" + " " + id);
        this.getProducts(id);
    }
    ProductListPage.prototype.getProducts = function (id) {
        var _this = this;
        this.dataBase.getProducts(id).then(function (results) {
            debugger;
            console.log(results);
            _this.products = JSON.parse(results[0].products);
        });
    };
    ProductListPage.prototype.additionalData = function () {
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var token = user.authentication_token;
        if (token) {
            //do something
        }
        else {
            this.presentToast();
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
        }
    };
    ProductListPage.prototype.presentToast = function () {
        this.toastCtrl.create({
            message: 'Please login first',
            duration: 2000,
            position: 'bottom'
        }).present();
    };
    return ProductListPage;
}());
ProductListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'product-list',template:/*ion-inline-start:"/Users/user/Desktop/ionic3-projects/customer-app/src/pages/product-list/product-list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle="left" style="display: inline-block !important;">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Place Order</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<div *ngFor="let prod of products; let i = index">\n		<ion-card (click)="additionalData()">\n			<ion-card-content>\n			<ion-item>\n				<div class="row">\n		          <div class="col-10">\n		            <ion-avatar item-start>\n		              <img style="width: 100px; height: 100px;" src="assets/img/farm-fresh-milk.jpg">\n		            </ion-avatar>\n		          </div>\n		          <div class="col" style="margin-left: 10px;">\n		            <h2>{{prod.display_name}}</h2>\n		             <h3>{{prod.name}}</h3>\n		             <p>MRP:{{prod.price | currency:\'INR\':true}}</p>\n		             <p>{{\'Save:\'+prod.discount}}</p>\n		             <p>{{prod.price_with_discount | currency:\'INR\':true}}</p>\n		          </div>\n		        </div>\n			</ion-item>\n			</ion-card-content>\n		</ion-card>\n		<ion-row padding>Additional Info:</ion-row>\n		<ion-card>\n			<ion-card-content (click)="additionalData()">\n				<pre style="font-family: \'Dosis\', sans-serif; white-space: pre-line;">{{prod.description}}</pre>\n			</ion-card-content>\n		</ion-card>\n	</div>\n</ion-content>\n'/*ion-inline-end:"/Users/user/Desktop/ionic3-projects/customer-app/src/pages/product-list/product-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_db_provider__["a" /* Database */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
], ProductListPage);

//# sourceMappingURL=product-list.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_data__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(44);
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
    function SignupPage(navCtrl, userData, _alert, _loading) {
        this.navCtrl = navCtrl;
        this.userData = userData;
        this._alert = _alert;
        this._loading = _loading;
        this.signup = { username: '', email: '', phone: '' };
        this.submitted = false;
    }
    SignupPage.prototype.onSignup = function (form) {
        var _this = this;
        this.submitted = true;
        if (form.valid) {
            this.showLoader();
            this.userData.signup(this.signup.username, this.signup.email, this.signup.phone).then(function (results) {
                _this.hideLoader();
                var resultData = {};
                resultData = results;
                if (resultData.status == 200) {
                    _this.doAlert('Success!', 'Please login to continue.');
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                }
                else {
                    //form.resetForm();
                    _this.doAlert('Error', 'something went wrong');
                }
            });
        }
    };
    SignupPage.prototype.showLoader = function () {
        this.loading = this._loading.create({
            content: 'Please wait...',
        });
        this.loading.present();
    };
    SignupPage.prototype.hideLoader = function () {
        this.loading.dismiss();
    };
    SignupPage.prototype.doAlert = function (type, message) {
        var alert = this._alert.create({
            title: type,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user',template:/*ion-inline-start:"/Users/user/Desktop/ionic3-projects/customer-app/src/pages/signup/signup.html"*/'<ion-header>\n	<ion-navbar>\n		<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n		<ion-title>Signup</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content class="login-page">\n	<form #signupForm="ngForm" novalidate>\n		<ion-list>\n			<ion-item>\n				<ion-label stacked color="primary">Name</ion-label>\n				<ion-input [(ngModel)]="signup.username" name="username" type="text" #username="ngModel" required>\n				</ion-input>\n			</ion-item>\n			<p ion-text [hidden]="username.valid || submitted == false" color="danger" padding-left>\n				Username is required\n			</p>\n\n			<ion-item>\n				<ion-label stacked color="primary">Register Number</ion-label>\n				<ion-input [(ngModel)]="signup.phone" name="phone" type="tel" maxlength="10" #phone="ngModel" required>\n				</ion-input>\n			</ion-item>\n			<p ion-text [hidden]="phone.valid || submitted == false" color="danger" padding-left>\n				Phone no is required\n			</p>\n\n			<ion-item>\n				<ion-label stacked color="primary">Email</ion-label>\n				<ion-input [(ngModel)]="signup.email" name="email" type="email" #email="ngModel">\n				</ion-input>\n			</ion-item>\n		</ion-list>\n\n		<div padding>\n			<button ion-button (click)="onSignup(signupForm)" type="submit" block>Create</button>\n		</div>\n	</form>\n\n</ion-content>\n'/*ion-inline-end:"/Users/user/Desktop/ionic3-projects/customer-app/src/pages/signup/signup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_user_data__["a" /* UserData */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPassword; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_data__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ResetPassword = (function () {
    function ResetPassword(navCtrl, _loading, _alert, userData) {
        this.navCtrl = navCtrl;
        this._loading = _loading;
        this._alert = _alert;
        this.userData = userData;
        this.reset = { email: '' };
        this.submitted = false;
    }
    ResetPassword.prototype.onReset = function (form) {
        var _this = this;
        this.submitted = true;
        if (form.valid) {
            this.showLoader();
            this.userData.resetPassword(this.reset.email).then(function (results) {
                _this.hideLoader();
                var resultData = {};
                resultData = results;
                if (resultData.status == 200) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                    _this.doAlert('Success!', 'Check your E-mail for password reset instructions.');
                }
                else {
                    form.resetForm();
                    _this.doAlert('Error', 'Email is not registered.');
                }
            });
        }
    };
    ResetPassword.prototype.showLoader = function () {
        this.loading = this._loading.create({
            content: 'Please wait...',
        });
        this.loading.present();
    };
    ResetPassword.prototype.hideLoader = function () {
        this.loading.dismiss();
    };
    ResetPassword.prototype.doAlert = function (type, message) {
        var alert = this._alert.create({
            title: type,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    return ResetPassword;
}());
ResetPassword = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'reset-password',template:/*ion-inline-start:"/Users/user/Desktop/ionic3-projects/customer-app/src/pages/reset-password/reset-password.html"*/'<ion-header>\n	<ion-navbar>\n		<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n		<ion-title>Reset Password</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n  	<form #resetForm="ngForm" novalidate>\n  		<ion-item>\n			<ion-label stacked color="primary">Enter Your Registered E-mail Address</ion-label>\n			<ion-input [(ngModel)]="reset.email" name="email" type="text" #email="ngModel" required>\n			</ion-input>\n		</ion-item>\n		<p ion-text [hidden]="email.valid || submitted == false" color="danger" padding-left>\n			Email is required\n		</p>\n		\n		<div padding>\n			<button ion-button (click)="onReset(resetForm)" type="submit" block>Reset password</button>\n		</div>\n  	</form>\n</ion-content>\n'/*ion-inline-end:"/Users/user/Desktop/ionic3-projects/customer-app/src/pages/reset-password/reset-password.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_user_data__["a" /* UserData */]])
], ResetPassword);

//# sourceMappingURL=reset-password.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_conference_data__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CalendarPage = (function () {
    function CalendarPage(confData, _loading, _alert) {
        this.confData = confData;
        this._loading = _loading;
        this._alert = _alert;
        this.calendar = {
            mode: 'month',
            currentDate: new Date()
        };
        this.prescriptions = [];
        this.presCopy = [];
        this.presList = [];
        this.listLength = false;
        this.markDisabled = function (date) {
            var current = new Date();
            current.setHours(0, 0, 0);
            return date < current;
        };
    }
    CalendarPage.prototype.loadEvents = function () {
        this.eventSource = this.createRandomEvents();
        console.log(this.eventSource);
    };
    CalendarPage.prototype.onViewTitleChanged = function (title) {
        this.viewTitle = title;
    };
    CalendarPage.prototype.onEventSelected = function (event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    };
    CalendarPage.prototype.today = function () {
        this.calendar.currentDate = new Date();
    };
    CalendarPage.prototype.onTimeSelected = function (ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    };
    CalendarPage.prototype.onCurrentDateChanged = function (event) {
        var _this = this;
        this.showLoader();
        var pres_date = event.getDate() + '/' + (event.getMonth() + 1) + '/' + event.getFullYear();
        this.confData.prescriptionData(pres_date).then(function (results) {
            _this.hideLoader();
            var resultData = {};
            resultData = results;
            if (resultData.status == 200) {
                _this.prescriptions = resultData.message;
                for (var i = 0; i < _this.prescriptions.length; i++) {
                    var date = new Date(_this.prescriptions[i].dos);
                    if (!_this.prescriptions[i].duration) {
                        _this.prescriptions[i].duration = 3650;
                    }
                    console.log(date.setTime(date.getTime() + (_this.prescriptions[i].duration - 1) * 86400000));
                    _this.prescriptions[i].doe = date.toString();
                    console.log(_this.prescriptions);
                }
                _this.presCopy = _this.prescriptions;
                _this.loadData(event);
            }
            else {
                _this.doAlert('Error', 'something went wrong.');
            }
        });
    };
    CalendarPage.prototype.createRandomEvents = function () {
        var events = [];
        for (var i = 0; i < this.presCopy.length; i++) {
            var startTime;
            var endTime;
            var start;
            var end;
            startTime = new Date(this.presCopy[i].dos); //starting date for the medicine
            start = new Date(this.presCopy[i].dos);
            //check if duration is null then set it for 3650 days  
            if (!this.presCopy[i].duration) {
                this.presCopy[i].duration = 3650;
            }
            //getting ending date for the medicine by adding duration to start date    
            end = start.setTime(start.getTime() + this.presCopy[i].duration * 86400000);
            endTime = new Date(end);
            events.push({
                title: this.presCopy[i].drugId,
                startTime: startTime,
                endTime: endTime,
                allDay: true
            });
        }
        return events;
    };
    CalendarPage.prototype.onRangeChanged = function (ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    };
    CalendarPage.prototype.toggle = function (index) {
        var div = document.querySelector("#hide-show" + index);
        var display = div.style.display;
        div.style.display = (display === "block") ? "none" : "block";
    };
    CalendarPage.prototype.loadData = function (event) {
        var today = new Date();
        //today.setHours(0, 0, 0, 0);
        //event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
        this.presList = [];
        for (var i = 0; i < this.prescriptions.length; i++) {
            var startDate;
            var start;
            var end;
            startDate = new Date(this.prescriptions[i].dos); //starting date for the medicine
            start = new Date(this.prescriptions[i].dos);
            //check if duration is null then set it for 3650 days  
            if (!this.prescriptions[i].duration) {
                this.prescriptions[i].duration = 3650;
            }
            //getting ending date for the medicine by adding duration to start date    
            end = start.setTime(start.getTime() + (this.prescriptions[i].duration) * 86400000);
            if (startDate.getTime() <= event.getTime() && end >= event.getTime()) {
                this.prescriptions[i].doe = new Date(end - 86400000).toString();
                this.presList.push(this.prescriptions[i]);
                console.log(this.presList);
            }
        }
        this.listLength = false;
        if (this.presList.length == 0) {
            this.listLength = true;
        }
    };
    CalendarPage.prototype.doAlert = function (type, message) {
        var alert = this._alert.create({
            title: type,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    CalendarPage.prototype.showLoader = function () {
        this.loading = this._loading.create({
            content: 'Please wait...',
        });
        this.loading.present();
    };
    CalendarPage.prototype.hideLoader = function () {
        this.loading.dismiss();
    };
    return CalendarPage;
}());
CalendarPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'calendar-schedule',template:/*ion-inline-start:"/Users/user/Desktop/ionic3-projects/customer-app/src/pages/calendar/calendar.html"*/'<ion-header>\n  <ion-navbar no-border-bottom>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{viewTitle}}</ion-title>\n  </ion-navbar>\n\n  <ion-buttons end>\n    <button ion-button [disabled]="isToday" (click)="today()">Today</button>\n    <button ion-button (click)="loadEvents()">Load Prescriptions</button>\n  </ion-buttons>\n</ion-header>\n\n<ion-content>\n  <calendar [eventSource]="eventSource"\n            [currentDate]="calendar.currentDate"\n            (onCurrentDateChanged)="onCurrentDateChanged($event)"\n            (onEventSelected)="onEventSelected($event)"\n            (onTitleChanged)="onViewTitleChanged($event)"\n            (onTimeSelected)="onTimeSelected($event)"\n            step="30">\n  </calendar>\n\n  <ion-card *ngIf="listLength">\n    <ion-card-header>\n    </ion-card-header>\n    <ion-card-content>\n      <i style="font-size: 20px;">No Prescriptions for the selected date.</i>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card *ngFor="let list of presList; let i = index">\n        <ion-item item-start style="background: #488aff; height:0px;">\n        <ion-row (click)="toggle(i)">\n            <ion-icon name="arrow-dropdown-circle" style="color:#ffffff !important;"></ion-icon>\n      </ion-row>\n     </ion-item>\n\n    <ion-item>\n      <div class="row">\n          <div class="col-10">\n            <ion-avatar item-start>\n              <img src="assets/img/capsule_300px.jpg">\n            </ion-avatar>\n          </div>\n          <div class="col" style="margin-left: 10px;">\n            <h2>{{list.drugId}}</h2>\n             <p>Amount of dose: {{list.mgs}} mgs</p>\n          </div>\n        </div>\n        <div id="hide-show{{i}}" style="display: none;">\n          <div class="row inline-all">\n              <div class = "col inline" style="color:green;"><ion-icon name="checkmark"></ion-icon></div>\n              <div class = "col inline" *ngIf="list.intervals"><p>Total pills taken today: {{list.adopted}} of {{list.intervals.length}}</p></div>\n              <div class = "col inline" *ngIf="list.frequency"><p>Total pills taken today: {{list.adopted}} of {{list.frequency.length}}</p></div>\n          </div>\n          <div class="row inline-all">\n             <div class = "col inline" style="color:#f53d3d;"><ion-icon name="close"></ion-icon></div>\n             <div class = "col inline"><p>Total pills missed today: {{list.miss}}</p></div>\n          </div>\n          <div class="row inline-new">\n              <div class="col"><p>Date of starting the prescription:</p>\n              </div>\n              <div class="col">{{list.dos | date : "dd.MM.y"}}</div>\n          </div>\n          <div class="row inline-new">\n            <div class="col"><p>Date of finishing the prescription:</p></div>\n            <div class="col">{{list.doe | date : "dd.MM.y"}}</div>\n          </div>\n          <div class="row inline-inst">\n             <div><p>Dosage instruction:</p>{{list.instruction}}</div>\n          </div>\n        </div>\n    </ion-item>\n\n    <ion-item *ngIf="list.frequency">\n      <ion-row style="border-bottom: 1px solid #bdbdbd;" *ngFor="let freq of (list.frequency); let j = index">\n        <ion-col><p>Take at</p></ion-col>\n        <ion-col>:</ion-col>\n        <ion-col>{{freq.time}}</ion-col>\n      </ion-row>\n    </ion-item>\n\n     <ion-item *ngIf="list.intervals">\n       <ion-row style="border-bottom: 1px solid #bdbdbd;" *ngFor="let interval of (list.intervals); let k = index">\n       <ion-col><p>Take at</p></ion-col>\n       <ion-col>:</ion-col>\n       <ion-col>{{interval.time}}</ion-col>\n      </ion-row>\n    </ion-item>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/user/Desktop/ionic3-projects/customer-app/src/pages/calendar/calendar.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_conference_data__["a" /* ConferenceData */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
], CalendarPage);

//# sourceMappingURL=calendar.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(224);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_reset_password_reset_password__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_calendar_calendar__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_signup_signup__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_prescription_list_prescription_list__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_product_list_product_list__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_conference_data__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_user_data__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_barcode_scanner__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_email_composer__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ionic2_calendar__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_push__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_facebook__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_sqlite__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_db_provider__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* ConferenceApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_reset_password_reset_password__["a" /* ResetPassword */],
            __WEBPACK_IMPORTED_MODULE_10__pages_calendar_calendar__["a" /* CalendarPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_prescription_list_prescription_list__["a" /* PrescriptionListPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_product_list_product_list__["a" /* ProductListPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_18_ionic2_calendar__["a" /* NgCalendarModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* ConferenceApp */], {}, {
                links: [
                    { component: __WEBPACK_IMPORTED_MODULE_10__pages_calendar_calendar__["a" /* CalendarPage */], name: 'Calendar', segment: 'calendar' },
                    { component: __WEBPACK_IMPORTED_MODULE_12__pages_prescription_list_prescription_list__["a" /* PrescriptionListPage */], name: 'PrescriptionList', segment: 'prescriptionList' },
                    { component: __WEBPACK_IMPORTED_MODULE_13__pages_product_list_product_list__["a" /* ProductListPage */], name: 'ProductList', segment: 'productList' },
                    { component: __WEBPACK_IMPORTED_MODULE_9__pages_reset_password_reset_password__["a" /* ResetPassword */], name: 'ResetPassword', segment: 'resetPassword' },
                    { component: __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */], name: 'LoginPage', segment: 'login' },
                    { component: __WEBPACK_IMPORTED_MODULE_11__pages_signup_signup__["a" /* SignupPage */], name: 'SignupPage', segment: 'signup' }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* IonicStorageModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* ConferenceApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_reset_password_reset_password__["a" /* ResetPassword */],
            __WEBPACK_IMPORTED_MODULE_10__pages_calendar_calendar__["a" /* CalendarPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_prescription_list_prescription_list__["a" /* PrescriptionListPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_product_list_product_list__["a" /* ProductListPage */]
        ],
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_14__providers_conference_data__["a" /* ConferenceData */],
            __WEBPACK_IMPORTED_MODULE_15__providers_user_data__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_push__["a" /* Push */],
            __WEBPACK_IMPORTED_MODULE_20__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_21__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_22__providers_db_provider__["a" /* Database */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConferenceApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_push__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_calendar_calendar__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_prescription_list_prescription_list__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_conference_data__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_user_data__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_email_composer__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_db_provider__ = __webpack_require__(54);
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
    function ConferenceApp(events, userData, menu, platform, confData, dataBase, push, splashScreen, _alert, _loading, emailComposer) {
        this.events = events;
        this.userData = userData;
        this.menu = menu;
        this.platform = platform;
        this.confData = confData;
        this.dataBase = dataBase;
        this.push = push;
        this.splashScreen = splashScreen;
        this._alert = _alert;
        this._loading = _loading;
        this.emailComposer = emailComposer;
        // List of pages that can be navigated to from the left menu
        // the left menu only works after login
        // the login page disables the left menu
        this.appPages = [
            { title: 'Main Menu', name: 'PrescriptionListPage', component: __WEBPACK_IMPORTED_MODULE_6__pages_prescription_list_prescription_list__["a" /* PrescriptionListPage */], icon: 'contacts', prescription: true },
            { title: 'My Profile', icon: 'calendar' },
            { title: 'My Orders', icon: 'calendar' },
            { title: 'My Address', icon: 'calendar' },
            { title: 'Nutrition Values', icon: 'calendar' },
            { title: 'contact us', icon: 'calendar' },
            { title: 'Payment Due', icon: 'calendar' },
            { title: 'Last Five Deliveries', icon: 'calendar' },
            // { title: 'Prescriptions', name: 'PrescriptionListPage', component: PrescriptionListPage, icon: 'contacts', prescription: true },
            //{ title: 'Calendar', name: 'CalendarPage', component: CalendarPage, icon: 'calendar', calendar: true },
            //{ title: 'Feedback', name: '', component: null, index: 3, icon: 'information-circle' },
            { title: 'Logout', name: '', component: null, icon: 'log-out', logsOut: true },
        ];
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_prescription_list_prescription_list__["a" /* PrescriptionListPage */];
        this.platformReady();
        this.listenToUserEvents();
    }
    ConferenceApp.prototype.openPage = function (page) {
        if (page.index === 3) {
            this.showLoader();
            this.hideLoader();
            this.sendFeedback();
        }
        var params = {};
        // the nav component was found using @ViewChild(Nav)
        // setRoot on the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
            params = { tabIndex: page.index };
        }
        if (page.prescription === true) {
            this.showLoader();
            //this.nav.setRoot(PrescriptionListPage);
            this.hideLoader();
        }
        if (page.calendar === true) {
            this.showLoader();
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_calendar_calendar__["a" /* CalendarPage */]);
            this.hideLoader();
        }
        // If we are already on tabs just change the selected tab
        // don't setRoot again, this maintains the history stack of the
        // tabs even if changing them from the menupage.
        if (page.logsOut === true) {
            this.showLoader();
            window.localStorage.removeItem('login_details');
            //window.localStorage.removeItem('device_token');
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */]);
            this.hideLoader();
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
    ConferenceApp.prototype.sendFeedback = function () {
        this.emailComposer.isAvailable().then(function (available) {
            if (available) {
                //Now we know we can send
            }
        });
        var email = {
            to: 'yahya.akilan@outlook.com',
            subject: 'Dwak Test Mail',
            isHtml: true
        };
        // Send a text message using default options
        this.emailComposer.open(email);
    };
    ConferenceApp.prototype.listenToUserEvents = function () {
        var _this = this;
        this.events.subscribe('user:loggedin', function () {
            var user = JSON.parse(window.localStorage.getItem('login_details'));
            _this.userId = user.serial;
        });
    };
    ConferenceApp.prototype.platformReady = function () {
        var _this = this;
        // Call any initial plugins when ready
        this.platform.ready().then(function () {
            _this.splashScreen.hide();
            _this.initPushNotification();
            if (_this.platform.is('android')) {
                window.localStorage.setItem('deviceType', "isandroid");
            }
            if (_this.platform.is('ios')) {
                window.localStorage.setItem('deviceType', "isIOS");
            }
        });
    };
    ConferenceApp.prototype.initPushNotification = function () {
        if (!this.platform.is('cordova')) {
            console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
            return;
        }
        var options = {
            android: {
                senderID: '981155431666'
            },
            ios: {},
            windows: {}
        };
        var pushObject = this.push.init(options);
        pushObject.on('registration').subscribe(function (data) {
            //alert('device token -> ' + data.registrationId);
            window.localStorage.setItem('device_token', data.registrationId);
            //TODO - send device token to server
        });
        var that = this;
        pushObject.on('notification').subscribe(function (data) {
            console.log('message -> ' + data.message);
            var event;
            //if user using app and push notification comes
            if (data.additionalData.foreground) {
                // if application open, show popup
                var confirmAlert = that._alert.create({
                    title: 'Confirm Action',
                    message: 'Take ' + data.additionalData.name + ' at ' + data.additionalData.time,
                    buttons: [
                        {
                            text: 'MISS',
                            handler: function () {
                                event = "missed";
                                var presData = {};
                                presData.userid = data.additionalData.userid;
                                presData.prescription_id = data.additionalData.pres_id;
                                presData.status = event;
                                presData.dose_time = data.additionalData.time;
                                presData.time = null;
                                that.showLoader();
                                that.confData.eventScheduler(presData).then(function (results) {
                                    var resultData = {};
                                    resultData = results;
                                    if (resultData.status == 200) {
                                        that.hideLoader();
                                    }
                                    else {
                                        that.hideLoader();
                                        that.doAlert('Error', 'something went wrong.');
                                    }
                                });
                            }
                        },
                        {
                            text: 'POSTPONE',
                            handler: function () {
                                that.presentPrompt(data);
                            }
                        },
                        {
                            text: 'TAKE',
                            handler: function () {
                                event = "taken";
                                var presData = {};
                                presData.userid = data.additionalData.userid;
                                presData.prescription_id = data.additionalData.pres_id;
                                presData.status = event;
                                presData.dose_time = data.additionalData.time;
                                presData.time = null;
                                that.showLoader();
                                that.confData.eventScheduler(presData).then(function (results) {
                                    var resultData = {};
                                    resultData = results;
                                    if (resultData.status == 200) {
                                        that.hideLoader();
                                    }
                                    else {
                                        that.hideLoader();
                                        that.doAlert('Error', 'something went wrong.');
                                    }
                                });
                            }
                        }
                    ],
                    cssClass: 'custom-alert'
                });
                confirmAlert.present();
            }
            else {
                //if user NOT using app and push notification comes
                //TODO: Your logic on click of push notification directly
                //that.nav.push(PrescriptionListPage, { message: data.message });
                console.log('Push notification clicked');
            }
        });
        pushObject.on('error').subscribe(function (error) { return console.error('Error with Push plugin' + error); });
    };
    ConferenceApp.prototype.presentPrompt = function (presdata) {
        var _this = this;
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
                    handler: function (data) {
                        console.log('Cancel clicked' + data);
                    }
                },
                {
                    text: 'POSTPONE',
                    handler: function (data) {
                        var post_time = data.postpone_time;
                        if (post_time >= 1 && post_time <= 120) {
                            var presData = {};
                            presData.userid = presdata.additionalData.userid;
                            presData.prescription_id = presdata.additionalData.pres_id;
                            presData.status = "reschedule";
                            presData.dose_time = presdata.additionalData.time;
                            presData.time = null;
                            _this.showLoader();
                            _this.confData.eventScheduler(presData).then(function (results) {
                                var resultData = {};
                                resultData = results;
                                if (resultData.status == 200) {
                                    _this.hideLoader();
                                }
                                else {
                                    _this.hideLoader();
                                    _this.doAlert('Error', 'something went wrong.');
                                }
                            });
                        }
                        else {
                            return false;
                        }
                    }
                }
            ]
        }).present();
    };
    ConferenceApp.prototype.doAlert = function (type, message) {
        var alert = this._alert.create({
            title: type,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    ConferenceApp.prototype.showLoader = function () {
        this.loading = this._loading.create({
            content: 'Please wait...',
        });
        this.loading.present();
    };
    ConferenceApp.prototype.hideLoader = function () {
        this.loading.dismiss();
    };
    return ConferenceApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
], ConferenceApp.prototype, "nav", void 0);
ConferenceApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/user/Desktop/ionic3-projects/customer-app/src/app/app.template.html"*/'<ion-split-pane>\n\n  <ion-menu id="loggedOutMenu" [content]="content">\n\n    <ion-header>\n      <ion-toolbar>\n        <ion-title>Menu</ion-title>\n      </ion-toolbar>\n    </ion-header>\n\n    <ion-content class="outer-content">\n      <ion-list>\n        <button ion-item menuClose *ngFor="let p of appPages" (click)="openPage(p)">\n          <ion-icon item-start [name]="p.icon"></ion-icon>\n          {{p.title}}\n        </button>\n      </ion-list>\n    </ion-content>\n\n  </ion-menu>\n\n  <!-- main navigation -->\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false" main name="app"></ion-nav>\n\n</ion-split-pane>\n'/*ion-inline-end:"/Users/user/Desktop/ionic3-projects/customer-app/src/app/app.template.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
        __WEBPACK_IMPORTED_MODULE_8__providers_user_data__["a" /* UserData */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_7__providers_conference_data__["a" /* ConferenceData */],
        __WEBPACK_IMPORTED_MODULE_10__providers_db_provider__["a" /* Database */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_push__["a" /* Push */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_native_email_composer__["a" /* EmailComposer */]])
], ConferenceApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 283:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { Events } from 'ionic-angular';


//declare var window: any;
var UserData = (function () {
    function UserData(
        // public events: Events,
        http) {
        this.http = http;
        this.baseUrl = 'http://ec2-52-66-32-175.ap-south-1.compute.amazonaws.com';
    }
    UserData.prototype.login = function (username, password) {
        var _this = this;
        console.log(username + "" + password);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        var data = {};
        data.app_version = "2.1";
        data.login = username;
        data.mobile_key = "";
        data.mobile_type = "android";
        data.password = password;
        console.log(JSON.stringify({ user: data }));
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Post,
            headers: headers,
            body: JSON.stringify({ user: data }),
            url: this.baseUrl + '/users/sign_in'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                debugger;
                resolve(res);
                window.localStorage.setItem('login_details', JSON.stringify(res.json().user));
                //this.events.publish('user:loggedin');
            }, function (err) {
                resolve(err);
            });
        });
    };
    ;
    UserData.prototype.signup = function (username, email, phone) {
        var _this = this;
        console.log(username + "" + email + "" + phone);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ "Accept": "application/json", 'Content-Type': 'application/json' });
        var data = {};
        data.dob = "";
        data.email = email;
        data.mobile = phone;
        data.name = username;
        data.recipient_name = username;
        data.recipient_number = phone;
        data.role = "4";
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Post,
            headers: headers,
            body: JSON.stringify({ user: data }),
            url: this.baseUrl + '/users'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                debugger;
                resolve(res);
            }, function (err) {
                resolve(err);
            });
        });
    };
    ;
    UserData.prototype.resetPassword = function (email) {
        var _this = this;
        console.log(email);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Post,
            headers: headers,
            body: JSON.stringify({ email: email }),
            url: this.baseUrl + '/forgetPassword'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                resolve(err.json());
            });
        });
    };
    ;
    return UserData;
}());
UserData = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], UserData);

//# sourceMappingURL=user-data.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_data__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__prescription_list_prescription_list__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signup_signup__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reset_password_reset_password__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_barcode_scanner__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(202);
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
    function LoginPage(events, navCtrl, userData, _loading, _alert, menu, fb, barcodeScanner) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.userData = userData;
        this._loading = _loading;
        this._alert = _alert;
        this.menu = menu;
        this.fb = fb;
        this.barcodeScanner = barcodeScanner;
        this.flag = false;
        this.login = { username: '', password: '' };
        this.submitted = false;
        /*let user = JSON.parse(window.localStorage.getItem('login_details'));
         if(user){
            this.events.publish('user:loggedin');
            this.navCtrl.setRoot(PrescriptionListPage);
          }*/
    }
    LoginPage.prototype.onLogin = function (form) {
        var _this = this;
        this.submitted = true;
        if (form.valid) {
            this.showLoader();
            this.userData.login(this.login.username, this.login.password).then(function (results) {
                debugger;
                var resultData = {};
                //let mainData : any = {};
                //mainData = results.json();
                resultData = results;
                if (resultData.status == 200) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__prescription_list_prescription_list__["a" /* PrescriptionListPage */]);
                    _this.hideLoader();
                }
                else {
                    _this.hideLoader();
                    _this.doAlert('Error', 'something went wrong.');
                }
            });
        }
    };
    LoginPage.prototype.onSignup = function () {
        this.showLoader();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__signup_signup__["a" /* SignupPage */]);
        this.hideLoader();
    };
    LoginPage.prototype.forgotPassword = function () {
        this.showLoader();
        this.flag = true;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__reset_password_reset_password__["a" /* ResetPassword */]);
        this.hideLoader();
    };
    // scan QR code
    LoginPage.prototype.scan = function () {
        var _this = this;
        this.showLoader();
        this.hideLoader();
        this.options = {
            prompt: "Scan your barcode "
        };
        this.barcodeScanner.scan(this.options).then(function (barcodeData) {
            _this.scanData = barcodeData;
            window.localStorage.setItem('_qrcode', _this.scanData.text);
            if (_this.scanData.text.length > 0) {
                var alert_1 = _this._alert.create({
                    title: 'Success!',
                    message: 'QR code scanned succesfully.Please login or signup to continue',
                    buttons: [{ text: 'THANKS' }]
                });
                alert_1.present();
            }
        }, function (err) {
            _this.doAlert('Unable to scan barcode', err);
        });
    };
    LoginPage.prototype.showLoader = function () {
        this.loading = this._loading.create({
            content: 'Please wait...',
        });
        this.loading.present();
    };
    LoginPage.prototype.hideLoader = function () {
        this.loading.dismiss();
    };
    LoginPage.prototype.doAlert = function (type, message) {
        var alert = this._alert.create({
            title: type,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        // the root left menu should be disabled on the login page
        this.menu.enable(false);
        this.menu.swipeEnable(false);
    };
    LoginPage.prototype.ionViewDidLeave = function () {
        // enable the root left menu when leaving the login page
        this.menu.enable(true);
    };
    LoginPage.prototype.loginfb = function () {
        var _this = this;
        this.showLoader();
        this.fb.login(['email', 'public_profile'])
            .then(function (res) {
            console.log(res);
            //this.getUserInformation();
        })
            .catch(function (e) {
            _this.hideLoader();
            console.log('Error logging into Facebook', e);
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'login-user',template:/*ion-inline-start:"/Users/user/Desktop/ionic3-projects/customer-app/src/pages/login/login.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>Login</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-item style="background-color: #e0e0e0;">\n		<ion-row style="color: #df3796;">Already Registered with us? Login!</ion-row>\n		<ion-row style="color: #6b6666;">Order for milk, butter, cheese etc</ion-row>\n	</ion-item>\n<ion-card>\n	<ion-card-header><h4 style="color: #df3796; font-size: 18px; font-weight: bold;">LOGIN</h4></ion-card-header>\n	<ion-card-content>\n	<form #loginForm="ngForm" novalidate>\n		<ion-list>\n			<ion-item style="border: 1px solid #bdbdbd; margin-bottom: 20px;">\n				<ion-input [(ngModel)]="login.username" name="username" type="text" #username="ngModel" placeholder="Registration Number" spellcheck="false" autocapitalize="off"\n					required>\n				</ion-input>\n			</ion-item>\n			<p ion-text [hidden]="username.valid || submitted == false" color="danger" padding-left>\n				Username is required\n			</p>\n\n			<ion-item style="border: 1px solid #bdbdbd;">\n				<ion-input [(ngModel)]="login.password" placeholder="Password" name="password" type="password" #password="ngModel" required>\n				</ion-input>\n			</ion-item>\n			<p ion-text [hidden]="password.valid || submitted == false" color="danger" padding-left>\n				Password is required\n			</p>\n		</ion-list>\n\n		<ion-row>\n			<button ion-button clear (click)="forgotPassword()">Forgot password?</button>\n		</ion-row>\n\n		<ion-row>\n			<button ion-button (click)="onLogin(loginForm)" type="submit" block>Login</button>\n		</ion-row>\n	</form>\n	</ion-card-content>\n	</ion-card>\n	<ion-item style="background-color: #e0e0e0;">\n		<ion-row>\n		<ion-col style="text-align: center">OR</ion-col></ion-row>\n		<ion-row>\n		<ion-col  style="text-align: center">\n			<button ion-button (click)="onSignup()">Create New Account</button>\n		</ion-col>\n		</ion-row>\n	</ion-item>\n</ion-content>\n'/*ion-inline-end:"/Users/user/Desktop/ionic3-projects/customer-app/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_user_data__["a" /* UserData */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_barcode_scanner__["a" /* BarcodeScanner */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Database; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var dB = 'dLac';
var win = window;
var Database = (function () {
    function Database(platform) {
        var _this = this;
        this.platform = platform;
        this._dbPromise = new Promise(function (resolve, reject) {
            try {
                var _db_1;
                _this.platform.ready().then(function () {
                    if (_this.platform.is('cordova') && win.sqlitePlugin) {
                        //FOR MOBILE DEVICE
                        _db_1 = win.sqlitePlugin.openDatabase({
                            name: dB,
                            location: 'default'
                        });
                    }
                    else {
                        //FOR WEBSQL
                        console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
                        _db_1 = win.openDatabase(dB, '1.0', 'database', 5 * 1024 * 1024);
                    }
                    resolve(_db_1);
                });
            }
            catch (err) {
                reject({ err: err });
            }
        });
        this._tryInit();
    }
    // Initialize the DB with our required tables
    Database.prototype._tryInit = function () {
        this.query("CREATE TABLE IF NOT EXISTS Products (\n                         id INTEGER NOT NULL,\n                         name TEXT NOT NULL,\n                         vote INTEGER NOT NULL,\n                         products TEXT NOT NULL,\n                         PRIMARY KEY(id)\n                     )").catch(function (err) {
            console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
        });
    };
    Database.prototype.insertProducts = function (data) {
        for (var i = 0; i < data.categories.length; i++) {
            this.query("INSERT INTO Products (id, name, vote, products) VALUES (?, ?, ?, ?);", [data.categories[i].id, data.categories[i].name, data.categories[i].vote, JSON.stringify(data.categories[i].products)]);
        }
        return new Promise(function (resolve, reject) {
            console.log(reject);
            console.log(resolve);
            return resolve;
        });
    };
    Database.prototype.getProducts = function (id) {
        var _this = this;
        return this.query('SELECT * FROM Products WHERE id=' + id).then(function (data) {
            console.log(data);
            if (data.res.rows.length > 0) {
                console.log('Rows found.');
                if (_this.platform.is('cordova') && win.sqlitePlugin) {
                    var result = [];
                    for (var i = 0; i < data.res.rows.length; i++) {
                        var row = data.res.rows.item(i);
                        result.push(row);
                    }
                    return result;
                }
                else {
                    return data.res.rows;
                }
            }
        });
    };
    Database.prototype.query = function (query, params) {
        var _this = this;
        if (params === void 0) { params = []; }
        return new Promise(function (resolve, reject) {
            try {
                _this._dbPromise.then(function (db) {
                    db.transaction(function (tx) {
                        tx.executeSql(query, params, function (tx, res) { return resolve({ tx: tx, res: res }); }, function (tx, err) { return reject({ tx: tx, err: err }); });
                    }, function (err) { return reject({ err: err }); });
                });
            }
            catch (err) {
                reject({ err: err });
            }
        });
    };
    return Database;
}());
Database = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]])
], Database);

//# sourceMappingURL=db-provider.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConferenceData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_data__ = __webpack_require__(30);
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
                resolve(res.json());
            }, function (err) {
                resolve(err.json());
            });
        });
    };
    ConferenceData.prototype.prescriptionData = function (date) {
        var _this = this;
        console.log(date + "#################");
        var user = JSON.parse(window.localStorage.getItem('login_details'));
        var serialId = user.serial.toString();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Post,
            headers: headers,
            body: JSON.stringify({ user_id: serialId, date: date }),
            url: this.baseUrl + '/patient_prescription'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                resolve(err.json());
            });
        });
    };
    ConferenceData.prototype.eventScheduler = function (presData) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestMethod */].Post,
            headers: headers,
            body: JSON.stringify(presData),
            url: this.baseUrl + '/eventscheduler'
        });
        return new Promise(function (resolve) {
            _this.http.request(new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Request */](options))
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                resolve(err.json());
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

/***/ })

},[205]);
//# sourceMappingURL=main.js.map