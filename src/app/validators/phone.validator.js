"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneNumberValidator = void 0;
function phoneNumberValidator() {
    return function (control) {
        var validPhoneNumberPattern = /^[0-9]{10}$/; // Adjust the pattern as needed
        var isValid = validPhoneNumberPattern.test(control.value);
        return isValid ? null : { 'invalidPhoneNumber': true };
    };
}
exports.phoneNumberValidator = phoneNumberValidator;
