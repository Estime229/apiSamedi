import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueSolution1757323895715 implements MigrationInterface {
  name = 'UniqueSolution1757323895715';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT IF EXISTS "UQ_2d82eb2bb2ddd7a6bfac8804d8a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT IF EXISTS "UQ_94b56178360da19356575fc6a08"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "UQ_2d82eb2bb2ddd7a6bfac8804d8a" UNIQUE ("title")`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "UQ_94b56178360da19356575fc6a08" UNIQUE ("body")`,
    );
  }
}
