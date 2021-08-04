"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isClient = void 0;
const Client_1 = require("../entity/Client");
const isClient = ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error("Not authenticated");
    }
    if (!Client_1.Client.findOne({ where: { id: context.req.session.userId } })) {
        throw new Error("User is not a Client");
    }
    return next();
};
exports.isClient = isClient;
//# sourceMappingURL=isClient.js.map