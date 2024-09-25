import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreateUserDto } from "./CreateUser.dto";
import { UUID } from "crypto";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Rol } from "src/roles.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController{
    constructor(
        private readonly usersService: UsersService,
    ){}

    @Get()
    @Roles(Rol.ADMIN)
    @UseGuards(RolesGuard)
    async getUsers(){
        try{
            return await this.usersService.getUsers()
        }
        catch(error){
            return error.message
        }
    }

    @Get(':id')
    async getUserById(@Param('id', ParseUUIDPipe) id: UUID){
        try{
            return await this.usersService.getUserById(id)
        }
        catch(error){
            return error.message
        }
    }

    @Post()
    async createUser(@Body() user: CreateUserDto){
        try{
            return await this.usersService.createUser(user)
        }
        catch(error){
            return error.message
        }
    }

    @Put()
    async editUser(@Query('id', ParseUUIDPipe) id: UUID, @Body() user: CreateUserDto){
        try{
            return await this.usersService.editUser(id, user)
        }
        catch(error){
            return error.message
        }
    }

    @Delete()
    async deleteUser(@Query('id', ParseUUIDPipe) id: UUID){
        try{
            return await this.usersService.deleteUser(id)
        }
        catch(error){
            return error.message
        }
    }
}