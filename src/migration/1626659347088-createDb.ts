import {MigrationInterface, QueryRunner} from "typeorm";

export class createDb1626659347088 implements MigrationInterface {
    name = 'createDb1626659347088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `moto_taxi` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `userName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `cpf` varchar(255) NOT NULL, `hashed_password` varchar(255) NOT NULL, `photo` varchar(255) NULL, `phone` varchar(255) NOT NULL, `score` int NOT NULL DEFAULT '3', `status` int NOT NULL, `registrationNumber` varchar(255) NOT NULL, `liscensePlate` varchar(255) NOT NULL, UNIQUE INDEX `IDX_91cc34094a95bc21d339f78004` (`userName`), UNIQUE INDEX `IDX_81880abb9aff96712658270959` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `run` (`id` int NOT NULL AUTO_INCREMENT, `acceptedAt` datetime NOT NULL, `price` int NOT NULL, `runType` int NOT NULL, `runStatus` int NOT NULL, `clientId` int NULL, `motoTaxiId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `client` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `userName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `cpf` varchar(255) NOT NULL, `hashed_password` varchar(255) NOT NULL, `photo` varchar(255) NULL, `phone` varchar(255) NOT NULL, `score` int NOT NULL DEFAULT '3', `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_0cc2d0b096a06409b80d5c2542` (`userName`), UNIQUE INDEX `IDX_6436cc6b79593760b9ef921ef1` (`email`), UNIQUE INDEX `IDX_9921dca81551c93e5a459ef03c` (`cpf`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `run` ADD CONSTRAINT `FK_16e1bdc0854edd47129bded89d3` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `run` ADD CONSTRAINT `FK_eaa852ef16e7577b94a17d3d6f6` FOREIGN KEY (`motoTaxiId`) REFERENCES `moto_taxi`(`id`) ON DELETE SET NULL ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `run` DROP FOREIGN KEY `FK_eaa852ef16e7577b94a17d3d6f6`");
        await queryRunner.query("ALTER TABLE `run` DROP FOREIGN KEY `FK_16e1bdc0854edd47129bded89d3`");
        await queryRunner.query("DROP INDEX `IDX_9921dca81551c93e5a459ef03c` ON `client`");
        await queryRunner.query("DROP INDEX `IDX_6436cc6b79593760b9ef921ef1` ON `client`");
        await queryRunner.query("DROP INDEX `IDX_0cc2d0b096a06409b80d5c2542` ON `client`");
        await queryRunner.query("DROP TABLE `client`");
        await queryRunner.query("DROP TABLE `run`");
        await queryRunner.query("DROP INDEX `IDX_81880abb9aff96712658270959` ON `moto_taxi`");
        await queryRunner.query("DROP INDEX `IDX_91cc34094a95bc21d339f78004` ON `moto_taxi`");
        await queryRunner.query("DROP TABLE `moto_taxi`");
    }

}
