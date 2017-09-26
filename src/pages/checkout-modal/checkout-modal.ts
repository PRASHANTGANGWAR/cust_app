import { Component } from '@angular/core';
import { NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the CheckoutModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-checkout-modal',
  templateUrl: 'checkout-modal.html',
})
export class CheckoutModalPage {
	checked:boolean = true;
	public title = "";
	private mainNumber = 0;
	private weekday:any = [];
  constructor( public navParams: NavParams, private view: ViewController ) {
  }

  ionViewDidLoad() {
  	let recieveChoice = this.navParams.get('data');
   	console.log(recieveChoice);
   	if(recieveChoice=="everyday"){
   		this.title = "Everyday";
   	} else if(recieveChoice == "alternate"){
   		this.title = "Alternate Day";
   		this.weekday=[{"day":"Monday","currentNumber":0}, {"day":"Wednesday","currentNumber":0},  {"day":"Friday","currentNumber":0}, {"day":"Sunday","currentNumber":0}];
  	} else if(recieveChoice == "mwf"){
  		this.title = "Mon-Wed-Fri";
  		this.weekday=[{"day":"Monday","currentNumber":0}, {"day":"Wednesday","currentNumber":0}, {"day":"Friday","currentNumber":0}];
  	} else if(recieveChoice == "mf"){
  		this.title = "Mon-Fri";
  		this.weekday=[{"day":"Monday","currentNumber":0},{"day":"Friday","currentNumber":0}];
  	} else if(recieveChoice == "tts"){
  		this.title = "Tue-Thu-Sat";
  		this.weekday=[{"day":"Tuesday","currentNumber":0}, {"day":"Thursday","currentNumber":0}, {"day":"Saturday","currentNumber":0}];
  	} else if(recieveChoice == "custom"){
  		this.title = "Custom";
  		this.weekday=[{"day":"Monday","currentNumber":0}, {"day":"Tuesday","currentNumber":0}, {"day":"Wednesday","currentNumber":0}, {"day":"Thursday","currentNumber":0}, {"day":"Friday","currentNumber":0}, {"day":"Saturday","currentNumber":0}, {"day":"Sunday","currentNumber":0}];
  	}
  }

  	incrementMain(){
  		if(this.mainNumber <20){
			if(this.mainNumber === 0){
				this.mainNumber += 2;
				for(var i=0; i<this.weekday.length; i++){
					this.weekday[i].currentNumber = this.mainNumber;
				}
			}
			else{
				this.mainNumber++;
				for(var j=0; j<this.weekday.length; j++){
					this.weekday[j].currentNumber = this.mainNumber;
				}
			}
		}
	}

	decrementMain(){
		if(this.mainNumber !== 0){
			if(this.mainNumber === 2){
				this.mainNumber -= 2;
				for(var i=0; i<this.weekday.length; i++){
					this.weekday[i].currentNumber = this.mainNumber;
				}
			}
			else{
				this.mainNumber--;
				for(var j=0; j<this.weekday.length; j++){
					this.weekday[j].currentNumber = this.mainNumber;
				}
			}
		}
	}

	increment (index: number){
		if(this.weekday[index].currentNumber< 20){
			if(this.weekday[index].currentNumber === 0 ){
				this.weekday[index].currentNumber += 2;
			}else{
				this.weekday[index].currentNumber++;
				console.log(this.weekday);
			}
		}
	}

	decrement(index: number){
		if(this.weekday[index].currentNumber !== 0){
			if(this.weekday[index].currentNumber === 2 ){
				this.weekday[index].currentNumber -= 2;
			}else{
				this.weekday[index].currentNumber--;
				console.log(this.weekday);
			}
		}
	}

	closeModal(){
	  	this.view.dismiss(null);
	}

	proceed(){
		this.view.dismiss("Hello modal");
	}

}
