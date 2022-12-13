import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from "../../../app-routing.module";
import { UserProfileComponent } from "./views/user-profile/user-profile.component";
import { UserProfileEditComponent } from "./views/user-profile-edit/user-profile-edit.component";
import { CookieModule } from "../../../services/utils/cookie/cookie.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../ui/material/material.module";
import { UserEmailChangeComponent } from "./views/user-email-change/user-email-change.component";
import { BrowserModule } from "@angular/platform-browser";
import { UserApiModule } from "../../../services/api/user/user.module";
import { environment } from "../../../../environments/environment";
import { USERS_API_URL } from "../../../services/api/user/user.service";

@NgModule({
  declarations: [
    UserProfileComponent,
    UserProfileEditComponent,
    UserEmailChangeComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    UserApiModule,
    CookieModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: USERS_API_URL, useValue: environment.USERS_API_URL
  }],
})
export class UsersAppModule { }
