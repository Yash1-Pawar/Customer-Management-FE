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
      this.customer = res;
      // this.custService.getAllCustomers().subscribe((fri) => {
      //   let f:Customer[] = [];
      //   f.push(...fri)
      //   // console.log(f)
      //   this.customer.friends = [];
      //   f.forEach(e => {
      //     this.customer.friends.push(new Customer(e.id, e.name, e.skills, e.desc, e.gender));
      //    });
      //   this.customer.friends.sort((a,b)=>{
      //     if(a.id>b.id) return 1;
      //     else if(a.id < b.id) return -1;
      //     else return 0;
      //   });
      // });
      this.customer.friends.sort((a,b)=>{
        if(a.id>b.id) return 1;
        else if(a.id < b.id) return -1;
        else return 0;
      });
      scrollTo(0,0);
    });
  }

  viewFriend(id:number) {
    this.id=id;
    this.ngOnInit();
  }

  onEditClick(customer:Customer) {
    this.router.navigate(["/update", customer.id]);
  }

}
