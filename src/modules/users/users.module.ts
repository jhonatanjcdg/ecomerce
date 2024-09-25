import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    exports: [UsersRepository],
    providers: [
        UsersService,
        UsersRepository,
    ],
    controllers: [UsersController]
})
export class UsersModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        // Middleware privado, solo de users
    }
}