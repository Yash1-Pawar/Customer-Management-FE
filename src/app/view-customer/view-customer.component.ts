import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../model/Cutomer';
import { NavigationComponent } from '../navigation/navigation.component';
import { ServiceService } from '../service.service';
import { ToastBgcEnum } from '../utility/ToastBgcEnum';
import { ToastUtility } from '../utility/ToastUtility';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  customer: Customer = new Customer;
  id!: string;
  tabSelected: string = 'following';
  loggedInUserId = localStorage.getItem('userId');
  loggedInUser: Customer = new Customer;

  constructor(private custService: ServiceService, private router: Router, private activatedRoute: ActivatedRoute, private navigation: NavigationComponent) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.setLoggedInUser();
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

  customerChangeFromChild(customer: Customer) {
    console.log('EventEmitter: ' + JSON.stringify(customer))
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

  follow(followingId: string) {
    this.custService.follow(this.loggedInUser.id, followingId).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.setLoggedInUser();
          ToastUtility.showToast('You started following ' + followingId, ToastBgcEnum.SUCCESS);
        },
        error: (err) => {
          console.error(err)
          ToastUtility.showToast('Server Error', ToastBgcEnum.FAILURE);
        }
      }
    );
  }

  unfollow(followingId: string) {
    if (confirm("Do you want to Unfollow?")) {
      this.custService.unfollow(this.loggedInUser.id, followingId).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.setLoggedInUser();
            ToastUtility.showToast('You Unfollowed ' + followingId, ToastBgcEnum.WARN);
          },
          error: (err) => {
            console.error(err)
            ToastUtility.showToast('Server Error', ToastBgcEnum.FAILURE);
          }
        }
      );
    }
  }

  setLoggedInUser() {
    let userId = localStorage.getItem('userId');
    if (userId != null) {
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

}
