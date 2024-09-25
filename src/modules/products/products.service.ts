import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { ProductDto } from "./product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { Category } from "../categories/categorys.entity";
import { UUID } from "crypto";

@Injectable()
export class ProductsService{
    constructor(
        private productsRepository: ProductsRepository
        // @InjectRepository(Product) private productsRepository: Repository<Product>,
        // @InjectRepository(Category) private categoriesRepository: Repository<Category>,
    ){}

    async getProducts(page:number, limit:number){
        try{
            return await this.productsRepository.getProducts(page, limit)
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async getProductById(id: UUID){
        try{
            return await this.productsRepository.getProductById(id)
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async createProduct(product: ProductDto){
        try{
            return await this.productsRepository.createProduct(product)
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async addProducts(): Promise<void>{
        try{
            return await this.productsRepository.addProducts()
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async editProduct(id: UUID, product: Product){
        try{
            return await this.productsRepository.editProduct(id, product)
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async deleteProduct(id: UUID){
        try{
            return await this.productsRepository.deleteProduct(id)
        }
        catch(error){
            throw new Error(error.message)
        }
    }
}