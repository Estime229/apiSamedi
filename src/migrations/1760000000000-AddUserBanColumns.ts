import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserBanColumns1760000000000 implements MigrationInterface {
  name = 'AddUserBanColumns1760000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN "banned" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "banReason" text`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN "bannedAt" timestamptz`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bannedAt"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "banReason"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "banned"`);
  }
}
