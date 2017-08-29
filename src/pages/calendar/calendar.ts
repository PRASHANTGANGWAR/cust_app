import { Component } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'calendar-schedule',
  templateUrl: 'calendar.html'
})
export class CalendarPage {
  eventSource: any;
  viewTitle: any;
  isToday:boolean;
  calendar = {
  mode: 'month',
  currentDate: new Date()
  };
  private prescriptions: any[] = [];
  private presCopy: any[]=[];
  private presList: any[]=[];
  private listLength : boolean = false;
  private loading :any;

  constructor(
    public confData: ConferenceData,
    public _loading:LoadingController,
    public _alert: AlertController
  ) {}

    loadEvents() {
        this.eventSource = this.createRandomEvents();
        console.log(this.eventSource);
    }

    onViewTitleChanged(title: string) {
        this.viewTitle = title;
    }

    onEventSelected(event: any) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }

    today() {
        this.calendar.currentDate = new Date();
    }

    onTimeSelected(ev: any) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    onCurrentDateChanged(event:Date) {
      this.showLoader();
      let pres_date = event.getDate() +'/'+ (event.getMonth()+1)+'/'+event.getFullYear();
        this.confData.prescriptionData(pres_date).then(results=>{
          this.hideLoader();
          let resultData : any ={};
           resultData = results;
          if(resultData.status == 200){
            this.prescriptions =resultData.message
            for(var i=0;i<this.prescriptions.length;i++)
            {
              var date = new Date(this.prescriptions[i].dos);
              if(!this.prescriptions[i].duration){
                 this.prescriptions[i].duration = 3650;
              }
              console.log(date.setTime( date.getTime() + (this.prescriptions[i].duration-1)*86400000 ));
              this.prescriptions[i].doe=date.toString();
              console.log(this.prescriptions);
            }
            this.presCopy=this.prescriptions;
            this.loadData(event)
          } else{
            this.doAlert('Error','something went wrong.');
          }
        });
    }

    createRandomEvents() {
      var events = [];
       for (var i = 0; i < this.presCopy.length; i++) {
          var startTime;
          var endTime;
          var start;
          var end;
          startTime = new Date(this.presCopy[i].dos); //starting date for the medicine
          start = new Date(this.presCopy[i].dos);

          //check if duration is null then set it for 3650 days  
           if(!this.presCopy[i].duration){
                 this.presCopy[i].duration = 3650;
              }
          //getting ending date for the medicine by adding duration to start date    
          end=start.setTime( start.getTime() + this.presCopy[i].duration*86400000 );
          endTime =new Date(end);
          events.push({
              title: this.presCopy[i].drugId,
              startTime: startTime,
              endTime: endTime,
              allDay: true
          });
      }
      return events;
    }

    onRangeChanged(ev: any) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };

    toggle(index: number){
       let div = <HTMLElement>document.querySelector("#hide-show"+index);
       let display = div.style.display;
       div.style.display = (display ==="block")? "none" : "block";
    }

    loadData(event:any){
      var today = new Date();
      //today.setHours(0, 0, 0, 0);
      //event.setHours(0, 0, 0, 0);
      this.isToday = today.getTime() === event.getTime();
      this.presList=[];
      for(var i =0;i<this.prescriptions.length;i++){
          var startDate;
          var start;
          var end;
          startDate = new Date(this.prescriptions[i].dos); //starting date for the medicine
          start = new Date(this.prescriptions[i].dos);

          //check if duration is null then set it for 3650 days  
           if(!this.prescriptions[i].duration){
                 this.prescriptions[i].duration = 3650;
              }
          //getting ending date for the medicine by adding duration to start date    
          end=start.setTime( start.getTime() + (this.prescriptions[i].duration)*86400000 );

       if(startDate.getTime() <= event.getTime() && end >=event.getTime()){
          this.prescriptions[i].doe=new Date(end-86400000).toString();
          this.presList.push(this.prescriptions[i]);
          console.log(this.presList);
          
       }
      }
      this.listLength = false;
      if(this.presList.length==0){
        this.listLength = true;
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

    showLoader(){
      this.loading = this._loading.create({
        content: 'Please wait...',
      });
      this.loading.present();
    }

    hideLoader(){
      this.loading.dismiss();
    }
}
