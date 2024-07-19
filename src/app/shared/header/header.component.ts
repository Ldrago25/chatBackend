import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from '@mean/models';
import { AuthService } from 'src/app/services/Auth.service';
import { LocalStorageConstants } from 'src/app/utils/local.storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  logo = '../../../assets/logo.png';
  showMenuLogin = true;
  userData:AuthModel.User;
  constructor(
    private router: Router,
    private auth:AuthService
  ) {
    this.userData=this.auth.readFromSession(LocalStorageConstants.USER_TOKEN).user;
    if(this.userData.id>0){
      this.showMenuLogin=false;
    }else{
      this.showMenuLogin=true;
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
