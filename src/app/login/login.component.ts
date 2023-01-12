import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../model/Login';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDTO:Login = new Login();

  constructor(private service:ServiceService) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    userId: new FormControl('', [Validators.required, 
      Validators.pattern("[0-9]{6,8}")
    ]),
    password: new FormControl('', [Validators.required, 
      // Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}') 
    ])
  });

  onSubmit() {
    console.log(this.loginForm);
    this.loginDTO.id = this.loginForm.get('userId')?.value;
    this.loginDTO.password = this.loginForm.get('password')?.value;
    this.service.login(this.loginDTO).subscribe((response)=>{
      console.log(response.token);
      localStorage.setItem('token' , response.token);
    });
  }

  all() {
    this.service.getAllCustomers().subscribe((data)=>{
      console.log(data);
    });
  }

  get userId(): FormControl {
    return this.loginForm.get("userId") as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }

}
