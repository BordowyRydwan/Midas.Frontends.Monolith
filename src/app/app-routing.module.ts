import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from "@angular/common";
import { UserProfileComponent } from "./modules/domain/users-app/views/user-profile/user-profile.component";
import {
  UserProfileEditComponent
} from "./modules/domain/users-app/views/user-profile-edit/user-profile-edit.component";
import { SessionGuard } from "./guards/session/session.guard";
import {
  UserEmailChangeComponent
} from "./modules/domain/users-app/views/user-email-change/user-email-change.component";
import { LogoutComponent } from "./modules/domain/auth-app/views/logout/logout.component";
import { LoginComponent } from "./modules/domain/auth-app/views/login/login.component";
import { RegisterComponent } from "./modules/domain/auth-app/views/register/register.component";
import { AuthGuard } from "./guards/auth/auth.guard";
import { FamilyListComponent } from "./modules/domain/families-app/views/family-list/family-list.component";
import { FamilyProfileComponent } from "./modules/domain/families-app/views/family-profile/family-profile.component";
import { FamilyUserAddComponent } from "./modules/domain/families-app/views/family-user-add/family-user-add.component";
import { DownloadFileComponent } from "./modules/domain/files-app/components/download-file/download-file.component";
import {
  TransactionAddComponent
} from "./modules/domain/transactions-app/views/transaction-add/transaction-add.component";
import {
  TransactionListComponent
} from "./modules/domain/transactions-app/views/transaction-list/transaction-list.component";


const routes: Routes = [
  { path: 'users/profile', component: UserProfileComponent, canActivate: [ SessionGuard ]},
  { path: 'users/profile/edit', component: UserProfileEditComponent, canActivate: [ SessionGuard ]},
  { path: 'users/profile/edit-email', component: UserEmailChangeComponent, canActivate: [ SessionGuard ]},

  { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent, canActivate: [ AuthGuard ]},
  { path: 'auth/register', component: RegisterComponent, canActivate: [ AuthGuard ] },
  { path: 'auth/logout', component: LogoutComponent, canActivate: [ AuthGuard ] },

  { path: 'families/list', component: FamilyListComponent, canActivate: [ SessionGuard ]},
  { path: 'families/:id', component: FamilyProfileComponent, canActivate: [ SessionGuard ]},
  { path: 'families/add/:id', component: FamilyUserAddComponent, canActivate: [ SessionGuard ]},

  { path: 'files/download/:guid', component: DownloadFileComponent, canActivate: [ SessionGuard ]},

  { path: 'transactions/list', component: TransactionListComponent, canActivate: [ SessionGuard ]},
  { path: 'transactions/list/:userid', component: TransactionListComponent, canActivate: [ SessionGuard ]},
  { path: 'transactions/list/:userid/add', component: TransactionAddComponent, canActivate: [ SessionGuard ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppRoutingModule { }
