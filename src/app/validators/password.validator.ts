import { AbstractControl, ValidatorFn } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value || '';
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasSpecialCharacter = /[@#$]/.test(value);
        const isValid = hasUppercase && hasLowercase && hasSpecialCharacter;

        const errors = {
            uppercase: !hasUppercase,
            lowercase: !hasLowercase,
            specialCharacter: !hasSpecialCharacter,
        };

        return isValid ? null : errors;
    };
}
