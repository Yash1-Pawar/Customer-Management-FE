import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../model/Cutomer';
import { ServiceService } from '../service.service';

import * as bootstrap from 'bootstrap';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, AfterViewInit {

  customers: Customer[] = [new Customer("101", "Yash Pawar", "Java, SpringBoot, Angular", "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", "male")];

  constructor(private service: ServiceService, private router: Router, private navigation: NavigationComponent) {
  }

  ngAfterViewInit() {
    // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    // const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl as Element));
  }

  getAllCustomers() {
    this.service.getAllCustomers().subscribe(
      {
        next: (data: Customer[]) => {
          data.forEach((e: Customer) => {
            this.customers.push(new Customer(e.id, e.name, e.skills, e.desc, e.gender));
          });
        },
        error: (err) => {
          if (err.status == 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            this.navigation.loggedin = false;
            this.router.navigate(['/login']);
          }
        }
      }
    );
  }

  ngOnInit(): void {
    this.customers = [new Customer("101", "Yash Pawar", "Java, SpringBoot, Angular", "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", "male"), new Customer("1052", "fgg g", "Java, SpringBoot, Angular", "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", "male")];
    this.getAllCustomers();
  }

  delete(customer: Customer) {
    if (confirm("Do you want to delete?")) {
      this.service.deleteCustomer(customer.id).subscribe(
        {
          next: () => {
            this.ngOnInit();
          },
          error: (err) => {
            if (err.status == 403) {
              localStorage.removeItem('token');
              localStorage.removeItem('userId');
              this.navigation.loggedin = false;
              this.router.navigate(['/login']);
            }
          }
        }
      );
    }
  }

  onEditClick(customer: Customer) {
    this.router.navigate(["/update", customer.id]);
  }

  onViewClick(customer: Customer) {
    this.router.navigate(["/viewCustomer", customer.id]);
  }
}
