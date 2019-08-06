import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    form;

    constructor(private fb: FormBuilder, private auth: AuthService) {
        this.form = fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, this.emailValid()]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, { validator: this.matchingFields('password', 'confirmPassword') });
    }

    onSubmit() {
        console.log(this.form.errors);
        this.auth.register(this.form.value);
    }

    isValid(control) {
        return this.form.controls[control].invalid && this.form.controls[control].touched;
    }

    matchingFields(field1, field2) {
        return form => {
            if (form.controls[field1].value !== form.controls[field2].value) {
                return { mismatchedFields: true };
            }
        };
    }

    emailValid() {
        return control => {
            // tslint:disable-next-line:max-line-length
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(control.value) ? null : { invalidEmail: true };
        };
    }

}
