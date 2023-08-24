import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { SendMoneyComponent } from './send-money/send-money.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ReceivePaymentComponent } from './receive-payment/receive-payment.component';
import { CardsComponent } from './cards/cards.component';

const routes: Routes = [
  { path: 'open-account', component: AccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'send-money', component: SendMoneyComponent },
  { path: 'receive-payment', component: ReceivePaymentComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'cards', component: CardsComponent },
  { path: '', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
