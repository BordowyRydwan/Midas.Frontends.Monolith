import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from "../../../app-routing.module";
import { LoggedMenuComponent } from "./components/logged-menu/logged-menu.component";
import { NotLoggedMenuComponent } from "./components/not-logged-menu/not-logged-menu.component";
import { CookieModule } from "../../../services/utils/cookie/cookie.module";
import { MaterialModule } from "../../ui/material/material.module";
import { BrowserModule } from "@angular/platform-browser";
import { NavigationAppComponent } from './components/navigation-app/navigation-app.component';

@NgModule({
  declarations: [
    NotLoggedMenuComponent,
    LoggedMenuComponent,
    NavigationAppComponent,
  ],
  exports: [
    NavigationAppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CookieModule,
    MaterialModule,
    AppRoutingModule
  ]
})
export class NavigationModule { }
