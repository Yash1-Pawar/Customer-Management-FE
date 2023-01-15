import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  title = 'Customer-Management';
  search?: any = "";
  loggedin: boolean = localStorage.getItem('token') == null ? false : true;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.isLoggedIn;
  }
  ngOnInit(): void {
    this.isLoggedIn;
  }

  reLoad() {
    this.router.navigate([this.router.url])
  }

  searchCustomer() {
    console.log("search clicked")
    this.router.navigate(["/searchCustomer", this.search]);
    this.search ="";
  }

  onButtonClick() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/searchCustomer'], { queryParams: { index: 1 } });
  }

  isLoggedIn() {
    this.loggedin = localStorage.getItem('token') == null ? false : true;
  }

  logout() {
    if (confirm('Do you want to Logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.loggedin = false;
    }
  }

  get UserId() {
    return localStorage.getItem('userId');
  }

}
