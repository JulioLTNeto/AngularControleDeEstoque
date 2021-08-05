"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotoTaxiResolver = void 0;
const MotoTaxi_1 = require("../entity/MotoTaxi");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const argon2_1 = __importDefault(require("argon2"));
const validateRegister_1 = require("../utils/validateRegister");
const validadeMototaxiRegisterNumber_1 = require("../utils/validadeMototaxiRegisterNumber");
const motoTaxiResponse_1 = require("./graphqlTypes/motoTaxiResponse");
class MotoTaxiResolver {
    getMotoTaxis(_ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return MotoTaxi_1.MotoTaxi.find();
        });
    }
    getMotoTaxisByStatus(_ctx, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return MotoTaxi_1.MotoTaxi.find({ where: {
                    status: status
                } });
        });
    }
    getMotoTaxi(cpf, _ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const motoTaxi = MotoTaxi_1.MotoTaxi.findOne({
                where: {
                    cpf: cpf
                }
            });
            return motoTaxi;
        });
    }
    createMotoTaxi({ req }, name, userName, email, cpf, password, photo, phone, registrationNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            let errors = validateRegister_1.validateRegister(userName, email, password);
            if (errors) {
                return { errors };
            }
            if (!validadeMototaxiRegisterNumber_1.validateregisterNumber(registrationNumber)) {
                return {
                    errors: [
                        {
                            field: "registrationNumber",
                            message: "invalid Registration Number",
                        }
                    ]
                };
            }
            let motoTaxi;
            try {
                const result = yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(MotoTaxi_1.MotoTaxi)
                    .values({
                    name: name,
                    userName: userName,
                    email: email,
                    cpf: cpf,
                    photo: photo,
                    phone: phone,
                    registrationNumber: registrationNumber,
                    hashed_password: yield argon2_1.default.hash(password)
                })
                    .execute();
                motoTaxi = yield MotoTaxi_1.MotoTaxi.findOne({ where: { id: result.raw.insertId } });
            }
            catch (error) {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "username already taken",
                        }
                    ]
                };
            }
            req.session.clientId = motoTaxi.id;
            return {
                motoTaxi: motoTaxi
            };
        });
    }
    updateMotoTaxi(_ctx, name, email, cpf, photo, phone, registrationNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            let motoTaxi = yield MotoTaxi_1.MotoTaxi.findOne({ where: { cpf: cpf } });
            if (!motoTaxi) {
                return null;
            }
            return MotoTaxi_1.MotoTaxi.update({ id: motoTaxi.id }, {
                name: name,
                email: email,
                cpf: cpf,
                photo: photo,
                phone: phone,
                registrationNumber: registrationNumber
            })
                .then(() => { return motoTaxi; })
                .catch(() => { return null; });
        });
    }
    deleteMotoTaxi(_ctx, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const motoTaxi = yield MotoTaxi_1.MotoTaxi.findOne({ where: { id: id } });
            if (!motoTaxi) {
                return true;
            }
            motoTaxi.remove();
            return true;
        });
    }
}
__decorate([
    type_graphql_1.Query(() => [MotoTaxi_1.MotoTaxi]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MotoTaxiResolver.prototype, "getMotoTaxis", null);
__decorate([
    type_graphql_1.Query(() => [MotoTaxi_1.MotoTaxi]),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('status', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MotoTaxiResolver.prototype, "getMotoTaxisByStatus", null);
__decorate([
    type_graphql_1.Query(() => MotoTaxi_1.MotoTaxi, { nullable: true }),
    __param(0, type_graphql_1.Arg('cpf', () => String)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MotoTaxiResolver.prototype, "getMotoTaxi", null);
__decorate([
    type_graphql_1.Mutation(() => motoTaxiResponse_1.MotoTaxiResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('name', () => String)),
    __param(2, type_graphql_1.Arg('userName', () => String)),
    __param(3, type_graphql_1.Arg('email', () => String)),
    __param(4, type_graphql_1.Arg('cpf', () => String)),
    __param(5, type_graphql_1.Arg('password', () => String)),
    __param(6, type_graphql_1.Arg('photo', () => String, { nullable: true })),
    __param(7, type_graphql_1.Arg('phone', () => String)),
    __param(8, type_graphql_1.Arg('registrationNumber', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], MotoTaxiResolver.prototype, "createMotoTaxi", null);
__decorate([
    type_graphql_1.Mutation(() => MotoTaxi_1.MotoTaxi, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('name', () => String)),
    __param(2, type_graphql_1.Arg('email', () => String)),
    __param(3, type_graphql_1.Arg('cpf', () => String)),
    __param(4, type_graphql_1.Arg('photo', () => String, { nullable: true })),
    __param(5, type_graphql_1.Arg('phone', () => String)),
    __param(6, type_graphql_1.Arg('registrationNumber', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], MotoTaxiResolver.prototype, "updateMotoTaxi", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], MotoTaxiResolver.prototype, "deleteMotoTaxi", null);
exports.MotoTaxiResolver = MotoTaxiResolver;
//# sourceMappingURL=motoTaxiResolver.js.map