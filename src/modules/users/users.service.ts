import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UUID } from "crypto";
import { CreateUserDto } from "./CreateUser.dto";

@Injectable()
export class UsersService{
    constructor(
        private usersRepository:UsersRepository
        // @InjectRepository(User) private usersRepository: Repository<User>,
    ){}

    async getUsers(){
        try{
            return await this.usersRepository.getUsers()
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async getUserById(id: UUID){
        try{
            return await this.usersRepository.getUserById(id)
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async getUserByEmail(email: string){
        try{
            return await this.usersRepository.getUserByEmail(email)
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async createUser(user: CreateUserDto){
        try{
            return await this.usersRepository.createUser(user)
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async editUser(id: UUID, user: CreateUserDto){
        try{
            return await this.usersRepository.editUser(id, user)
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async deleteUser(id: UUID){
        try{
            return await this.usersRepository.deleteUser(id)
        }
        catch(error){
            throw new Error(error.message)
        }
    }
}