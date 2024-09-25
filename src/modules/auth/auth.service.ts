import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/users.entity";
import { Repository } from "typeorm";
import { LoginUserDto } from "./LoginUser.dto";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../users/CreateUser.dto";
import { Rol } from "src/roles.enum";

@Injectable()
export class AuthService{
    constructor(
        private usersRepository: UsersRepository,
        private readonly jwtService: JwtService
    ){

    }

    async getAuth(){
        return 'Get auth'
    }

    async signUp(user: CreateUserDto){
        const dbUser = await this.usersRepository.getUserByEmail(user.email)
        if(dbUser){
            throw new BadRequestException('Email already exist')
        }
        const hashedPassword = await bcrypt.hash(user.password, 10)
        const isConfirmPassword = await bcrypt.compare(user.confirmPassword, hashedPassword)
        if(!isConfirmPassword){
            throw new BadRequestException('Invalid password')
        }
        // const hashedConfirmPassword = await bcrypt.hash(user.confirmPassword, 10)
        if(!hashedPassword){
            throw new BadRequestException('Password could not be hashed')
        }
        const {password,...DbUser} = await this.usersRepository.createUser({...user, password: hashedPassword})
        return {success: 'User created successfully', DbUser}
    }

    async gignIn(credential: LoginUserDto){
        const dbUser = await this.usersRepository.getUserByEmail(credential.email)
        if(!dbUser){
            throw new BadRequestException('No se ha podido')
        }
        const isPassValid = await bcrypt.compare(credential.password, dbUser.password)
        if(!isPassValid){
            throw new BadRequestException('Invalid Password')
        }

        const userPayload = {
            sub: dbUser.id,
            id: dbUser.id,
            email: dbUser.email,
            roles: [dbUser.isAdmin? Rol.ADMIN: Rol.USER]
        }

        const token = this.jwtService.sign(userPayload)

        return {success: 'user login in successfully:',token}
    }
}