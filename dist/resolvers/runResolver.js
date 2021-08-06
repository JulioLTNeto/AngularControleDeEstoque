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
exports.RunResolver = void 0;
const isMotoTaxi_1 = require("../middleware/isMotoTaxi");
const isClient_1 = require("../middleware/isClient");
const type_graphql_1 = require("type-graphql");
const Run_1 = require("../entity/Run");
const MotoTaxi_1 = require("../entity/MotoTaxi");
const Client_1 = require("../entity/Client");
const runResponse_1 = require("./graphqlTypes/runResponse");
const typeorm_1 = require("typeorm");
class RunResolver {
    getAllRuns(_ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Run_1.Run.find();
        });
    }
    getAllRunsByMotoTaxi({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const runMotoTaxi = yield MotoTaxi_1.MotoTaxi.findOne({ where: { id: req.session.userId } });
            if (!runMotoTaxi) {
                return [];
            }
            return yield Run_1.Run.find({ where: { motoTaxi: runMotoTaxi } });
        });
    }
    createRun({ req }, motoTaxiId, runType) {
        return __awaiter(this, void 0, void 0, function* () {
            const runMotoTaxi = yield MotoTaxi_1.MotoTaxi.findOne({ where: { id: motoTaxiId } });
            if (!runMotoTaxi) {
                return {
                    errors: [{
                            message: "This Moto Taxi does not exist"
                        }]
                };
            }
            const runClient = yield Client_1.Client.findOne({ where: { id: req.session.userId } });
            if (!runClient) {
                return {
                    errors: [{
                            message: "This user does not exist"
                        }]
                };
            }
            if (yield Run_1.Run.findOne({
                where: {
                    client: runClient,
                    runStatus: Run_1.RunStatus.OPEN
                }
            })) {
                return {
                    errors: [{
                            message: "User already has a run in progress"
                        }]
                };
            }
            if (yield Run_1.Run.findOne({
                where: {
                    client: runClient,
                    runPaymentStatus: Run_1.RunPaymentStatus.NOT_PAID
                }
            })) {
                return {
                    errors: [{
                            message: "User has a run not paid"
                        }]
                };
            }
            if (yield Run_1.Run.findOne({
                where: {
                    client: runClient,
                    runStatus: Run_1.RunPaymentStatus.NOT_PAID
                }
            })) {
                return {
                    errors: [{
                            message: "User already has a run that was not paid"
                        }]
                };
            }
            let result;
            try {
                result = yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(Run_1.Run)
                    .values({
                    client: runClient,
                    motoTaxi: runMotoTaxi,
                    runType: runType
                })
                    .execute();
            }
            catch (error) {
                throw new Error("Something happened, we couldn't save run on the database");
            }
            return {
                run: yield Run_1.Run.findOne({ where: { id: result.raw.insertId } })
            };
        });
    }
    updateRunStatus({ req }, runId) {
        return __awaiter(this, void 0, void 0, function* () {
            let run = yield Run_1.Run.findOne({ where: { id: runId, runStatus: Run_1.RunStatus.PENDING } });
            if (!run) {
                run = yield Run_1.Run.findOne({ where: { id: runId, runStatus: Run_1.RunStatus.OPEN } });
            }
            if (!run) {
                return {
                    errors: [{
                            message: "This run does not exist"
                        }]
                };
            }
            const runCLient = yield Client_1.Client.findOne({ where: { id: req.session.userId } });
            if (!runCLient) {
                return {
                    errors: [{
                            message: "The client associated with this run does not exist"
                        }]
                };
            }
            console.log(runCLient);
            run.client = runCLient;
            if (run.runStatus === Run_1.RunStatus.PENDING) {
                console.log('here');
                run.runStatus = Run_1.RunStatus.OPEN;
                run.save();
            }
            else if (run.runStatus === Run_1.RunStatus.OPEN) {
                run.runStatus = Run_1.RunStatus.CLOSED;
                run.save();
            }
            return {
                run: run
            };
        });
    }
    acceptRun({ req }, runId) {
        return __awaiter(this, void 0, void 0, function* () {
            let run = yield Run_1.Run.findOne({ where: { id: runId, runStatus: Run_1.RunStatus.PENDING } });
            if (!run) {
                run = yield Run_1.Run.findOne({ where: { id: runId, runStatus: Run_1.RunStatus.OPEN } });
            }
            if (!run) {
                return {
                    errors: [{
                            message: "This run does not exist"
                        }]
                };
            }
            const runMotoTaxi = yield MotoTaxi_1.MotoTaxi.findOne({ where: { id: req.session.userId } });
            if (!runMotoTaxi) {
                return {
                    errors: [{
                            message: "The Moto Taxi associated with this run does not exist"
                        }]
                };
            }
            console.log(runMotoTaxi);
            run.motoTaxi = runMotoTaxi;
            if (run.runStatus === Run_1.RunStatus.PENDING) {
                console.log('here');
                run.runStatus = Run_1.RunStatus.OPEN;
                run.save();
            }
            return {
                run: run
            };
        });
    }
}
__decorate([
    type_graphql_1.Query(() => [Run_1.Run]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RunResolver.prototype, "getAllRuns", null);
__decorate([
    type_graphql_1.Query(() => [Run_1.Run]),
    type_graphql_1.UseMiddleware(isMotoTaxi_1.isMotoTaxi),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RunResolver.prototype, "getAllRunsByMotoTaxi", null);
__decorate([
    type_graphql_1.Mutation(() => runResponse_1.RunResponse),
    type_graphql_1.UseMiddleware(isClient_1.isClient),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('motoTaxiId', () => String)),
    __param(2, type_graphql_1.Arg('runType', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], RunResolver.prototype, "createRun", null);
__decorate([
    type_graphql_1.Mutation(() => runResponse_1.RunResponse),
    type_graphql_1.UseMiddleware(isClient_1.isClient),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('runId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RunResolver.prototype, "updateRunStatus", null);
__decorate([
    type_graphql_1.Mutation(() => runResponse_1.RunResponse),
    type_graphql_1.UseMiddleware(isMotoTaxi_1.isMotoTaxi),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('runId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RunResolver.prototype, "acceptRun", null);
exports.RunResolver = RunResolver;
//# sourceMappingURL=runResolver.js.map