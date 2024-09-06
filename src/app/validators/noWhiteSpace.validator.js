"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noWhitespaceValidator = void 0;
function noWhitespaceValidator() {
    return function (control) {
        var isWhitespace = (control.value || '').trim().length === 0;
        var isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    };
}
exports.noWhitespaceValidator = noWhitespaceValidator;
