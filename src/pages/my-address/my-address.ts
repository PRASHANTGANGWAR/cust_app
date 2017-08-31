import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConferenceData } from '../../providers/conference-data';
import { AddressOptions } from '../../interfaces/user-options';

declare var window:any;
@Component({
  selector: 'my-address',
  templateUrl: 'my-address.html'
})

export class MyAddressPage {
	  address: AddressOptions = { aname: ''};
	  submitted = false;
	  cities: any = {};
	  states:any = [];
	  cityOption:any = [];
	  areaOption:any = [];
	constructor(public confData: ConferenceData){
	    this.onLoad();
	}

	selectOption(value: string){
	    console.log(value);
	    for( var i=0;i < this.states.length;i++ ){
	    	if (this.states[i].name == value){
	    		this.cityOption = this.states[i].cities;
	    		this.areaOption = this.states[i].cities[0].areas;

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

	onSubmit(form: NgForm) {
	    this.submitted = true;
	    if (form.valid) {
	    	console.log(this.address.aname);
	    }
	}
}