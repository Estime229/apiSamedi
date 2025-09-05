import { MigrationInterface, QueryRunner } from 'typeorm';

export class Use3Migration1757073497456 implements MigrationInterface {
  name = 'Use3Migration1757073497456';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" ADD "postUrl" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "postUrl"`);
  }
}
