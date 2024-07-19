import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthModel } from '@mean/models';
import { ApiService } from '@mean/services';
import { BaseComponent } from '@mean/shared';
import { UriConstants } from '@mean/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent  extends BaseComponent{
  userImg: File | null = null;
  constructor(
    protected override  readonly apiService:ApiService,
    protected readonly fb:FormBuilder,
    protected readonly router:Router
  ) {
    super(apiService);
    this.formGroup=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',],
      email:['',Validators.required],
      password:['',Validators.required],
    });
  }

  onUpload({ files }: { files: FileList}) {
    this.userImg = files[0];
  }

  removeFile() {
    this.userImg = null;
  }

  saveData(){
    if(this.formGroup.valid){
      console.log('guardando...');
      let saveDataUser:AuthModel.User=this.formGroup.value;
      console.log(saveDataUser);
      saveDataUser.active=true;
      saveDataUser.role='user';

      const formData=new FormData();

      formData.append('firstName',saveDataUser.firstName);
      formData.append('lastName',saveDataUser.lastName);
      formData.append('email',saveDataUser.email)
      formData.append('password',saveDataUser.password);
      formData.append('active','1')
      formData.append('roleId','2');
      if(this.userImg!==null){
        formData.append('img',this.userImg);
      }
      this.createService({
        url: UriConstants.USER_REGISTER,
        data:formData,

      }).subscribe({
        next:()=>{
          this.router.navigate(['/login']);
        },
        error:(error)=>{
          this.alertConfiguration("ERROR",error);
          this.openAlert();
        }
      });
    }

  }
}
