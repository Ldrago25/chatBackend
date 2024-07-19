import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { LoginComponent, RegisterComponent, HomeComponent } from '@mean/public';
import {  authGuard, homeGuard} from "./guards";
import { UserListForChatComponent } from "./components/usersListForChat/userListForChat/userListForChat.component";
const routes: Routes = [
  {
    path: 'home/:id',
    component: HomeComponent,
    canActivate:[homeGuard]
  },
  {
    path: '',
    component: UserListForChatComponent,
    canActivate:[homeGuard]
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate:[authGuard]
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
