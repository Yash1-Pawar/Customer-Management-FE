import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Customer-Management';
  search?: any = "";

  constructor(private router: Router) {
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

