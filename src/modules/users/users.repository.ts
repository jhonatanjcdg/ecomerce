import { Injectable } from "@nestjs/common";
import { IUser } from "./User.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { UUID } from "crypto";
import { CreateUserDto } from "./CreateUser.dto";

@Injectable()
export class UsersRepository{
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ){}

    // private users = [
    //     {
    //       id: 1,
    //       email: "john.doe@example.com",
    //       name: "John Doe",
    //       password: "password123",
    //       address: "123 Main St",
    //       phone: "555-1234",
    //       country: "USA",
    //       city: "New York"
    //     },
    //     {
    //       id: 2,
    //       email: "jane.smith@example.com",
    //       name: "Jane Smith",
    //       password: "password456",
    //       address: "456 Elm St",
    //       phone: "555-5678",
    //       country: "Canada",
    //       city: "Toronto"
    //     },
    //     {
    //       id: 3,
    //       email: "mario.rossi@example.com",
    //       name: "Mario Rossi",
    //       password: "password789",
    //       address: "789 Oak St",
    //       phone: "555-9101",
    //       country: "Italy",
    //       city: "Rome"
    //     }
    // ];

    async getUsers(){
        const users: User[] = await this.usersRepository.find()
        if(!users){
          return 'Users not found!!'
        }
        return users
    }

    async getUserById(id: UUID){
      try{
        const user: User =  await this.usersRepository.findOne({
          where: {id},
          relations: {orders: true}
        })
        if(!user){
          throw new Error('User not found!')
        }
        const {isAdmin, ...dbUser} = user
        return dbUser
      }
      catch(error){
        throw new Error(error.message)
      }
    }

    async getUserByEmail(email: string){
      try{
        const user: User = await this.usersRepository.findOne({
          where: {email},
        })
        if(!user){
          return undefined
        }
        return user
      }
      catch(error){
        throw new Error(error.message)
      }
    }

    async createUser(user: CreateUserDto){
      try{
        const newUser: User = await this.usersRepository.create(user)
        await this.usersRepository.save(newUser)
        return newUser
      }
      catch(error){
        throw new Error(error.message)
      }
    }

    async editUser(id: UUID, editUserDto: CreateUserDto): Promise<User> {
      const user = await this.usersRepository.findOne({ where: { id } });
    
      if (!user) {
        throw new Error('User not found');
      }
    
      // Actualiza solo si los valores son diferentes
      for (const key in editUserDto) {
        if (user[key] !== editUserDto[key]) {
          user[key] = editUserDto[key];
        }
      }
    
      try {
        return await this.usersRepository.save(user);
      } catch (error) {
        throw new Error('Error updating user');
      }
    }

    async deleteUser(id: UUID){
      try{
        const user: Omit<User, 'isAdmin'> = await this.getUserById(id)
        if(!user){
          throw new Error('User not found')
        }
        await this.usersRepository.delete({id})
        return 'User deleted successfully'
      }
      catch(error){
        throw new Error(error.message)
      }
    }
}