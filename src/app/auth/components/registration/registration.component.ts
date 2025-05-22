import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { confirmPasswordValidator } from '../../confirm-password.validator';

@Component({
  selector: 'czv-registration',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
 registrationForm:FormGroup= new FormGroup({
    name: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
 },{ validators: confirmPasswordValidator });

 
  register() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      if (this.registrationForm.value.password !== this.registrationForm.value.confirmPassword) {
        console.log('Passwords do not match');
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
