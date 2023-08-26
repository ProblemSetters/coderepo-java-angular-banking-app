import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { SendMoneyComponent } from './send-money/send-money.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ReceivePaymentComponent } from './receive-payment/receive-payment.component';
import { CardsComponent } from './cards/cards.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'open-account', component: AccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'send-money', component: SendMoneyComponent, canActivate: [AuthGuard] },
  { path: 'receive-payment', component: ReceivePaymentComponent, canActivate: [AuthGuard] },
  { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard] },
  { path: 'cards', component: CardsComponent, canActivate: [AuthGuard] },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
