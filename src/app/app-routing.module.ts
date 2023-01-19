import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustComponent } from './add-cust/add-cust.component';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { NavBarComponent } from './home/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { UpdateComponent } from './update/update.component';
import { FollowersComponent } from './view-customer/followers/followers.component';
import { FollowingComponent } from './view-customer/following/following.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';

const routes: Routes = [
  { path: "home", component: NavBarComponent },
  { path: "customers", component: CustomersComponent , canActivate:[AuthGuardGuard]},
  { path: "register", component: AddCustComponent },
  { path: "login", component: LoginComponent },
  { path: "update/:id", component: UpdateComponent },
  { path: "viewCustomer/:id", component: ViewCustomerComponent,
    children: [
      {path: "following", component: FollowingComponent},
      {path: "followers", component: FollowersComponent}
    ]
  },
  { path: "searchCustomer/:name", component: SearchCustomerComponent },
  { path: "changePassword", component: ResetPasswordComponent },
  { path: "forgotPassword", component: ForgotPasswordComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
