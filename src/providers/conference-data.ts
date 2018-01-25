import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions,Request,RequestMethod } from '@angular/http';
import { UserData } from './user-data';

declare var window: any;
@Injectable()
export class ConferenceData {
  data: any;
  baseUrl = 'http://ec2-13-126-16-236.ap-south-1.compute.amazonaws.com'

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

// find details of order by id
  getOrderDetail(id:number) {
    let orders = JSON.parse(window.localStorage.getItem('allOrders'));
    for(let i = 0; i < orders.length; i++){
      if (orders[i].id == id) {
        return orders[i];
      }
    }
    return null; 
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
    let user = JSON.parse(window.localStorage.getItem('login_details'));
      let order:any={};
      order.address_id = userAddress.addresses[0].id;
      order.alter_from = "";
      order.app_version = "2.1";
      order.customer_id = user.id;
        order.delivery_date = data.delivery_date.toString();
      if(data.end_date){
        order.end_date = data.end_date;
      }
      order.isNew = "1";
      order.alternate = data.alternate;
      order.order_packages_attributes = data.order_packages_attributes;
      if(data.parent_order_id){
        order.parent_order_id=data.parent_order_id;
      }
      order.pickup = "false";
      order.recurring = data.recurring;
      return {order};
  }

  cancelOrder(id:number){
    let user = JSON.parse(window.localStorage.getItem('login_details'));
    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile , 'X-User-Token': user.authentication_token });
    let options = new RequestOptions({ 
      method: RequestMethod.Delete,
      headers: headers,
      url: this.baseUrl+'/orders/'+id
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

  createChildOrder(data:any){
    let user = JSON.parse(window.localStorage.getItem('login_details'));  
    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile , 'X-User-Token': user.authentication_token });
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

  createDnd(order:any,id:number){
    let user = JSON.parse(window.localStorage.getItem('login_details'));
    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile , 'X-User-Token': user.authentication_token }); 
    let options = new RequestOptions({ 
      method: RequestMethod.Put,
      headers: headers,
      body: JSON.stringify({order}),
      url: this.baseUrl+'/orders/'+id
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

  removeDnd(order:any,id:number){
    let user = JSON.parse(window.localStorage.getItem('login_details'));
    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile , 'X-User-Token': user.authentication_token });
    let options = new RequestOptions({ 
      method: RequestMethod.Put,
      headers: headers,
      body: JSON.stringify({order}),
      url: this.baseUrl+'/orders/'+id
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

// canceal package
  cancelPackage(id:number){
    let user = JSON.parse(window.localStorage.getItem('login_details'));
    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-User-Mobile': user.mobile , 'X-User-Token': user.authentication_token });
    let options = new RequestOptions({ 
      method: RequestMethod.Delete,
      headers: headers,
      url: this.baseUrl+'/order_packages/'+id
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
