import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { ConferenceData } from '../../providers/conference-data';
import { AddressOptions } from '../../interfaces/user-options';
import { PlaceOrderPage } from '../place-order/place-order';

declare var window:any;
@Component({
  selector: 'my-address',
  templateUrl: 'my-address.html'
})

export class MyAddressPage {
	  address: AddressOptions = { addressinfo: ''};
	  submitted = false;
	  cities: any = {};
	  states:any = [];
	  cityOption:any = [];
	  areaOption:any = [];
	  local: string = "";
	  type : string = "Home";

	constructor(
		public confData: ConferenceData,
		public userData: UserData,
		private navCtrl: NavController,
		private _alert: AlertController){
	    this.onLoad();
	}

	selectOption(value: string){
	    console.log(value);
	    for( var i=0;i < this.states.length;i++ ){
	    	if (this.states[i].name == value){
	    		this.cityOption = this.states[i].cities;
	    		this.areaOption = this.states[i].cities[0].areas;
	    		this.local = this.states[i].cities[0].areas[0].id;
	    	}
	    }
 	 }

	  selectOptionCity(value : string){
	  	console.log(value);
	    for( var j=0;j < this.cityOption.length;j++ ){
	    	if (this.cityOption[j].name == value){
	    		this.areaOption = this.cityOption[j].areas;
	    	}
	    }
	  }


	  onLoad(){	
	   	this.confData.states().then(data => {
	   		console.log(data);
	   		this.states = JSON.parse(window.localStorage.getItem('states'));
	   		let st = this.states[0].name;
	   		this.selectOption(st);
	    	console.log(this.states);
	   	});
	  }

	onSubmit(form: NgForm,value: any) {
	    this.submitted = true;
	    console.log(value);
	    if (form.valid) {
	    	let address:any = {};
	    	address.address_type = value.type;
	    	address.area_id = value.local;
	    	address.name = value.addressinfo;
	    	this.userData.addAddress(address).then(result=> {
	    	let data : any = {};
              data = result;
              if(data.status == 200){
              	this.navCtrl.setRoot(PlaceOrderPage);
              } else{
                  this.doAlert('Error','something went wrong.');
                }
    		});
	    }
	}

	 doAlert(type: string,message: string) {
	    let alert = this._alert.create({
	      title: type,
	      subTitle: message,
	      buttons: ['OK']
	    });
	    alert.present();
	  }
}