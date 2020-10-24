import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { ISession } from '@Service/interfaces/session.interfaces';
import { AuthServiceService } from '@Service/services/auth/auth-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivateChild {
  token: ISession;
  constructor(private auth: AuthServiceService, private router: Router) {
    this.token = JSON.parse(localStorage.getItem('session')) as ISession;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const logged = this.auth.loggedIn();
    const role = this.auth.LoggedRol();
    // Comprobando la session
    if (logged === true && role === true) {
      if (!this.auth.isTokenExpired()) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }
  }
}
