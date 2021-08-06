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
exports.Run = exports.RunPaymentStatus = exports.RunStatus = exports.RunType = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Client_1 = require("./Client");
const MotoTaxi_1 = require("./MotoTaxi");
var RunType;
(function (RunType) {
    RunType[RunType["DELIVERY"] = 0] = "DELIVERY";
    RunType[RunType["TAXI"] = 1] = "TAXI";
})(RunType = exports.RunType || (exports.RunType = {}));
var RunStatus;
(function (RunStatus) {
    RunStatus[RunStatus["PENDING"] = 0] = "PENDING";
    RunStatus[RunStatus["OPEN"] = 1] = "OPEN";
    RunStatus[RunStatus["CLOSED"] = 2] = "CLOSED";
})(RunStatus = exports.RunStatus || (exports.RunStatus = {}));
var RunPaymentStatus;
(function (RunPaymentStatus) {
    RunPaymentStatus[RunPaymentStatus["NOT_PAID"] = 0] = "NOT_PAID";
    RunPaymentStatus[RunPaymentStatus["PAID"] = 1] = "PAID";
})(RunPaymentStatus = exports.RunPaymentStatus || (exports.RunPaymentStatus = {}));
type_graphql_1.registerEnumType(RunType, {
    name: 'RunType',
    description: 'If the run is a deliery or a passenger'
});
type_graphql_1.registerEnumType(RunStatus, {
    name: 'RunStatus',
    description: 'If a run has ended or not'
});
type_graphql_1.registerEnumType(RunPaymentStatus, {
    name: 'RunPaymentStatus',
    description: 'If a run has been paid or not or not'
});
let Run = class Run extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Run.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Run.prototype, "acceptedAt", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Float),
    typeorm_1.Column({ default: 5 }),
    __metadata("design:type", Number)
], Run.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(() => RunType),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Run.prototype, "runType", void 0);
__decorate([
    type_graphql_1.Field(() => RunStatus),
    typeorm_1.Column({ default: RunStatus.PENDING }),
    __metadata("design:type", Number)
], Run.prototype, "runStatus", void 0);
__decorate([
    type_graphql_1.Field(() => RunPaymentStatus),
    typeorm_1.Column({ default: RunPaymentStatus.NOT_PAID }),
    __metadata("design:type", Number)
], Run.prototype, "runPaymentStatus", void 0);
__decorate([
    type_graphql_1.Field(() => Client_1.Client),
    typeorm_1.ManyToOne(() => Client_1.Client, client => client.runs, { onDelete: 'SET NULL', onUpdate: 'CASCADE', cascade: true }),
    __metadata("design:type", Client_1.Client)
], Run.prototype, "client", void 0);
__decorate([
    type_graphql_1.Field(() => MotoTaxi_1.MotoTaxi),
    typeorm_1.ManyToOne(() => MotoTaxi_1.MotoTaxi, motoTaxi => motoTaxi.runs, { onDelete: 'SET NULL', onUpdate: 'CASCADE', cascade: false }),
    __metadata("design:type", MotoTaxi_1.MotoTaxi)
], Run.prototype, "motoTaxi", void 0);
Run = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Run);
exports.Run = Run;
//# sourceMappingURL=Run.js.map