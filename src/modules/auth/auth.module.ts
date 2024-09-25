import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersRepository } from "../users/users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IAuth } from "./Auth.interface";
import { UsersService } from "../users/users.service";
import { UsersModule } from "../users/users.module";
import { User } from "../users/users.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([IAuth, User]),
        UsersModule,
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        // ...
    }
}