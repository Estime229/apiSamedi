import { MigrationInterface, QueryRunner } from 'typeorm';

export class NomDeLaMigration1758293315610 implements MigrationInterface {
  name = 'NomDeLaMigration1758293315610';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "title" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "body" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "body" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "title" SET NOT NULL`,
    );
  }
}
