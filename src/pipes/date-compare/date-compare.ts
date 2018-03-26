import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCompare',
})
export class DateComparePipe implements PipeTransform {
  
  transform(delivery_date : any) {

  	var isDelivered=false;
  	var today = new Date();
  	 var date=today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  	 var deliveryDate = new Date(delivery_date);
       var currentdate = new Date(date); 

       	console.log(currentdate);
       		console.log(deliveryDate);
		if (deliveryDate > currentdate)
		{	
			isDelivered = true;		
			return isDelivered ;
    	}
    	else
    	{
    		isDelivered = false;
    		return  isDelivered;
    	}
}

  }

