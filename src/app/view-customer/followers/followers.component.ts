import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/Cutomer';
import { NavigationComponent } from 'src/app/navigation/navigation.component';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  @Input()
  customer: Customer = new Customer;

  @Output()
  customerChange = new EventEmitter<Customer>();

  id!: string;
  loggedInUser: Customer = new Customer;

  constructor(private custService: ServiceService, private router: Router, private navigation: NavigationComponent) {
    this.customer.followersCustomers = [];
    this.setLoggedInUser();
  }

  ngOnInit(): void {
  }

  getById() {
    this.custService.getCustomerById(this.id).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.customer = res;
          this.customerChange.emit(this.customer);
          scrollTo(0, 0);
        },
        complete: () => {
          this.customer.customers = [];
          console.log('Following: ' + this.customer.friends);
          this.customer.friends.forEach(cust => {
            if (cust != "" && cust != null) {
              this.custService.getCustomerById(cust).subscribe((result) => {
                this.customer.customers.push(result);
              })
            }
          })
          this.customer.followersCustomers = [];
          console.log('Followers: ' + this.customer.followers);
          this.customer.followers.forEach(cust => {
            if (cust != "" && cust != null) {
              this.custService.getCustomerById(cust).subscribe((result) => {
                this.customer.followersCustomers.push(result);
              })
            }
          })
          this.sortCustomers();
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

  sortCustomers() {
    this.customer.customers.sort((a, b) => {
      if (a.id > b.id) return 1;
      else if (a.id < b.id) return -1;
      else return 0;
    });
  }

  viewFriend(id: string) {
    this.id = id;
    this.getById();
  }

  setLoggedInUser() {
    let userId = localStorage.getItem('userId');
    if(userId != null) {
      this.custService.getCustomerById(userId).subscribe(
        {
          next: (loggedInUser) => {
            this.loggedInUser = loggedInUser;
          },
          error: (err) => {
            console.error(err);
          }
        }
      )
    };
  }

  follow(followingId: string) {
    this.custService.follow(this.loggedInUser.id, followingId).subscribe(
      {
        next: (response)=> {
          console.log(response);
          this.setLoggedInUser();
        },
        error: (err) => {
          console.error(err)
        }
      }
    );
  }

  unfollow(followingId: string) {
    this.custService.unfollow(this.loggedInUser.id, followingId).subscribe(
      {
        next: (response)=> {
          console.log(response);
          this.setLoggedInUser();
        },
        error: (err) => {
          console.error(err)
        }
      }
    );
  }

}
