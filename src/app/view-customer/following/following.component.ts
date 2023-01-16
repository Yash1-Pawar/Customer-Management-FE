import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/Cutomer';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  @Input()
  customer: Customer = new Customer;

  @Output()
  customerChange = new EventEmitter<Customer>();

  id!: string;

  constructor(private custService: ServiceService, private router: Router) {
    this.customer.customers = [];
  }

  ngOnInit(): void {
  }

  getById() {
    this.custService.getCustomerById(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.customer = res;
        this.customerChange.emit(this.customer);
        scrollTo(0, 0);
      }, complete: () => {
        this.customer.customers = [];
        console.log(this.customer.friends);
        this.customer.friends.forEach(cust => {
          if (cust != "" && cust != null) {
            this.custService.getCustomerById(cust).subscribe((result) => {
              this.customer.customers.push(result);
            })
          }
        })
        this.customer.customers.sort((a, b) => {
          if (a.id > b.id) return 1;
          else if (a.id < b.id) return -1;
          else return 0;
        });
      }
    });
  }

  viewFriend(id: string) {
    this.id = id;
    this.getById();
  }

}
