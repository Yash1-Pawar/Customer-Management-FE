import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validator } from '../add-cust/PasswordValidator';
import { ResetPassword } from '../model/ResetPassword';
import { ServiceService } from '../service.service';
import { ToastBgcEnum } from '../utility/ToastBgcEnum';
import { ToastUtility } from '../utility/ToastUtility';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private custService: ServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  resetForm = new FormGroup({
    userId: new FormControl('', [Validators.required,
    Validators.pattern("[0-9]{6,8}")
    ]),
    newPassword: new FormControl('', [Validators.required,
    Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}'),
    Validator.setPassword]),
    cPassword: new FormControl('', [Validators.required, Validator.matchPasswordValidator])
  });

  onSubmit() {
    console.log(this.resetForm);
    this.custService.forgotPassword(this.userId!.value, this.newPassword!.value).subscribe(
      {
        next: (response) => {
          console.log(response);
          ToastUtility.showToast('Password Reset Successfully', ToastBgcEnum.SUCCESS);
        },
        complete: () => {
          this.router.navigate(['/home'])
        },
        error: (error:any) => {
          console.error(error);
          ToastUtility.showToast('Password Reset Failed!', ToastBgcEnum.FAILURE)
        }
      }
    );
  }

  get userId(): FormControl {
    return this.resetForm.get('userId') as FormControl;
  }

  get newPassword(): FormControl {
    return this.resetForm.get('newPassword') as FormControl;
  }

  get cPassword(): FormControl {
    return this.resetForm.get('cPassword') as FormControl;
  }


}
