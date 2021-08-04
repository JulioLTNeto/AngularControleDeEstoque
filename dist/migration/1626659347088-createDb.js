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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDb1626659347088 = void 0;
class createDb1626659347088 {
    constructor() {
        this.name = 'createDb1626659347088';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("CREATE TABLE `moto_taxi` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `userName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `cpf` varchar(255) NOT NULL, `hashed_password` varchar(255) NOT NULL, `photo` varchar(255) NULL, `phone` varchar(255) NOT NULL, `score` int NOT NULL DEFAULT '3', `status` int NOT NULL, `registrationNumber` varchar(255) NOT NULL, `liscensePlate` varchar(255) NOT NULL, UNIQUE INDEX `IDX_91cc34094a95bc21d339f78004` (`userName`), UNIQUE INDEX `IDX_81880abb9aff96712658270959` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `run` (`id` int NOT NULL AUTO_INCREMENT, `acceptedAt` datetime NOT NULL, `price` int NOT NULL, `runType` int NOT NULL, `runStatus` int NOT NULL, `clientId` int NULL, `motoTaxiId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `client` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `userName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `cpf` varchar(255) NOT NULL, `hashed_password` varchar(255) NOT NULL, `photo` varchar(255) NULL, `phone` varchar(255) NOT NULL, `score` int NOT NULL DEFAULT '3', `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_0cc2d0b096a06409b80d5c2542` (`userName`), UNIQUE INDEX `IDX_6436cc6b79593760b9ef921ef1` (`email`), UNIQUE INDEX `IDX_9921dca81551c93e5a459ef03c` (`cpf`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
            yield queryRunner.query("ALTER TABLE `run` ADD CONSTRAINT `FK_16e1bdc0854edd47129bded89d3` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE");
            yield queryRunner.query("ALTER TABLE `run` ADD CONSTRAINT `FK_eaa852ef16e7577b94a17d3d6f6` FOREIGN KEY (`motoTaxiId`) REFERENCES `moto_taxi`(`id`) ON DELETE SET NULL ON UPDATE CASCADE");
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("ALTER TABLE `run` DROP FOREIGN KEY `FK_eaa852ef16e7577b94a17d3d6f6`");
            yield queryRunner.query("ALTER TABLE `run` DROP FOREIGN KEY `FK_16e1bdc0854edd47129bded89d3`");
            yield queryRunner.query("DROP INDEX `IDX_9921dca81551c93e5a459ef03c` ON `client`");
            yield queryRunner.query("DROP INDEX `IDX_6436cc6b79593760b9ef921ef1` ON `client`");
            yield queryRunner.query("DROP INDEX `IDX_0cc2d0b096a06409b80d5c2542` ON `client`");
            yield queryRunner.query("DROP TABLE `client`");
            yield queryRunner.query("DROP TABLE `run`");
            yield queryRunner.query("DROP INDEX `IDX_81880abb9aff96712658270959` ON `moto_taxi`");
            yield queryRunner.query("DROP INDEX `IDX_91cc34094a95bc21d339f78004` ON `moto_taxi`");
            yield queryRunner.query("DROP TABLE `moto_taxi`");
        });
    }
}
exports.createDb1626659347088 = createDb1626659347088;
//# sourceMappingURL=1626659347088-createDb.js.map