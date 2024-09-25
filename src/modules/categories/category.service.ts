import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./categorys.entity";
import { Repository } from "typeorm";
import { CategoriesRepository } from "./category.repository";

@Injectable()
export class CategoriesService{
    constructor(
        private categoriesRepository: CategoriesRepository,
    ){}

    async getCategories(){
        try{
            return await this.categoriesRepository.getCategories()
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async addCategories(){
        try{
            return await this.categoriesRepository.addCategories()
        }
        catch(error){
            throw new Error(error.message)
        }
    }
}