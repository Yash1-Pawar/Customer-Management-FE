import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../model/Cutomer';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[] = [new Customer("101", "Yash Pawar", "Java, SpringBoot, Angular", "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", "male"), new Customer("102", "Sonali", "Java, SpringBoot, ReactJs", "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.", "female")];

  constructor(private service: ServiceService, private router: Router) {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.service.getAllCustomers().subscribe((data: Customer[]) => {
      data.forEach((e: Customer) => {
        this.customers.push(new Customer(e.id, e.name, e.skills, e.desc, e.gender));
      });
    });
  }

  ngOnInit(): void {
  }

  delete(customer: Customer) {
    if (confirm("Do you want to delete?")) {
      this.service.deleteCustomer(customer.id).subscribe(()=>{
        this.getAllCustomers();
      });
    }
  }

  onEditClick(customer:Customer) {
    this.router.navigate(["/update", customer.id]);
  }

}
