import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { InvoicePopupComponent } from "./components/invoice-popup/invoice-popup.component";
import { TransactionPopupComponent } from "./components/transaction-popup/transaction-popup.component";
import { CookieModule } from "../../../services/utils/cookie/cookie.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../ui/material/material.module";
import { TransactionListComponent } from "./views/transaction-list/transaction-list.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../../../app-routing.module";
import { TransactionsPaginatorModule } from "../../ui/paginator/transactions-paginator.module";
import { TransactionAddComponent } from "./views/transaction-add/transaction-add.component";
import { environment } from "../../../../environments/environment";
import { TransactionsApiModule } from "../../../services/api/transaction/transaction.module";
import { TRANSACTIONS_API_URL } from "../../../services/api/transaction/transaction.service";
import { FilesAppModule } from "../files-app/files-app.module";


@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionAddComponent,
    TransactionPopupComponent,
    InvoicePopupComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    TransactionsApiModule,
    CookieModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TransactionsPaginatorModule,
    FilesAppModule
  ],
  providers: [
    { provide: TRANSACTIONS_API_URL, useValue: environment.TRANSACTIONS_API_URL },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
})
export class TransactionsAppModule { }
