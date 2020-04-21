import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot,
  CanActivate, CanLoad, UrlSegment } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from 'core/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canAccess(state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.canAccess(this.location.path());
  }

  private canAccess(path: string) {
    if (this.authService.isAuthenticated()) {
      // token is in session storage > logged in so return true
      return true;
    }

    if (path === '/unauthorised') {
      this.navigateToLogin(path);
      return false;
    }

    this.navigateToLogin(path);
    return false;
  }

  private navigateToLogin(path: string) {
    this.router.navigate(['/login'], { queryParams: { returnUrl: path } });
  }
}
