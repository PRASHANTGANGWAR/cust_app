import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { SignupOptions } from '../../interfaces/user-options';

import { LoginPage } from '../login/login';
import { Alerts } from '../../providers/alerts-provider';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage implements OnInit {
  myForm: FormGroup;
  signup: SignupOptions = { name: '', mobile:'', email: ''};
  submitted = false;
  userForm:any;

  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    private alerts : Alerts,
    private fb: FormBuilder
  ) {}

 ngOnInit() {
    this.myForm = this.fb.group({
      'name':['',[Validators.required]],
      'mobile':['',[Validators.required,Validators.minLength(10),Validators.pattern(/[0-9\+\-\ ]/)]],
      'email':['',[Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]
    });
  }

  onSignup() {
    // this.submitted = true;
    if (this.myForm.valid) {
      this.alerts.showLoader();
      this.userData.signup(this.signup).then((res:any)=>{
            this.alerts.hideLoader();
            if(res.status == 200){
            this.alerts.doAlert('Success!','Please login to continue.');
             this.navCtrl.setRoot(LoginPage);
            }
            else if(res.status == 422){
              this.alerts.doAlert('','this number has already been taken');
            } 
            else{
              //form.resetForm();
              this.alerts.doAlert('Error','something went wrong');
          }
        });
    }else{
      return false
    }
  }
}
