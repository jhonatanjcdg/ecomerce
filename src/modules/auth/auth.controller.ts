import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { IAuth } from './Auth.interface';
import { LoginUserDto } from './LoginUser.dto';
import { CreateUserDto } from '../users/CreateUser.dto';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService){

    }

    @Get()
    async getAuth(){
        try{
            return await this.authService.getAuth()
        }
        catch(error){
            return error.message
        }
    }

    @Post('signup')
    async signUp(@Body() user: CreateUserDto, @Req() request: Request){
        try {
            return await this.authService.signUp(user)
        } catch (error) {
            return error.message
        }
    }

    @Post('signin')
    async signin(@Body() credential: LoginUserDto){
        try{
                return await this.authService.gignIn(credential)
        }
        catch(error){
            return error.message
        }
    }
}