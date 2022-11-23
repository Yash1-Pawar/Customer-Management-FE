import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../model/Cutomer';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  @Input() edit: Customer = new Customer;

  customer: Customer = new Customer;
  id!: number;

  constructor(private custService: ServiceService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.custService.getCustomerById(this.id).subscribe((res) => {
      this.customer = res;
    });
  }

  onsubmit() {
    try {
      this.custService.updateCustomer(this.customer).subscribe((res: string) => {
        this.router.navigate(["/customers"]);
      });
    } catch (error) {
      this.router.navigate(["/customers"]);
      console.log(error);
    }
  }
}
