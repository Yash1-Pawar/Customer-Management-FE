import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Customer } from '../model/Cutomer';
import { ServiceService } from '../service.service';
import { Validator } from './PasswordValidator';

@Component({
  selector: 'app-add-cust',
  templateUrl: './add-cust.component.html',
  styleUrls: ['./add-cust.component.css']
})
export class AddCustComponent implements OnInit {

  customer: Customer = new Customer;

  toastMessage?: string;
  toastBgc?:string;

  constructor(private custService: ServiceService, private router: Router) {
  }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    userId: new FormControl('', [Validators.required,
    Validators.pattern("[0-9]{6,8}")
    ]),
    name: new FormControl('', [Validators.required]),
    gender: new FormControl(''),
    skills: new FormControl(''),
    about: new FormControl(''),
    password: new FormControl('', [Validators.required,
    Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}'),
    Validator.setPassword]),
    cpassword: new FormControl('', [Validators.required, Validator.matchPasswordValidator])
  });

  onSubmit() {
    this.customer.id = this.userId.value;
    this.customer.name = this.name.value;
    this.customer.gender = this.gender.value;
    this.customer.skills = this.skills.value;
    this.customer.desc = this.about.value;
    this.customer.password = this.password.value;
    this.custService.addCustomer(this.customer).subscribe(
      {
        next: (response) => {
          this.toastMessage = `Customer Registered Succesfully,
                               Redirecting to Login Page...`;
          this.toastBgc = 'text-bg-success';
          this.showToast();
        },
        complete: () => {
          console.log('complete');
          setTimeout(() => {
            console.log('waiting...')
            this.router.navigate(["/login"]);
          }, 3000);
        },
        error: (err) => {
          console.log(err);
          this.toastMessage = 'Customer Registration Failed!';
          this.toastBgc = 'text-bg-danger';
          this.toastMessage = err.error;
          this.showToast();
        }
      }
    );
  }

  showToast() {
    const toastLiveExample = document.getElementById('displayToast') as HTMLElement;
    const toast = new bootstrap.Toast(toastLiveExample)
    toast.show();
  }

  get userId(): FormControl {
    return this.registerForm.get('userId') as FormControl;
  }

  get name(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }

  get gender(): FormControl {
    return this.registerForm.get('gender') as FormControl;
  }

  get skills(): FormControl {
    return this.registerForm.get('skills') as FormControl;
  }

  get about(): FormControl {
    return this.registerForm.get('about') as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get cpassword(): FormControl {
    return this.registerForm.get('cpassword') as FormControl;
  }

}
