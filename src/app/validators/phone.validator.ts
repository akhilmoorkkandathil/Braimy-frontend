import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const validPhoneNumberPattern = /^[0-9]{10}$/; // Adjust the pattern as needed
    const isValid = validPhoneNumberPattern.test(control.value);
    return isValid ? null : { 'invalidPhoneNumber': true };
  };
}
