import { MigrationInterface, QueryRunner } from 'typeorm';

export class GrpMigration41756740820320 implements MigrationInterface {
  name = 'GrpMigration41756740820320';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Only alter when table exists (idempotent on fresh databases)
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = 'group'
        ) THEN
          BEGIN
            ALTER TABLE "group" DROP COLUMN IF EXISTS "groupState";
          EXCEPTION WHEN undefined_table THEN
            -- ignore
          END;

          DROP TYPE IF EXISTS "public"."group_groupstate_enum";
          CREATE TYPE "public"."group_groupstate_enum" AS ENUM('open', 'close', 'private');
          ALTER TABLE "group" ADD COLUMN IF NOT EXISTS "groupState" "public"."group_groupstate_enum" array;
        END IF;
      END
      $$;
    `);
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
