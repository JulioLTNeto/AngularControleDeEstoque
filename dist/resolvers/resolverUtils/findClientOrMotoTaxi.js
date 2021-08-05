"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findClientOrMotoTaxiByUSernameOrEmail = exports.findClientOrMotoTaxiById = exports.findClientOrMotoTaxiByCpf = void 0;
const Client_1 = require("../../entity/Client");
const MotoTaxi_1 = require("../../entity/MotoTaxi");
const findClientOrMotoTaxiByCpf = (cpf) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    user = yield Client_1.Client.findOne({
        where: {
            cpf: cpf
        }
    });
    if (!user) {
        user = yield MotoTaxi_1.MotoTaxi.findOne({
            where: {
                cpf: cpf
            }
        });
    }
    return user;
});
exports.findClientOrMotoTaxiByCpf = findClientOrMotoTaxiByCpf;
const findClientOrMotoTaxiById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    user = yield Client_1.Client.findOne({
        where: {
            id: id
        }
    });
    if (!user) {
        user = yield MotoTaxi_1.MotoTaxi.findOne({
            where: {
                id: id
            }
        });
    }
    return user;
});
exports.findClientOrMotoTaxiById = findClientOrMotoTaxiById;
const findClientOrMotoTaxiByUSernameOrEmail = (userNameOrEmail) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    user = yield Client_1.Client.findOne(userNameOrEmail.includes('@')
        ? { where: { email: userNameOrEmail } }
        : { where: { userName: userNameOrEmail } });
    if (!user) {
        user = yield MotoTaxi_1.MotoTaxi.findOne(userNameOrEmail.includes('@')
            ? { where: { email: userNameOrEmail } }
            : { where: { userName: userNameOrEmail } });
    }
    return user;
});
exports.findClientOrMotoTaxiByUSernameOrEmail = findClientOrMotoTaxiByUSernameOrEmail;
//# sourceMappingURL=findClientOrMotoTaxi.js.map