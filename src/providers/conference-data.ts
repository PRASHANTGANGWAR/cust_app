import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions,Request,RequestMethod } from '@angular/http';
import { UserData } from './user-data';

declare var window: any;
@Injectable()
export class ConferenceData {
  data: any;
  baseUrl = 'http://ec2-52-66-32-175.ap-south-1.compute.amazonaws.com'

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
          resolve(res);
        },
        err => {
          resolve(err);
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

  getAllOrders(){
    let user = JSON.parse(window.localStorage.getItem('login_details'));
    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile , 'X-User-Token': user.authentication_token });
    let options = new RequestOptions({ 
      method: RequestMethod.Get,
      headers: headers,
      url: this.baseUrl+'/orders/customer_orders'
    });
    return new Promise(resolve => {
      this.http.request(new Request(options))
      .subscribe(
        res => {
          resolve(res);
          window.localStorage.setItem('allOrders',JSON.stringify(res.json()));
        },
        err => {
          resolve(err);
        }
      );
    });
  }

  newOrder(data:any){
    let user = JSON.parse(window.localStorage.getItem('login_details'));
    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile , 'X-User-Token': user.authentication_token });
    //add required data to send wiht post request in order object 
    let options = new RequestOptions({ 
      method: RequestMethod.Post,
      headers: headers,
      body: JSON.stringify(this.orderData(data)),
      url: this.baseUrl+'/orders'
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
  }

  updateOrder(data:any){
    let user = JSON.parse(window.localStorage.getItem('login_details'));
    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile , 'X-User-Token': user.authentication_token });
    //add required data to send wiht post request in order object 
    let options = new RequestOptions({ 
      method: RequestMethod.Put,
      headers: headers,
      body: JSON.stringify(this.orderData(data)),
      url: this.baseUrl+'/orders/'+data.order_id
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
  }

  orderData(data:any){
    let userAddress = JSON.parse(window.localStorage.getItem('user_address'));
    let allOrders = JSON.parse(window.localStorage.getItem('allOrders'));
    let user = JSON.parse(window.localStorage.getItem('login_details'));
      let order:any={};
      order.address_id = userAddress.addresses[0].id;
      order.alter_from = data.alter_from
      if(allOrders.length){
         order.alternate = "false";
      }else{
          order.alternate = "true";
      }
      order.app_version = "2.1";
      order.customer_id = user.id;
      order.delivery_date = data.delivery_date
      order.isNew = data.isNew
      order.order_packages_attributes = data.order_packages_attributes
      order.pickup = data.pickup;
      order.recurring = data.recurring;
      
      return {order};
  }

  cancelOrder(){
    let user = JSON.parse(window.localStorage.getItem('login_details'));
    let allOrders = JSON.parse(window.localStorage.getItem('allOrders'));
    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile , 'X-User-Token': user.authentication_token });
    let options = new RequestOptions({ 
      method: RequestMethod.Delete,
      headers: headers,
      url: this.baseUrl+'/orders/'+allOrders[0].id
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
  }

  createChildOrder(order:any){
    let user = JSON.parse(window.localStorage.getItem('login_details'));
    let userAddress = JSON.parse(window.localStorage.getItem('user_address'));
    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile , 'X-User-Token': user.authentication_token });
    order.address_id = userAddress.addresses[0].id;
    order.alternate = "false";
    order.app_version = "2.1";
    order.customer_id = user.id;
    //add required data to send wiht post request in order object 
    let options = new RequestOptions({ 
      method: RequestMethod.Post,
      headers: headers,
      body: JSON.stringify({order}),
      url: this.baseUrl+'/orders'
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
  }

  createDnd(order:any){
    let user = JSON.parse(window.localStorage.getItem('login_details'));
    let allOrders = JSON.parse(window.localStorage.getItem('allOrders'));
    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile , 'X-User-Token': user.authentication_token }); 
    let options = new RequestOptions({ 
      method: RequestMethod.Put,
      headers: headers,
      body: JSON.stringify({order}),
      url: this.baseUrl+'/orders/'+allOrders[0].id
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
  }

  removeDnd(order:any){
    let user = JSON.parse(window.localStorage.getItem('login_details'));
    let allOrders = JSON.parse(window.localStorage.getItem('allOrders'));
    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile , 'X-User-Token': user.authentication_token });
    let options = new RequestOptions({ 
      method: RequestMethod.Put,
      headers: headers,
      body: JSON.stringify({order}),
      url: this.baseUrl+'/orders/'+allOrders[0].id
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
  }

}
