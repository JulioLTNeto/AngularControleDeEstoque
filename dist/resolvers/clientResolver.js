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
exports.ClientResolver = void 0;
const Client_1 = require("../entity/Client");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const argon2_1 = __importDefault(require("argon2"));
const validateRegister_1 = require("../utils/validateRegister");
const ClientResponse_1 = require("./graphqlTypes/ClientResponse");
class ClientResolver {
    getClients(_ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return Client_1.Client.find();
        });
    }
    getClient(cpf, _ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = Client_1.Client.findOne({
                where: {
                    cpf: cpf
                }
            });
            return client;
        });
    }
    createClient({ req }, name, userName, email, cpf, password, photo, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = validateRegister_1.validateRegister(userName, email, password);
            if (errors) {
                return { errors };
            }
            let client;
            try {
                const result = yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(Client_1.Client)
                    .values({
                    name: name,
                    userName: userName,
                    email: email,
                    cpf: cpf,
                    photo: photo,
                    phone: phone,
                    hashed_password: yield argon2_1.default.hash(password)
                })
                    .execute();
                client = yield Client_1.Client.findOne({ where: { id: result.raw.insertId } });
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
            req.session.clientId = client.id;
            return {
                client: client
            };
        });
    }
    updateClient(_ctx, name, email, cpf, photo, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = yield Client_1.Client.findOne({ where: { cpf: cpf } });
            if (!client) {
                return null;
            }
            return Client_1.Client.update({ id: client.id }, {
                name: name,
                email: email,
                cpf: cpf,
                photo: photo,
                phone: phone
            })
                .then(() => { return client; })
                .catch(() => { return null; });
        });
    }
    deleteClient(_ctx, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield Client_1.Client.findOne({ where: { id: id } });
            if (!client) {
                return true;
            }
            client.remove();
            return true;
        });
    }
}
__decorate([
    type_graphql_1.Query(() => [Client_1.Client]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "getClients", null);
__decorate([
    type_graphql_1.Query(() => Client_1.Client, { nullable: true }),
    __param(0, type_graphql_1.Arg('cpf', () => String)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "getClient", null);
__decorate([
    type_graphql_1.Mutation(() => ClientResponse_1.ClientResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('name', () => String)),
    __param(2, type_graphql_1.Arg('userName', () => String)),
    __param(3, type_graphql_1.Arg('email', () => String)),
    __param(4, type_graphql_1.Arg('cpf', () => String)),
    __param(5, type_graphql_1.Arg('password', () => String)),
    __param(6, type_graphql_1.Arg('photo', () => String, { nullable: true })),
    __param(7, type_graphql_1.Arg('phone', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "createClient", null);
__decorate([
    type_graphql_1.Mutation(() => Client_1.Client, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('name', () => String)),
    __param(2, type_graphql_1.Arg('email', () => String)),
    __param(3, type_graphql_1.Arg('cpf', () => String)),
    __param(4, type_graphql_1.Arg('photo', () => String, { nullable: true })),
    __param(5, type_graphql_1.Arg('phone', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "updateClient", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "deleteClient", null);
exports.ClientResolver = ClientResolver;
//# sourceMappingURL=clientResolver.js.map