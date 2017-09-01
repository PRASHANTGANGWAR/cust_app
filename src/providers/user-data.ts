import { Injectable } from '@angular/core';

//import { Events } from 'ionic-angular';
import { Http } from '@angular/http';
import { Headers, RequestOptions,Request,RequestMethod } from '@angular/http';

declare var window: any;
@Injectable()
export class UserData {
  baseUrl = 'http://ec2-52-66-32-175.ap-south-1.compute.amazonaws.com';

  constructor(
   // public events: Events,
    private http: Http
  ) {}

  login(username: string,password: string){
    console.log(username+""+password);
    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    let data :any = {};
    data.app_version = "2.1";
    data.login = username;
    data.mobile_key = "";
    data.mobile_type = "android";
    data.password= password;
    console.log(JSON.stringify({user:data}));
    let options = new RequestOptions({ 
      method: RequestMethod.Post,
      headers: headers,
      body: JSON.stringify({user:data}),
      url: this.baseUrl+'/users/sign_in'
    });
    return new Promise(resolve => {
      this.http.request(new Request(options))
      .subscribe(
        res => {
          resolve(res);
          window.localStorage.setItem('login_details', JSON.stringify(res.json().user));
          //this.events.publish('user:loggedin');
        },
        err => {
          resolve(err);
        }
      );
    });
  };

  signup(username: string, email: string, phone: string){
    console.log(username+""+email+""+phone);
    let headers = new Headers({ "Accept": "application/json", 'Content-Type': 'application/json' });
    let data :any = {};
    data.dob = "";
    data.email = email;
    data.mobile = phone;
    data.name = username;
    data.recipient_name = username;
    data.recipient_number = phone;
    data.role = "4";
    let options = new RequestOptions({ 
      method: RequestMethod.Post,
      headers: headers,
      body: JSON.stringify({user: data}),
      url: this.baseUrl+'/users'
    });
    return new Promise(resolve => {
      this.http.request(new Request(options))
      .subscribe(
        res => {
          resolve(res);
        },
        err => {
          resolve(err);
        }
      );
    });
  };

  resetPassword(email: string){
    console.log(email);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ 
      method: RequestMethod.Post,
      headers: headers,
      body: JSON.stringify({email}),
      url: this.baseUrl+'/forgetPassword'
    });
    return new Promise(resolve => {
      this.http.request(new Request(options))
      .subscribe(
        res => {
          resolve(res.json());
        },
        err => {
          resolve(err.json());
        }
      );
    });
  };

  userAddress(){
    let user = JSON.parse(window.localStorage.getItem('login_details'));
    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile , 'X-User-Token': user.authentication_token });
    let options = new RequestOptions({ 
      method: RequestMethod.Get,
      headers: headers,
      url: this.baseUrl+'/users/addresses'
    });
    return new Promise(resolve => {
      this.http.request(new Request(options))
      .subscribe(
        res => {
          resolve(res);
          window.localStorage.setItem('user_address', JSON.stringify(res.json().user));
        },
        err => {
          resolve(err);
        }
      );
    });
  }

  addAddress(address: any){
    let user = JSON.parse(window.localStorage.getItem('login_details'));
    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile , 'X-User-Token': user.authentication_token });
    address.mobile = user.mobile;
    let options = new RequestOptions({ 
      method: RequestMethod.Post,
      headers: headers,
      body: JSON.stringify({address}),
      url: this.baseUrl+'/addresses'
    });
    return new Promise(resolve => {
      this.http.request(new Request(options))
      .subscribe(
        res => {
          resolve(res);
          window.localStorage.setItem('user_address', JSON.stringify(res.json().user));
        },
        err => {
          resolve(err);
        }
      );
    });
  }


}
