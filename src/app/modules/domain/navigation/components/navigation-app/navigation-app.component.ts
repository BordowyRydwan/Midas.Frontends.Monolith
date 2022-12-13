import { Component, OnInit } from '@angular/core';
import { CookieService } from "../../../../../services/utils/cookie/cookies.service";
import { filter } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: 'navigation',
  templateUrl: './navigation-app.component.html',
  styleUrls: ['./navigation-app.component.css']
})
export class NavigationAppComponent implements OnInit {
  isLogged = false;

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.routerEvent();
  }

  private setLoggedFlag(): void {
    this.cookieService.getCookie('USER_SESSION')
      .subscribe((result) => this.isLogged = result !== undefined);
  }

  private routerEvent(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.setLoggedFlag());
  }
}
