import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'czv-modify',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './modify.component.html',
  styleUrl: './modify.component.scss',
})
export class ModifyComponent {
  authService: AuthService=inject(AuthService);
  modifyForm: FormGroup=new FormGroup({
    name: new FormControl(this.authService.user?.name, [Validators.required]),
  });

  onSubmit() {
    this.authService.updateUser(this.modifyForm.value.name || '')
    this.modifyForm.reset();
  }
}
