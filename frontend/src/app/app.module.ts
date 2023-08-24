import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { SendMoneyComponent } from './send-money/send-money.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { CardsComponent } from './cards/cards.component';
import { ReceivePaymentComponent } from './receive-payment/receive-payment.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { AuthGuard } from "./guards/auth.guard";


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    LoginComponent,
    SendMoneyComponent,
    NavbarComponent,
    DashboardComponent,
    TransactionComponent,
    CardsComponent,
    ReceivePaymentComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
		BrowserAnimationsModule,
    DpDatePickerModule,
		ToastrModule.forRoot({
			timeOut: 10000,
			positionClass: "toast-top-right",
			preventDuplicates: true,
			enableHtml: true,
		}),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
