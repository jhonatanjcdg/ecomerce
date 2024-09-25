import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Category } from "../categories/categorys.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, Category])
    ],
    exports: [ProductsRepository, ProductsService],
    providers: [
        ProductsService,
        ProductsRepository,
    ],
    controllers: [ProductsController]
})
export class ProductsModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        // ...
    }
}