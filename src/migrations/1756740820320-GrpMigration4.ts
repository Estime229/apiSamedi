import { MigrationInterface, QueryRunner } from 'typeorm';

export class GrpMigration41756740820320 implements MigrationInterface {
  name = 'GrpMigration41756740820320';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "groupState"`);
    await queryRunner.query(
      `DROP TYPE IF EXISTS "public"."group_groupstate_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."group_groupstate_enum" AS ENUM('open', 'close', 'private')`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ADD "groupState" "public"."group_groupstate_enum" array`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "groupState"`);
    await queryRunner.query(
      `DROP TYPE IF EXISTS "public"."group_groupstate_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."group_groupstate_enum" AS ENUM('open', 'close', 'private')`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ADD "groupState" "public"."group_groupstate_enum"`,
    );
  }
}
