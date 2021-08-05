"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const validateEmail_1 = require("./validateEmail");
const validateRegister = (userName, email, password) => {
    if (userName.length <= 2) {
        return [{
                field: 'username',
                message: "length must be greater than 2"
            }];
    }
    if (userName.includes('@')) {
        return [{
                field: 'username',
                message: "Cannot includes an @"
            }];
    }
    if (!validateEmail_1.validateEmail(email)) {
        return [{
                field: 'email',
                message: "Invalid Email"
            }];
    }
    if (password.length <= 3) {
        return [{
                field: 'password',
                message: "password must be greater than 2"
            }];
    }
    return null;
};
exports.validateRegister = validateRegister;
//# sourceMappingURL=validateRegister.js.map