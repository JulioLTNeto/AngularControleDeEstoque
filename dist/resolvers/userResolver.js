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
exports.UserResolver = void 0;
const Client_1 = require("../entity/Client");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const constants_1 = require("../constants");
const validateEmail_1 = require("../utils/validateEmail");
const sendEmail_1 = require("../utils/sendEmail");
const uuid_1 = require("uuid");
const User_1 = require("../entity/User");
const MotoTaxi_1 = require("../entity/MotoTaxi");
const findClientOrMotoTaxi_1 = require("./resolverUtils/findClientOrMotoTaxi");
const UserResponse_1 = require("./graphqlTypes/UserResponse");
class UserResolver {
    getAllUsers(_ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultClients = yield Client_1.Client.find();
            const resultMotoTaxis = yield MotoTaxi_1.MotoTaxi.find();
            const result = [...new Set([...resultClients, ...resultMotoTaxis])];
            return result;
        });
    }
    getUser(cpf, _ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield findClientOrMotoTaxi_1.findClientOrMotoTaxiByCpf(cpf);
        });
    }
    currentUser({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return null;
            }
            let user = yield findClientOrMotoTaxi_1.findClientOrMotoTaxiById(req.session.userId);
            return user;
        });
    }
    login({ req }, userNameOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield findClientOrMotoTaxi_1.findClientOrMotoTaxiByUSernameOrEmail(userNameOrEmail);
            if (password.length <= 3) {
                return {
                    errors: [{
                            field: 'username',
                            message: "password must be greater than 2"
                        }]
                };
            }
            if (!user) {
                return {
                    errors: [{
                            field: 'userNameOrEmail',
                            message: "Username doesn't exist"
                        }]
                };
            }
            const valid = yield argon2_1.default.verify(user.hashed_password, password);
            if (!valid) {
                return {
                    errors: [{
                            field: 'password',
                            message: "Incorrect password"
                        }]
                };
            }
            req.session.userId = user.id;
            return {
                user: user
            };
        });
    }
    logout({ req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => req.session.destroy(err => {
                res.clearCookie(constants_1.COOKIE_NAME);
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                resolve(true);
            }));
        });
    }
    forgotPassword(email, { redis }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!validateEmail_1.validateEmail(email)) {
                return true;
            }
            const user = yield findClientOrMotoTaxi_1.findClientOrMotoTaxiByUSernameOrEmail(email);
            if (!user) {
                return true;
            }
            const token = uuid_1.v4();
            yield redis.set(constants_1.FORGET_PASSWORD_PREFIX + token, user.id, 'ex', 1000 * 60 * 60 * 24 * 3);
            yield sendEmail_1.sendEmail(email, `<a href="http://localhost:3000/change-password/${token}">Reset Password</a>`);
            return true;
        });
    }
    changePassword(token, newPassword, { redis, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newPassword.length <= 2) {
                return { errors: [
                        {
                            field: "newPassword",
                            message: "length must be greater than 6"
                        }
                    ] };
            }
            const redisKey = constants_1.FORGET_PASSWORD_PREFIX + token;
            const userId = yield redis.get(redisKey);
            if (!userId) {
                return { errors: [
                        {
                            field: "token",
                            message: "token expired"
                        }
                    ] };
            }
            const user = yield findClientOrMotoTaxi_1.findClientOrMotoTaxiById(userId);
            if (!user) {
                return { errors: [
                        {
                            field: "toeken",
                            message: "user no longer exists"
                        }
                    ] };
            }
            user.hashed_password = yield argon2_1.default.hash(newPassword);
            if (user.userType === User_1.UserType.CLIENT) {
                Client_1.Client.save(user);
            }
            else {
                MotoTaxi_1.MotoTaxi.save(user);
            }
            req.session.clientId = user.id;
            redis.del(redisKey);
            return { user };
        });
    }
}
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getAllUsers", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg('cpf', () => String)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "currentUser", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse_1.UserResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('userNameOrEmail', () => String)),
    __param(2, type_graphql_1.Arg('password', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('email', () => String)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse_1.UserResponse),
    __param(0, type_graphql_1.Arg('token', () => String)),
    __param(1, type_graphql_1.Arg('newPassword', () => String)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
exports.UserResolver = UserResolver;
//# sourceMappingURL=userResolver.js.map