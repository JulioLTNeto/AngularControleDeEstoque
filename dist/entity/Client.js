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
exports.verifyHash = exports.hashPassword = exports.Client = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Run_1 = require("./Run");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("./User");
let Client = class Client extends User_1.User {
};
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Client.prototype, "stripeId", void 0);
__decorate([
    typeorm_1.OneToMany(() => Run_1.Run, run => run.client, { onDelete: 'SET NULL', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Client.prototype, "runs", void 0);
Client = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Client);
exports.Client = Client;
function hashPassword(pwd) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10);
        return bcryptjs_1.default.hash(pwd, salt);
    });
}
exports.hashPassword = hashPassword;
function verifyHash(pwd, haashedPwd) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = bcryptjs_1.default.compare(pwd, haashedPwd);
        return result;
    });
}
exports.verifyHash = verifyHash;
//# sourceMappingURL=Client.js.map