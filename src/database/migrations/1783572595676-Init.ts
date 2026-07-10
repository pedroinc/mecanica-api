import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1783572595676 implements MigrationInterface {
    name = 'Init1783572595676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicle_brands" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_d7a9a7fe16791a075d6c4f9bf56" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "vehicle_models" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "vehicle_brand_id" varchar, CONSTRAINT "UQ_b6e982603c76ca9764626c7852d" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "repair_item_tasks" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text, "price" decimal(10,2), "discount" decimal(10,2), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "repair_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "repair_item_parts" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text, "num_items" smallint, "price_authentic" decimal(10,2), "price_not_authentic" decimal(10,2), "use_authentic" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "repair_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "repairs" ("id" varchar PRIMARY KEY NOT NULL, "description" text, "discount" decimal(10,2) NOT NULL DEFAULT (0), "total" decimal(10,2) DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "vehicle_id" varchar, "customer_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" varchar PRIMARY KEY NOT NULL, "plate" varchar NOT NULL, "name" varchar, "vin" varchar, "model_year" integer, "factory_year" integer, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "customer_id" varchar, "vehicle_model_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar, "phone" varchar, "cellphone" varchar, "email" varchar, "date_of_birth" datetime, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "temporary_vehicle_models" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "vehicle_brand_id" varchar, CONSTRAINT "UQ_b6e982603c76ca9764626c7852d" UNIQUE ("name"), CONSTRAINT "FK_b8f74f8091616bbedf5be859e1a" FOREIGN KEY ("vehicle_brand_id") REFERENCES "vehicle_brands" ("id") ON DELETE SET NULL ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_vehicle_models"("id", "name", "created_at", "updated_at", "vehicle_brand_id") SELECT "id", "name", "created_at", "updated_at", "vehicle_brand_id" FROM "vehicle_models"`);
        await queryRunner.query(`DROP TABLE "vehicle_models"`);
        await queryRunner.query(`ALTER TABLE "temporary_vehicle_models" RENAME TO "vehicle_models"`);
        await queryRunner.query(`CREATE TABLE "temporary_repair_item_tasks" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text, "price" decimal(10,2), "discount" decimal(10,2), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "repair_id" varchar, CONSTRAINT "FK_7a456d00055f14ac050de835c67" FOREIGN KEY ("repair_id") REFERENCES "repairs" ("id") ON DELETE SET NULL ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_repair_item_tasks"("id", "name", "description", "price", "discount", "created_at", "updated_at", "repair_id") SELECT "id", "name", "description", "price", "discount", "created_at", "updated_at", "repair_id" FROM "repair_item_tasks"`);
        await queryRunner.query(`DROP TABLE "repair_item_tasks"`);
        await queryRunner.query(`ALTER TABLE "temporary_repair_item_tasks" RENAME TO "repair_item_tasks"`);
        await queryRunner.query(`CREATE TABLE "temporary_repair_item_parts" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text, "num_items" smallint, "price_authentic" decimal(10,2), "price_not_authentic" decimal(10,2), "use_authentic" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "repair_id" varchar, CONSTRAINT "FK_bb0704d638c1fbf303ae9059945" FOREIGN KEY ("repair_id") REFERENCES "repairs" ("id") ON DELETE SET NULL ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_repair_item_parts"("id", "name", "description", "num_items", "price_authentic", "price_not_authentic", "use_authentic", "created_at", "updated_at", "repair_id") SELECT "id", "name", "description", "num_items", "price_authentic", "price_not_authentic", "use_authentic", "created_at", "updated_at", "repair_id" FROM "repair_item_parts"`);
        await queryRunner.query(`DROP TABLE "repair_item_parts"`);
        await queryRunner.query(`ALTER TABLE "temporary_repair_item_parts" RENAME TO "repair_item_parts"`);
        await queryRunner.query(`CREATE TABLE "temporary_repairs" ("id" varchar PRIMARY KEY NOT NULL, "description" text, "discount" decimal(10,2) NOT NULL DEFAULT (0), "total" decimal(10,2) DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "vehicle_id" varchar, "customer_id" varchar, CONSTRAINT "FK_dc1e6dc65d8ac19c98e77abc7a3" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles" ("id") ON DELETE SET NULL ON UPDATE CASCADE, CONSTRAINT "FK_aa24dfebae0f307ca361e6252a2" FOREIGN KEY ("customer_id") REFERENCES "customers" ("id") ON DELETE SET NULL ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_repairs"("id", "description", "discount", "total", "created_at", "updated_at", "vehicle_id", "customer_id") SELECT "id", "description", "discount", "total", "created_at", "updated_at", "vehicle_id", "customer_id" FROM "repairs"`);
        await queryRunner.query(`DROP TABLE "repairs"`);
        await queryRunner.query(`ALTER TABLE "temporary_repairs" RENAME TO "repairs"`);
        await queryRunner.query(`CREATE TABLE "temporary_vehicles" ("id" varchar PRIMARY KEY NOT NULL, "plate" varchar NOT NULL, "name" varchar, "vin" varchar, "model_year" integer, "factory_year" integer, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "customer_id" varchar, "vehicle_model_id" varchar, CONSTRAINT "FK_c1cda98f67cb9c79a1f1153e627" FOREIGN KEY ("customer_id") REFERENCES "customers" ("id") ON DELETE SET NULL ON UPDATE CASCADE, CONSTRAINT "FK_0cf2b97124eb0eb2b0c97f3814d" FOREIGN KEY ("vehicle_model_id") REFERENCES "vehicle_models" ("id") ON DELETE SET NULL ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_vehicles"("id", "plate", "name", "vin", "model_year", "factory_year", "created_at", "updated_at", "customer_id", "vehicle_model_id") SELECT "id", "plate", "name", "vin", "model_year", "factory_year", "created_at", "updated_at", "customer_id", "vehicle_model_id" FROM "vehicles"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`ALTER TABLE "temporary_vehicles" RENAME TO "vehicles"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" RENAME TO "temporary_vehicles"`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" varchar PRIMARY KEY NOT NULL, "plate" varchar NOT NULL, "name" varchar, "vin" varchar, "model_year" integer, "factory_year" integer, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "customer_id" varchar, "vehicle_model_id" varchar)`);
        await queryRunner.query(`INSERT INTO "vehicles"("id", "plate", "name", "vin", "model_year", "factory_year", "created_at", "updated_at", "customer_id", "vehicle_model_id") SELECT "id", "plate", "name", "vin", "model_year", "factory_year", "created_at", "updated_at", "customer_id", "vehicle_model_id" FROM "temporary_vehicles"`);
        await queryRunner.query(`DROP TABLE "temporary_vehicles"`);
        await queryRunner.query(`ALTER TABLE "repairs" RENAME TO "temporary_repairs"`);
        await queryRunner.query(`CREATE TABLE "repairs" ("id" varchar PRIMARY KEY NOT NULL, "description" text, "discount" decimal(10,2) NOT NULL DEFAULT (0), "total" decimal(10,2) DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "vehicle_id" varchar, "customer_id" varchar)`);
        await queryRunner.query(`INSERT INTO "repairs"("id", "description", "discount", "total", "created_at", "updated_at", "vehicle_id", "customer_id") SELECT "id", "description", "discount", "total", "created_at", "updated_at", "vehicle_id", "customer_id" FROM "temporary_repairs"`);
        await queryRunner.query(`DROP TABLE "temporary_repairs"`);
        await queryRunner.query(`ALTER TABLE "repair_item_parts" RENAME TO "temporary_repair_item_parts"`);
        await queryRunner.query(`CREATE TABLE "repair_item_parts" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text, "num_items" smallint, "price_authentic" decimal(10,2), "price_not_authentic" decimal(10,2), "use_authentic" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "repair_id" varchar)`);
        await queryRunner.query(`INSERT INTO "repair_item_parts"("id", "name", "description", "num_items", "price_authentic", "price_not_authentic", "use_authentic", "created_at", "updated_at", "repair_id") SELECT "id", "name", "description", "num_items", "price_authentic", "price_not_authentic", "use_authentic", "created_at", "updated_at", "repair_id" FROM "temporary_repair_item_parts"`);
        await queryRunner.query(`DROP TABLE "temporary_repair_item_parts"`);
        await queryRunner.query(`ALTER TABLE "repair_item_tasks" RENAME TO "temporary_repair_item_tasks"`);
        await queryRunner.query(`CREATE TABLE "repair_item_tasks" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text, "price" decimal(10,2), "discount" decimal(10,2), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "repair_id" varchar)`);
        await queryRunner.query(`INSERT INTO "repair_item_tasks"("id", "name", "description", "price", "discount", "created_at", "updated_at", "repair_id") SELECT "id", "name", "description", "price", "discount", "created_at", "updated_at", "repair_id" FROM "temporary_repair_item_tasks"`);
        await queryRunner.query(`DROP TABLE "temporary_repair_item_tasks"`);
        await queryRunner.query(`ALTER TABLE "vehicle_models" RENAME TO "temporary_vehicle_models"`);
        await queryRunner.query(`CREATE TABLE "vehicle_models" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "vehicle_brand_id" varchar, CONSTRAINT "UQ_b6e982603c76ca9764626c7852d" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "vehicle_models"("id", "name", "created_at", "updated_at", "vehicle_brand_id") SELECT "id", "name", "created_at", "updated_at", "vehicle_brand_id" FROM "temporary_vehicle_models"`);
        await queryRunner.query(`DROP TABLE "temporary_vehicle_models"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TABLE "repairs"`);
        await queryRunner.query(`DROP TABLE "repair_item_parts"`);
        await queryRunner.query(`DROP TABLE "repair_item_tasks"`);
        await queryRunner.query(`DROP TABLE "vehicle_models"`);
        await queryRunner.query(`DROP TABLE "vehicle_brands"`);
    }

}
