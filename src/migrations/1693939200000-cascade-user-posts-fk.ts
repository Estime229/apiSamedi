import { MigrationInterface, QueryRunner } from 'typeorm';

export class CascadeUserPostsFK1693939200000 implements MigrationInterface {
  name = 'CascadeUserPostsFK1693939200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Supprimer l'ancienne contrainte
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT IF EXISTS "FK_ae05faaa55c866130abef6e1fee"`,
    );
    // Ajouter la nouvelle contrainte avec ON DELETE CASCADE
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Supprimer la contrainte cascade
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT IF EXISTS "FK_ae05faaa55c866130abef6e1fee"`,
    );
    // Remettre la contrainte sans cascade (comportement par défaut)
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id")`,
    );
  }
}
