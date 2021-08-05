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
exports.MotoTaxi = exports.MotoTaxiStatus = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Run_1 = require("./Run");
const User_1 = require("./User");
var MotoTaxiStatus;
(function (MotoTaxiStatus) {
    MotoTaxiStatus[MotoTaxiStatus["AVAILABLE"] = 0] = "AVAILABLE";
    MotoTaxiStatus[MotoTaxiStatus["UNAVAILABLE"] = 1] = "UNAVAILABLE";
})(MotoTaxiStatus = exports.MotoTaxiStatus || (exports.MotoTaxiStatus = {}));
type_graphql_1.registerEnumType(MotoTaxiStatus, {
    name: 'MotoTaxiStatus',
    description: 'If the mototaxi is available or not'
});
let MotoTaxi = class MotoTaxi extends User_1.User {
};
__decorate([
    type_graphql_1.Field(() => MotoTaxiStatus),
    typeorm_1.Column({ default: MotoTaxiStatus.AVAILABLE }),
    __metadata("design:type", Number)
], MotoTaxi.prototype, "status", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MotoTaxi.prototype, "registrationNumber", void 0);
__decorate([
    typeorm_1.OneToMany(() => Run_1.Run, run => run.motoTaxi, { onDelete: "SET NULL", onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], MotoTaxi.prototype, "runs", void 0);
MotoTaxi = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], MotoTaxi);
exports.MotoTaxi = MotoTaxi;
//# sourceMappingURL=MotoTaxi.js.map