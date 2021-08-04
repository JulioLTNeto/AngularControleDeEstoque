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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserType = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
var UserType;
(function (UserType) {
    UserType[UserType["CLIENT"] = 0] = "CLIENT";
    UserType[UserType["MOTOTAXI"] = 1] = "MOTOTAXI";
    UserType[UserType["ADMIN"] = 2] = "ADMIN";
})(UserType = exports.UserType || (exports.UserType = {}));
type_graphql_1.registerEnumType(UserType, {
    name: 'UserType',
    description: 'If the user is Client or a Moto Taxi'
});
let User = class User extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.createdAt = Date;
        this.updatedAt = Date;
    }
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ nullable: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "cpf", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "hashed_password", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "photo", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ default: UserType.CLIENT }),
    __metadata("design:type", Number)
], User.prototype, "userType", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ default: 3 }),
    __metadata("design:type", Number)
], User.prototype, "score", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Object)
], User.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Object)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    type_graphql_1.ObjectType()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map