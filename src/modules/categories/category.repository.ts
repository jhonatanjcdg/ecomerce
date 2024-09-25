import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./categorys.entity";
import { Repository } from "typeorm";
import { preLoadData } from "src/helpers/preLoadData";

@Injectable()
export class CategoriesRepository{
    constructor(
        @InjectRepository(Category) private categoriesRepository: Repository<Category>,
    ){}

    async getCategories(): Promise<Category[]>{
        try{
            return await this.categoriesRepository.find()
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async addCategories(){
        const categories = preLoadData.map(category => category.category)
        try{
            for(const categoryName of categories){
                const existingCategory = await this.categoriesRepository.findOne({
                    where: { name: categoryName}
                })
                if(!existingCategory){
                    const category = this.categoriesRepository.create({name: categoryName})
                    await this.categoriesRepository.save(category)
                }
            }
        }
        catch(error){
            throw new Error(error.message)
        }
    }
}