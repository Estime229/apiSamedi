import { MigrationInterface, QueryRunner } from "typeorm";

export class UpeMigration1757068347874 implements MigrationInterface {
    name = 'UpeMigration1757068347874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member" ALTER COLUMN "requestState" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "group" ALTER COLUMN "groupName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "UQ_d563ab71da3b1c915123601cb05"`);
        await queryRunner.query(`ALTER TABLE "group" ALTER COLUMN "groupDesc" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "UQ_542bcafd2ca11fa4182f30431e3"`);
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "UQ_6db3a511a8484aa23634c5e0d29"`);
        await queryRunner.query(`ALTER TABLE "group" ALTER COLUMN "groupState" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" ALTER COLUMN "groupState" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "UQ_6db3a511a8484aa23634c5e0d29" UNIQUE ("groupCategory")`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "UQ_542bcafd2ca11fa4182f30431e3" UNIQUE ("groupDesc")`);
        await queryRunner.query(`ALTER TABLE "group" ALTER COLUMN "groupDesc" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "UQ_d563ab71da3b1c915123601cb05" UNIQUE ("groupName")`);
        await queryRunner.query(`ALTER TABLE "group" ALTER COLUMN "groupName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "member" ALTER COLUMN "requestState" DROP NOT NULL`);
    }

}
