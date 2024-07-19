import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';
import { LocalStorageConstants } from '../utils/local.storage';

export const homeGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.readFromSession(LocalStorageConstants.USER_TOKEN).user.id==0){
   router.navigate(['/login']);
   return false;
  }
  return true;
};
