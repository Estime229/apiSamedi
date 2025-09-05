import { MigrationInterface, QueryRunner } from 'typeorm';

export class Use2Migration1757073462954 implements MigrationInterface {
  name = 'Use2Migration1757073462954';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "userUrl" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userUrl"`);
  }
}
