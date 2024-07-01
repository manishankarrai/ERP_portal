import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CommonService } from '../services/common.service';


export const routeGuard: CanActivateFn = (route, state) => {

  const authService = inject(CommonService);
  const router = inject(Router);
  const expectedRole = route.data['expectedRole'];
  const role = authService.getRole();


  if (role != expectedRole) {

    router.navigate(['/login']);
    return false ;
  } 

  return true;
};
