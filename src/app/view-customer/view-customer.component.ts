import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../model/Cutomer';
import { NavigationComponent } from '../navigation/navigation.component';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  customer: Customer = new Customer;
  id!: string;
  tabSelected: string = 'following';

  constructor(private custService: ServiceService, private router: Router, private activatedRoute: ActivatedRoute, private navigation: NavigationComponent) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.custService.getCustomerById(this.id).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.customer = res;
          scrollTo(0, 0);
        },
        complete: () => {
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

  customerChangeFromChild(customer: Customer) {
    this.customer = customer;
  }

  viewFriend(id: string) {
    this.id = id;
    this.ngOnInit();
  }

  onEditClick(customer: Customer) {
    this.router.navigate(["/update", customer.id]);
  }

  childTab(tab: string) {
    this.tabSelected = tab;
  }

}
