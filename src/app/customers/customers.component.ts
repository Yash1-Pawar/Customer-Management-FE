import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../model/Cutomer';
import { ServiceService } from '../service.service';

import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, AfterViewInit {

  customers: Customer[] = [new Customer("101", "Yash Pawar", "Java, SpringBoot, Angular", "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", "male")];

  constructor(private service: ServiceService, private router: Router) {
  }

  ngAfterViewInit() {
    // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    // const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl as Element));
  }

  getAllCustomers() {
    this.service.getAllCustomers().subscribe((data: Customer[]) => {
      data.forEach((e: Customer) => {
        this.customers.push(new Customer(e.id, e.name, e.skills, e.desc, e.gender));
      });
    });
  }

  ngOnInit(): void {
    this.customers = [new Customer("101", "Yash Pawar", "Java, SpringBoot, Angular", "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", "male"), new Customer("1052", "fgg g", "Java, SpringBoot, Angular", "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", "male")];
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
