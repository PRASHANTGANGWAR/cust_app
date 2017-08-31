import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions,Request,RequestMethod } from '@angular/http';
import { UserData } from './user-data';

declare var window: any;
@Injectable()
export class ConferenceData {
  data: any;
  baseUrl = 'http://ec2-52-66-32-175.ap-south-1.compute.amazonaws.com';

  constructor(
    public http: Http,
    public user: UserData
  ) {}

  categories(){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json'});
    let options = new RequestOptions({ 
      method: RequestMethod.Get,
      headers: headers,
      url: this.baseUrl+'/categories'
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
  }

  prescriptionData(date: any){
    console.log(date+"#################");
    let user = JSON.parse(window.localStorage.getItem('login_details'));
    let serialId=user.serial.toString();
    let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ 
        method: RequestMethod.Post,
        headers: headers,
        body: JSON.stringify({user_id: serialId, date: date}),
        url: this.baseUrl+'/patient_prescription'
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
  }

  eventScheduler(presData: any){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ 
      method: RequestMethod.Get,
      headers: headers,
      body: JSON.stringify(presData),
      url: this.baseUrl+'/eventscheduler'
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
  }

  states(){
    let user = JSON.parse(window.localStorage.getItem('login_details'));
    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile , 'X-User-Token': user.authentication_token });
    let options = new RequestOptions({ 
      method: RequestMethod.Get,
      headers: headers,
      url: this.baseUrl+'/states'
    });
    return new Promise(resolve => {
      this.http.request(new Request(options))
      .subscribe(
        res => {
          resolve(res);
          window.localStorage.setItem('states', JSON.stringify(res.json().states));
        },
        err => {
          resolve(err);
        }
      );
    });
  }

}
