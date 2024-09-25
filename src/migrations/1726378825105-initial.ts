import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1726378825105 implements MigrationInterface {
    name = 'Initial1726378825105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "stock" numeric NOT NULL, "imgUrl" character varying NOT NULL DEFAULT 'https://cibernovedades.com/wp-content/uploads/image-787-1024x576.png', "categoryId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ordersDetail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_382609ae3b68c9e917ea7350a4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "userId" uuid, "orderDetailId" uuid, CONSTRAINT "REL_749e30f71cc0d2d95f8546f459" UNIQUE ("orderDetailId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(20) NOT NULL, "phone" numeric NOT NULL, "country" character varying(50) NOT NULL, "address" character varying NOT NULL, "city" character varying(50) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_order_details_orders_detail" ("productsId" uuid NOT NULL, "ordersDetailId" uuid NOT NULL, CONSTRAINT "PK_901eeadbc7d2a615280196b0d3e" PRIMARY KEY ("productsId", "ordersDetailId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3bb8147b3b50caaea52cbf949d" ON "products_order_details_orders_detail" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7e28958413484f1b9ec93d73cf" ON "products_order_details_orders_detail" ("ordersDetailId") `);
        await queryRunner.query(`CREATE TABLE "orders_detail_products_products" ("ordersDetailId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_621df35ca59600efa4c4aa6687f" PRIMARY KEY ("ordersDetailId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9d171499505cd4a850efee541d" ON "orders_detail_products_products" ("ordersDetailId") `);
        await queryRunner.query(`CREATE INDEX "IDX_82107bcf856b8ff5c051fe6add" ON "orders_detail_products_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592" FOREIGN KEY ("orderDetailId") REFERENCES "ordersDetail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_order_details_orders_detail" ADD CONSTRAINT "FK_3bb8147b3b50caaea52cbf949de" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_order_details_orders_detail" ADD CONSTRAINT "FK_7e28958413484f1b9ec93d73cf6" FOREIGN KEY ("ordersDetailId") REFERENCES "ordersDetail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_detail_products_products" ADD CONSTRAINT "FK_9d171499505cd4a850efee541db" FOREIGN KEY ("ordersDetailId") REFERENCES "ordersDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_detail_products_products" ADD CONSTRAINT "FK_82107bcf856b8ff5c051fe6add2" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_detail_products_products" DROP CONSTRAINT "FK_82107bcf856b8ff5c051fe6add2"`);
        await queryRunner.query(`ALTER TABLE "orders_detail_products_products" DROP CONSTRAINT "FK_9d171499505cd4a850efee541db"`);
        await queryRunner.query(`ALTER TABLE "products_order_details_orders_detail" DROP CONSTRAINT "FK_7e28958413484f1b9ec93d73cf6"`);
        await queryRunner.query(`ALTER TABLE "products_order_details_orders_detail" DROP CONSTRAINT "FK_3bb8147b3b50caaea52cbf949de"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_82107bcf856b8ff5c051fe6add"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9d171499505cd4a850efee541d"`);
        await queryRunner.query(`DROP TABLE "orders_detail_products_products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7e28958413484f1b9ec93d73cf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3bb8147b3b50caaea52cbf949d"`);
        await queryRunner.query(`DROP TABLE "products_order_details_orders_detail"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "ordersDetail"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
