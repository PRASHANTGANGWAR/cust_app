import { Component } from '@angular/core';
import { UserData } from '../../providers/user-data';
import { ProductListPage } from '../product-list/product-list';
import { Database } from '../../providers/db-provider';

import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';

declare var window: any;

export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean|void;
};

@Component({
  selector: 'page-prescription-list',
  templateUrl: 'prescription-list.html'
})
export class PrescriptionListPage {
  private loading :any;
  speakers: any[] = [];
  private prescriptions: any[] = [];
  private listLength : boolean = false;
  public username:string = 'john';
  private listStatus : boolean = false;

  constructor(
    public navCtrl: NavController,
    public confData: ConferenceData,
    private _alert: AlertController,
    private _loading: LoadingController,
    public userData: UserData,
    public dataBase: Database
  ) {
      //this.prescriptionList();
      //let user = JSON.parse(window.localStorage.getItem('login_details'));
      //this.username = user.name;
      this.productList();
    }

    productList(){
      this.confData.categories().then(results=>{
           console.log(results);
           this.dataBase.insertProducts(results);
      });
    }

    showlist(number: any){
      this.navCtrl.setRoot(ProductListPage,{id: number});
    }

  prescriptionList(){
    this.showLoader();
    this.confData.prescriptionData(null).then(results=>{
        let resultData : any ={};
         resultData = results;
        if(resultData.status == 200){
          this.hideLoader();
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
            window.localStorage.setItem('prescriptions', JSON.stringify(this.prescriptions));
            if(this.prescriptions[i].status=='on going'){
              this.listStatus= true;
            }
          }
          if(this.prescriptions.length==0){
            this.listLength = true;
          }
        } else{
          this.hideLoader();
          this.doAlert('Error','something went wrong.');
        }
    });
  }

  update(index: number,medicine: string, event: string){
      if(event == "reschedule"){
       this.presentPrompt(index,medicine,event);
      }else{
        this.presentConfirm(index,medicine,event);
      }
  }

  toggle(index: number){
     let div = <HTMLElement>document.querySelector("#hide-show"+index);
     let display = div.style.display;
     console.log(<HTMLElement>document.querySelector("#hide-show"+index));
     div.style.display = (display ==="block")? "none" : "block";
  }

  presentPrompt(index: number, medicine: any, event: string) {
    let alert = this._alert.create({
        title: 'Postpone Medicine',
        inputs: [
          {
            name: 'postpone_time',
            placeholder: 'In Minutes',
            type: 'number'
          }
        ],
        buttons: [
          {
            text: 'CANCEL',
            role: 'cancel',
            handler: data => {
              console.log(data+'Cancel clicked');
            }
          },
          {
            text: event.toUpperCase(),
            handler: data => {
            let post_time = data.postpone_time;
              if (post_time && post_time <= 120){
                  this.showLoader();
                  this.decide(index,medicine,event,post_time);
              } else {
                return false;
              }
            }
          }
        ]
      });
    alert.present();
  }

  presentConfirm(index: number, medicine: any, event: string) {
    let alert = this._alert.create({
      title: 'Confirm Action',
      message: 'Do you want to ' +event+ ' this medicine?',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: event.toUpperCase(),
          handler: () => {
            if(event == "miss"){
              event = "missed";
              this.showLoader();

            }else{
               event = "taken";
               this.showLoader();
            }
            this.decide(index,medicine,event,null);
          }
        }
      ]
    });
    alert.present();
  }

  decide(index: number, medicine: any, event: string, post_time:any){
    let dtime;
    let user = JSON.parse(window.localStorage.getItem('login_details'));
    let serialId=user.serial.toString();
    if(medicine.intervals){
        dtime = medicine.intervals[index].time;
    }
    else if(medicine.frequency){
      dtime = medicine.frequency[index].time;
    }
      let presData :any ={};
      presData.userid = serialId;
      presData.prescription_id = medicine._id;
      presData.status = event;
      presData.dose_time = dtime;
      presData.time = post_time;
      this.confData.eventScheduler(presData).then(results=>{
        let resultData : any ={};
        resultData = results;
        if(resultData.status == 200){
          this.hideLoader();
          this.prescriptionList();
        }else{
          this.hideLoader();
          this.doAlert('Error','something went wrong.');
        }
      });
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
