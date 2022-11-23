import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustComponent } from './add-cust/add-cust.component';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: "customers", component: CustomersComponent },
  { path: "addCustomer", component: AddCustComponent },
  { path: "home", component: NavBarComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "update/:id", component: UpdateComponent },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
