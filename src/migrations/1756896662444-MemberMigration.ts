import { MigrationInterface, QueryRunner } from 'typeorm';

export class MemberMigration1756896662444 implements MigrationInterface {
  name = 'MemberMigration1756896662444';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."member_requeststate_enum" AS ENUM('WAITING', 'REJECTED', 'ACCEPTED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "message" character varying, "requestState" "public"."member_requeststate_enum" array, "userId" uuid, "groupId" uuid, CONSTRAINT "UQ_35f74ca4273a5f221351e47352a" UNIQUE ("message"), CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "member" ADD CONSTRAINT "FK_08897b166dee565859b7fb2fcc8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "member" ADD CONSTRAINT "FK_1fee827e34a9a032a93cb9d56e3" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member" DROP CONSTRAINT "FK_1fee827e34a9a032a93cb9d56e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "member" DROP CONSTRAINT "FK_08897b166dee565859b7fb2fcc8"`,
    );
    await queryRunner.query(`DROP TABLE "member"`);
    await queryRunner.query(`DROP TYPE "public"."member_requeststate_enum"`);
  }
}
