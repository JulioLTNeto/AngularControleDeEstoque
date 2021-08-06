"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateregisterNumber = void 0;
const validateregisterNumber = (registerNumver) => {
    const regularExpression = /[A-Z]{2}-[0-9]{4}/;
    return regularExpression.test(registerNumver);
};
exports.validateregisterNumber = validateregisterNumber;
//# sourceMappingURL=validadeMototaxiRegisterNumber.js.map