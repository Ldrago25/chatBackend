import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from '@mean/models';
import { ApiService } from '@mean/services';
import { BaseComponent } from '@mean/shared';
import { UriConstants } from '@mean/utils';
import { AuthService } from 'src/app/services/Auth.service';
import { LocalStorageConstants } from 'src/app/utils/local.storage';

@Component({
  selector: 'app-userListForChat',
  templateUrl: './userListForChat.component.html',
  styleUrls: ['./userListForChat.component.scss']
})
export class UserListForChatComponent extends BaseComponent<AuthModel.User> implements OnInit {
  userList: AuthModel.User[] = [];
  userDataLogin:AuthModel.User;
  date:number=  Date.now();
  constructor(
    protected override readonly apiService: ApiService<AuthModel.User>,
    protected readonly auth:AuthService,
    protected readonly router:Router
  ) {
    super(apiService);
    this.userDataLogin=this.auth.readFromSession(LocalStorageConstants.USER_TOKEN).user;
  }

  ngOnInit() {
    this.getUsers();
  }
 clickChat(id:number){
  this.router.navigate([`/home/${id}`]);
 }
  async getUsers() {
    this.userList = (await this.searchArrAsync({ url: UriConstants.USERS })).response;
    console.log(this.userList);
   var index= this.userList.findIndex((value)=>{
     return value.id==this.userDataLogin.id;
    });

  this.userList.splice(index,1);
  console.log(this.userList);
  }

}
