import { MigrationInterface, QueryRunner } from 'typeorm';

export class Use4Migration1757073567826 implements MigrationInterface {
  name = 'Use4Migration1757073567826';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group" ADD "groupUrl" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "groupUrl"`);
  }
}
