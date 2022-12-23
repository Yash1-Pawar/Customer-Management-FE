import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustComponent } from './add-cust/add-cust.component';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { UpdateComponent } from './update/update.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';

const routes: Routes = [
  { path: "home", component: NavBarComponent },
  { path: "customers", component: CustomersComponent },
  { path: "addCustomer", component: AddCustComponent },
  { path: "update/:id", component: UpdateComponent },
  { path: "viewCustomer/:id", component: ViewCustomerComponent },
  { path: "searchCustomer/:name", component: SearchCustomerComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
