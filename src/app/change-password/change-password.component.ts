import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validator } from '../add-cust/PasswordValidator';
import { ResetPassword } from '../model/ResetPassword';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  id?:string;
  disable:boolean = true;
 
  resetDTO: ResetPassword = new ResetPassword;

  constructor(private custService: ServiceService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.id = this.activatedRoute.snapshot.params['id'];
    this.userId.setValue(this.id);
    this.userId.disable()
  }

  ngOnInit(): void {
  }

  resetForm = new FormGroup({
    userId: new FormControl('', [Validators.required,
    Validators.pattern("[0-9]{6,8}")
    ]),
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required,
    Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}'),
    Validator.setPassword]),
    cPassword: new FormControl('', [Validators.required, Validator.matchPasswordValidator])
  });

  onSubmit() {
    console.log(this.resetForm);
    this.resetDTO.oldPassword = this.oldPassword?.value;
    this.resetDTO.newPassword = this.newPassword?.value;
    this.custService.changePassword(this.userId!.value,this.resetDTO).subscribe(
      {
        next: (response) => {
          console.log(response);
        },
        complete: () => {
          this.router.navigate(['/home'])
        },
        error: (error:any) => {
          console.error(error);
        }
      }
    );
  }

  get userId(): FormControl {
    return this.resetForm.get('userId') as FormControl;
  }

  get oldPassword(): FormControl {
    return this.resetForm.get('oldPassword') as FormControl;
  }

  get newPassword(): FormControl {
    return this.resetForm.get('newPassword') as FormControl;
  }

  get cPassword(): FormControl {
    return this.resetForm.get('cPassword') as FormControl;
  }


}
