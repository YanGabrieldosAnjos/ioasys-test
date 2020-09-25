import {MigrationInterface, QueryRunner} from "typeorm";

export class allTables1601003229361 implements MigrationInterface {
    name = 'allTables1601003229361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "actors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_d8608598c2c4f907a78de2ae461" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "username" text NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "is_admin" boolean NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "votes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" TIMESTAMP, "score" integer NOT NULL, "user_id" uuid, "movie_id" uuid, CONSTRAINT "REL_27be2cab62274f6876ad6a3164" UNIQUE ("user_id"), CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "genre" character varying NOT NULL, "synopsis" character varying NOT NULL, "director" character varying NOT NULL, CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movies_actors_actors" ("movies_id" uuid NOT NULL, "actors_id" uuid NOT NULL, CONSTRAINT "PK_5eaa28626401706f55f30b1a87a" PRIMARY KEY ("movies_id", "actors_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_64a229c89b66aa13fff34e0f0d" ON "movies_actors_actors" ("movies_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4184bc8ae647d58ed5a64c3d80" ON "movies_actors_actors" ("actors_id") `);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_27be2cab62274f6876ad6a31641" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_bd941f763560c3c4400366467f8" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movies_actors_actors" ADD CONSTRAINT "FK_64a229c89b66aa13fff34e0f0d6" FOREIGN KEY ("movies_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movies_actors_actors" ADD CONSTRAINT "FK_4184bc8ae647d58ed5a64c3d802" FOREIGN KEY ("actors_id") REFERENCES "actors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies_actors_actors" DROP CONSTRAINT "FK_4184bc8ae647d58ed5a64c3d802"`);
        await queryRunner.query(`ALTER TABLE "movies_actors_actors" DROP CONSTRAINT "FK_64a229c89b66aa13fff34e0f0d6"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_bd941f763560c3c4400366467f8"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_27be2cab62274f6876ad6a31641"`);
        await queryRunner.query(`DROP INDEX "IDX_4184bc8ae647d58ed5a64c3d80"`);
        await queryRunner.query(`DROP INDEX "IDX_64a229c89b66aa13fff34e0f0d"`);
        await queryRunner.query(`DROP TABLE "movies_actors_actors"`);
        await queryRunner.query(`DROP TABLE "movies"`);
        await queryRunner.query(`DROP TABLE "votes"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "actors"`);
    }

}
