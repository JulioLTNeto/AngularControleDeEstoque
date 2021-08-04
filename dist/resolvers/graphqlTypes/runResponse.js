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
exports.RunResponse = void 0;
const Run_1 = require("../../entity/Run");
const type_graphql_1 = require("type-graphql");
const runError_1 = require("./runError");
let RunResponse = class RunResponse {
};
__decorate([
    type_graphql_1.Field(() => [runError_1.RunError], { nullable: true }),
    __metadata("design:type", Array)
], RunResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => Run_1.Run, { nullable: true }),
    __metadata("design:type", Run_1.Run)
], RunResponse.prototype, "run", void 0);
RunResponse = __decorate([
    type_graphql_1.ObjectType()
], RunResponse);
exports.RunResponse = RunResponse;
//# sourceMappingURL=runResponse.js.map