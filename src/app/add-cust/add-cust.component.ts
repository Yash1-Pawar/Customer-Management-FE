import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../model/Cutomer';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-cust',
  templateUrl: './add-cust.component.html',
  styleUrls: ['./add-cust.component.css']
})
export class AddCustComponent implements OnInit {
  customer:Customer = new Customer;

  constructor(private custService:ServiceService, private router:Router) { 
  }

  ngOnInit(): void {
  }

  onsubmit(){
    this.custService.addCustomer(this.customer).subscribe(()=>{
      this.router.navigate(["/customers"]);
    });
  }

}
