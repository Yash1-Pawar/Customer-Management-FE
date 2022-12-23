import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../model/Cutomer';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  customer: Customer = new Customer;
  id!: number;

  constructor(private custService: ServiceService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.custService.getCustomerById(this.id).subscribe((res) => {
      console.log(res);
      this.customer = res;
      scrollTo(0, 0);
    }, () => { }, () => {
      this.customer.customers = [];
      this.customer.friends.forEach(cust => {
        this.custService.getCustomerById(Number.parseInt(cust)).subscribe((result) => {
          this.customer.customers.push(result);
        })
      })
      this.customer.customers.sort((a, b) => {
        if (a.id > b.id) return 1;
        else if (a.id < b.id) return -1;
        else return 0;
      });
    });
  }

  onButtonClick() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/myrsearchCustomeroute'], { queryParams: { index: 1 } });
  }

  viewFriend(id: number) {
    this.id = id;
    this.ngOnInit();
  }

  onEditClick(customer: Customer) {
    this.router.navigate(["/update", customer.id]);
  }

}
