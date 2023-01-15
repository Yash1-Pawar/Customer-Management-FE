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
  id!: string;

  constructor(private custService: ServiceService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.custService.getCustomerById(this.id).subscribe((res) => {
      this.customer.id = res.id;
      this.customer.name = res.name;
      this.customer.gender = res.gender;
      this.customer.skills = res.skills;
      this.customer.desc = res.desc;
    });
  }

  onsubmit() {
    try {
      this.custService.updateCustomer(this.customer).subscribe({
        next: (res: string) => {
          this.router.navigate(["/customers"]);
        },
        error: (error) => {
          if (error.status == 403) { this.alertTrigger('You do not have permission to update user!' ,'danger'); }
        }
      });
    } catch (error) {
      this.router.navigate(["/customers"]);
      console.log(error);
    }
  }

  message!: string;
  type!: string;
  showAlert: boolean = false;

  alert = (message: string, type: string) => {
    this.message = message;
    this.type = type;
    this.showAlert = true;
  }

  alertTrigger(message:string, type: string) {
    this.alert(message, type)
  }

  alertDismiss() {
    this.showAlert = false;
  }

}
