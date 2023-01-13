import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  title = 'Customer-Management';
  search?: any = "";

  constructor(private router: Router) {
  }
  ngOnInit(): void {
  }

  searchCustomer() {
    console.log("search clicked")
    this.router.navigate(["/searchCustomer", this.search])
    .then(page => { window.location.reload(); })
  }

  onButtonClick() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/searchCustomer'], { queryParams: { index: 1 } });
  }
}
