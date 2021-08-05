"use strict";
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
exports.seedDb = void 0;
require("reflect-metadata");
const Client_1 = require("./entity/Client");
const argon2_1 = __importDefault(require("argon2"));
const MotoTaxi_1 = require("./entity/MotoTaxi");
const Run_1 = require("./entity/Run");
function seedDb(conn) {
    return __awaiter(this, void 0, void 0, function* () {
        conn.manager.delete(Client_1.Client, { cpf: '08559529462' });
        conn.manager.delete(MotoTaxi_1.MotoTaxi, { cpf: '11111111111' });
        conn.manager.delete(Run_1.Run, { price: 5.75 });
        const newClient = new Client_1.Client();
        newClient.cpf = '08559529462';
        newClient.name = 'Roque client';
        newClient.userName = 'Roque Client Username';
        newClient.phone = '82996002634';
        newClient.hashed_password = yield argon2_1.default.hash('some bulshit password');
        conn.manager.save(newClient);
        const newMotoTaxi = new MotoTaxi_1.MotoTaxi();
        newMotoTaxi.cpf = '11111111111';
        newMotoTaxi.name = 'Roque Moto Taxi';
        newMotoTaxi.phone = '11111111111';
        newMotoTaxi.hashed_password = yield argon2_1.default.hash('another hash password');
        newMotoTaxi.registrationNumber = '125478';
        newMotoTaxi.status = MotoTaxi_1.MotoTaxiStatus.AVAILABLE;
        conn.manager.save(newMotoTaxi);
        const newRun = new Run_1.Run();
        newRun.client = newClient;
        newRun.motoTaxi = newMotoTaxi;
        newRun.price = 5.75;
        newRun.acceptedAt = new Date();
        newRun.runStatus = Run_1.RunStatus.OPEN;
        newRun.runType = Run_1.RunType.TAXI;
        conn.manager.save(newRun);
    });
}
exports.seedDb = seedDb;
//# sourceMappingURL=seed.js.map