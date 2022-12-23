import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../model/Cutomer';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {
  customers: Customer[] = [];
  name: string = "";

  constructor(private service: ServiceService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.name = this.activatedRoute.snapshot.params['name'];
    console.log("name: " +this.name)
  }

  getAllCustomers() {
    this.service.getAllCustomers().subscribe((data: Customer[]) => {
      data.forEach((e: Customer) => {
        if (e.name?.toLocaleLowerCase().includes(this.name.toLocaleLowerCase())) {
          this.customers.push(new Customer(e.id, e.name, e.skills, e.desc, e.gender));
        }
      });
    });
  }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  delete(customer: Customer) {
    if (confirm("Do you want to delete?")) {
      this.service.deleteCustomer(customer.id).subscribe(() => {
        this.ngOnInit();
      });
    }
  }

  onEditClick(customer: Customer) {
    this.router.navigate(["/update", customer.id]);
  }

  onViewClick(customer: Customer) {
    this.router.navigate(["/viewCustomer", customer.id]);
  }

}
