import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from "../../services/utils/cookie/cookies.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isUserLogged = false;

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.cookieService.getCookie("USER_SESSION")
      .subscribe(result => this.isUserLogged = result !== undefined);

    const isLogout = route.url[1].path === 'logout';

    if (isLogout && !this.isUserLogged) {
      return false;
    }

    if (!isLogout && this.isUserLogged) {
      this.router.navigate(['']);
    }

    return true;
  }

}
