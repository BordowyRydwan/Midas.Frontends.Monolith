import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from "../../../app-routing.module";
import { FamilyListComponent } from "./views/family-list/family-list.component";
import { FamilyProfileComponent } from "./views/family-profile/family-profile.component";
import { FamilyUserAddComponent } from "./views/family-user-add/family-user-add.component";
import { CookieModule } from "../../../services/utils/cookie/cookie.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../ui/material/material.module";
import { BrowserModule } from "@angular/platform-browser";
import { FamilyApiModule } from "../../../services/api/family/family.module";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "../../../../environments/environment";
import { FAMILIES_API_URL } from "../../../services/api/family/family.service";



@NgModule({
  declarations: [
    FamilyListComponent,
    FamilyProfileComponent,
    FamilyUserAddComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FamilyApiModule,
    CookieModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: FAMILIES_API_URL, useValue: environment.FAMILIES_API_URL },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
})
export class FamiliesAppModule { }
