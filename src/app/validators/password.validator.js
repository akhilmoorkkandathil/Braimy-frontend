"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidator = void 0;
function passwordValidator() {
    return function (control) {
        var value = control.value || '';
        var hasUppercase = /[A-Z]/.test(value);
        var hasLowercase = /[a-z]/.test(value);
        var hasSpecialCharacter = /[@#$]/.test(value);
        var isValid = hasUppercase && hasLowercase && hasSpecialCharacter;
        var errors = {
            uppercase: !hasUppercase,
            lowercase: !hasLowercase,
            specialCharacter: !hasSpecialCharacter,
        };
        return isValid ? null : errors;
    };
}
exports.passwordValidator = passwordValidator;
