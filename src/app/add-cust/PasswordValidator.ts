import { FormControl, FormGroup } from '@angular/forms';

export class Validator{

    static password = "";

    static setPassword(control: FormControl) {
        let password = control.value
        Validator.password=password;
        return null;
    }

    //return null for correct password & a object for incoorect password as it will set in Error in FormControl of confirmPassword
    static matchPasswordValidator(control: FormControl) {
        let confirmPass = control.value;
        return confirmPass === Validator.password ? null : { notMatched: true };
    }

}

