import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./categorys.entity";
import { CategoriesService } from "./category.service";
import { CategoriesController } from "./categoty.controller";
import { CategoriesRepository } from "./category.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Category])
    ],
    providers: [CategoriesService, CategoriesRepository],
    controllers: [CategoriesController],
})
export class CategoriesModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        
    }
}