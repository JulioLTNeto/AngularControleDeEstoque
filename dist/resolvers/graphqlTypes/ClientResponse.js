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
exports.ClientResponse = void 0;
const Client_1 = require("../../entity/Client");
const type_graphql_1 = require("type-graphql");
const fieldError_1 = require("./fieldError");
let ClientResponse = class ClientResponse {
};
__decorate([
    type_graphql_1.Field(() => [fieldError_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], ClientResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => Client_1.Client, { nullable: true }),
    __metadata("design:type", Client_1.Client)
], ClientResponse.prototype, "client", void 0);
ClientResponse = __decorate([
    type_graphql_1.ObjectType()
], ClientResponse);
exports.ClientResponse = ClientResponse;
//# sourceMappingURL=ClientResponse.js.map