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
	private mainNumber = 2;
	private weekday = [{"day":"Monday","currentNumber":2}, {"day":"Tuesday","currentNumber":2}, {"day":"Wednesday","currentNumber":2}, {"day":"Thursday","currentNumber":2}, {"day":"Friday","currentNumber":2}, {"day":"Saturday","currentNumber":2}, {"day":"Sunday","currentNumber":2}];
  constructor( public navParams: NavParams, private view: ViewController ) {
  }

  ionViewDidLoad() {
  	let recieveData = this.navParams.get('result');
    console.log(recieveData);
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

	status(index:number){
		console.log(index);
		let div = <HTMLElement>document.querySelector("#toggle"+index);
		let display = div.style.display;
       	div.style.display = (display ==="block")? "none" : "block";
       	this.weekday[index].currentNumber = 0;
	}

	 closeModal(){
	  	this.view.dismiss(null);
	  }

	proceed(){
		this.view.dismiss(this.weekday);
	}

}
