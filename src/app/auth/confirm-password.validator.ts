import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export const confirmPasswordValidator: ValidatorFn = (  control: AbstractControl): ValidationErrors | null => {
  return control.value.password === control.value.confirmPassword ? null : { PasswordNoMatch: true };
};