import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoriesService } from "./category.service";
import { Category } from "./categorys.entity";
import { preLoadData } from "src/helpers/preLoadData";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController{
    constructor(private readonly categoriesService: CategoriesService){

    }

    @Get('seeder')
    async getCategories(){
        try{
            return await this.categoriesService.getCategories()
        }
        catch(error){
            return error.message
        }
    }

    @Post('seeder')
     async addCategories(){
        try{
            await this.categoriesService.addCategories()
            return { message: 'Categories pre cargadas exitosamente'}
        }
        catch(error){
            return error.message
        }
    }
}