"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMotoTaxi = void 0;
const MotoTaxi_1 = require("../entity/MotoTaxi");
const isMotoTaxi = ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error("Not authenticated");
    }
    if (!MotoTaxi_1.MotoTaxi.findOne({ where: { id: context.req.session.userId } })) {
        throw new Error("User is not a moto taxi");
    }
    return next();
};
exports.isMotoTaxi = isMotoTaxi;
//# sourceMappingURL=isMotoTaxi.js.map