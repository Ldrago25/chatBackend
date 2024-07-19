import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthModel } from '@mean/models';
import { ApiService } from '@mean/services';
import { BaseComponent } from '@mean/shared';
import { UriConstants } from '@mean/utils';
import { AuthService } from 'src/app/services/Auth.service';
import { LocalStorageConstants } from 'src/app/utils/local.storage';

type Post={
  token:string,
  refreshToken:string,
  user:AuthModel.User
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent  extends BaseComponent<{},Post>{
  constructor(
    protected override  readonly apiService:ApiService<{},Post>,
    protected readonly fb:FormBuilder,
    protected readonly router:Router,
    protected readonly serviceAuth:AuthService
  ) {
    super(apiService);
    this.formGroup=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
    });
  }
  login(){
if(this.formGroup.valid){
  console.log('login...');
  let dataLogin:any=this.formGroup.value;

  this.createService({
    url: UriConstants.USER_LOGIN,
    data:dataLogin,

  }).subscribe({

    next:(value)=>{
      console.log(value.response);
      const {token,refreshToken}= value.response;
      this.serviceAuth.saveToSession(LocalStorageConstants.USER_TOKEN,token);
      this.serviceAuth.saveToSession(LocalStorageConstants.USER_REFRESH_TOKEN,refreshToken);
      this.loading=false;
      this.router.navigate(['']);
    },
    error:(error)=>{
      this.loading=false;
      this.alertConfiguration("ERROR",error);
      this.openAlert();
    }
  });
}
  }
}
