import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./orders.entity";
import { OrderDetail } from "./orderDetails.entity";
import { OrdersRepository } from "./orders.repository";
import { User } from "../users/users.entity";
import { Product } from "../products/products.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, OrderDetail, User, Product])
    ],
    providers: [OrdersService, OrdersRepository],
    controllers: [OrdersController]
})
export class OrdersModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        // ...
    }
}