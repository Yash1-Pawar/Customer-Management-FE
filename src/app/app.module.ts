import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { AddCustComponent } from './add-cust/add-cust.component';
import { NavBarComponent } from './home/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateComponent } from './update/update.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { FollowersComponent } from './view-customer/followers/followers.component';
import { FollowingComponent } from './view-customer/following/following.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    AddCustComponent,
    NavBarComponent,
    UpdateComponent,
    ViewCustomerComponent,
    SearchCustomerComponent,
    NavigationComponent,
    LoginComponent,
    FollowersComponent,
    FollowingComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [SearchCustomerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
