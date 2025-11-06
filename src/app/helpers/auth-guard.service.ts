import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (location.pathname.startsWith('/inventory')) {
      if (this.auth.isLoggedIn()) {
        this.auth.clearSession();
        location.reload();
        return true;
      } else {
        return true;
      }
    }

    if (this.auth.isLoggedIn()) {
      return true;
    }
    location.href = `auth/login?returnUrl=${state.url}`;
    return false;
  }
}

@Injectable({ providedIn: 'root' })
export class ActivateLogin implements CanActivate {
  constructor(private router: Router, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}
