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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentResolver = void 0;
const isClient_1 = require("../middleware/isClient");
const stripe_1 = require("../stripe");
const type_graphql_1 = require("type-graphql");
const Client_1 = require("../entity/Client");
const Run_1 = require("../entity/Run");
require("dotenv/config");
class PaymentResolver {
    createPayment({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield Client_1.Client.findOne({ where: { id: req.session.userId } });
            console.log(client);
            if (!client) {
                throw new Error("Something happened and we couldnt find a client");
            }
            const session = yield stripe_1.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: `${process.env.RUN_BASIC_PRICE_ID}`,
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${process.env.MY_DOMAIN}/payment_success`,
                cancel_url: `${process.env.MY_DOMAIN}/payment_failed`,
            });
            return session.url;
        });
    }
    successfulPayment({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield Client_1.Client.findOne({ where: { id: req.session.userId } });
            if (!client) {
                throw new Error("Something happened and we couldnt find a client");
            }
            const run = yield Run_1.Run.findOne({
                where: {
                    client: client,
                    runStatus: Run_1.RunStatus.CLOSED,
                    runPaymentStatus: Run_1.RunPaymentStatus.NOT_PAID
                }
            });
            if (!run) {
                throw new Error("Run in question does not exist");
            }
            run.runPaymentStatus = Run_1.RunPaymentStatus.PAID;
            run.save;
            return true;
        });
    }
}
__decorate([
    type_graphql_1.Mutation(() => String),
    type_graphql_1.UseMiddleware(isClient_1.isClient),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "createPayment", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isClient_1.isClient),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "successfulPayment", null);
exports.PaymentResolver = PaymentResolver;
//# sourceMappingURL=payementResolver.js.map