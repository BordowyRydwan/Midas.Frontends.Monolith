import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from "./modules/domain/navigation/navigation.module";
import { FilesAppModule } from "./modules/domain/files-app/files-app.module";
import { TransactionsAppModule } from "./modules/domain/transactions-app/transactions-app.module";
import { AuthAppModule } from "./modules/domain/auth-app/auth-app.module";
import { UsersAppModule } from "./modules/domain/users-app/users-app.module";
import { FamiliesAppModule } from "./modules/domain/families-app/families-app.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationModule,
    FilesAppModule,
    TransactionsAppModule,
    AuthAppModule,
    UsersAppModule,
    FamiliesAppModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
