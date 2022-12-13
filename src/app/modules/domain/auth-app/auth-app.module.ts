import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from "../../../app-routing.module";
import { LogoutComponent } from "./views/logout/logout.component";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";
import { CookieModule } from "../../../services/utils/cookie/cookie.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../ui/material/material.module";
import { BrowserModule } from "@angular/platform-browser";
import { AuthApiModule } from "../../../services/api/auth/auth.module";
import { AUTH_API_URL } from "../../../services/api/auth/auth.service";
import { environment } from "../../../../environments/environment";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    CookieModule,
    AuthApiModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: AUTH_API_URL, useValue: environment.AUTH_API_URL
  }],
})
export class AuthAppModule { }
