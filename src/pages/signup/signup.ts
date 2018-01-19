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
  signForm: FormGroup;
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
    this.signForm = this.fb.group({
      'name':[null,[Validators.required]],
      'mobile':[null,[Validators.required,Validators.pattern(/^[\s()+-]*([0-9][\s()+-]*){1,10}$/)]],
      'email':[null,[Validators.email]]
    });
  }

  onSignup() {
    // this.submitted = true;
    if (this.signForm.valid) {
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
       this.submitted=true;
      return false
    }
  }
}
