"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPasswordValidator = void 0;
var confirmPasswordValidator = function (controlName, controlNameToMatch) {
    return function (FormGroup) {
        var control = FormGroup.controls[controlName];
        var controlToMatch = FormGroup.controls[controlNameToMatch];
        if (controlToMatch.errors && !controlToMatch.errors['confirmPasswordValidator'])
            return;
        if (control.value !== controlToMatch.value)
            controlToMatch.setErrors({ confirmPasswordValidator: true });
        else
            controlToMatch.setErrors(null);
    };
};
exports.confirmPasswordValidator = confirmPasswordValidator;
