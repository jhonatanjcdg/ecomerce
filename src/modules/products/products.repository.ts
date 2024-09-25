import { Injectable } from "@nestjs/common";
import { ProductDto } from "./product.dto";
import { IProduct } from "./product.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { Category } from "../categories/categorys.entity";
import { UUID } from "crypto";
import { preLoadData } from "src/helpers/preLoadData";

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category) private categoriesRepository: Repository<Category>
  ) { }
  //   private products: IProduct[] = [
  //   {
  //     id: 1,
  //     name: "Laptop",
  //     description: "High performance laptop",
  //     price: 999.99,
  //     stock: true,
  //     imgUrl: "https://example.com/laptop.jpg"
  //   },
  //   {
  //     id: 2,
  //     name: "Smartphone",
  //     description: "Latest model smartphone",
  //     price: 699.99,
  //     stock: true,
  //     imgUrl: "https://example.com/smartphone.jpg"
  //   },
  //   {
  //     id: 3,
  //     name: "Headphones",
  //     description: "Noise-cancelling headphones",
  //     price: 199.99,
  //     stock: false,
  //     imgUrl: "https://example.com/headphones.jpg"
  //   }
  // ];

  async getProducts(page: number, limit: number) {
    try{
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      //   const paginatedProducts = this.products.slice(startIndex, endIndex);
      const products = await this.productsRepository.find({
        relations: {category: true}
      })
      return products.slice(startIndex, endIndex)
    }
    catch(error){
      throw new Error(error.message)
    }
  }

  async getProductById(id: UUID) {
    try{
      const product: Product = await this.productsRepository.findOne({
        where: {id},
        relations: {category: true, orderDetails: true}
      })
      if(!product)
        throw new Error('Product not exist')
      return product
    }
    catch(error){
      throw new Error(error.message)
    }
  }

  async createProduct(productDto: ProductDto) {
    try {
      // Verificar si la categoría existe
      const category: Category = await this.categoriesRepository.findOne({
        where: { id: productDto.categoryId },
      });
  
      if (!category) {
        throw new Error('Category does not exist');
      }
  
      // Crear el nuevo producto con la categoría relacionada
      const newProduct: Product = this.productsRepository.create({
        name: productDto.name,
        description: productDto.description,
        price: productDto.price,
        stock: productDto.stock,
        imgUrl: productDto.imgUrl,
        category: category, // Relación con la categoría existente
      });
  
      // Guardar el producto en la base de datos
      await this.productsRepository.save(newProduct);
  
      return newProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProducts() {
    const products: any[] = [...preLoadData]
    try{
      for (const product of products) {
        const existingProduct = await this.productsRepository.findOne({
          where: { name: product.name }
        })
        if (!existingProduct) {
          const category: Category = await this.categoriesRepository.findOne({
            where: { name: product.category }
          })
          // product.category = category.id
          if (category) {
            const newProduct = this.productsRepository.create({
              ...product,
              category: category.id
            })
            await this.productsRepository.save(newProduct)
          }
        }
      }
    }
    catch(error){
      throw new Error(error.message)
    }
  }

  async editProduct(id: UUID, product: Product) {
    try{
      let editProduct: Product = await this.getProductById(id)
      if(!editProduct)
        throw new Error('Product not exist')
      for (const key in product) {
        if (editProduct[key] !== product[key]) {
          editProduct[key] = product[key];
        }
      }
      await this.productsRepository.save(editProduct)
    }
    catch(error){
      throw new Error(error.message)
    }
  }

  async deleteProduct(id: UUID) {
    try{
      const isProduct: Product = await this.getProductById(id)
      if(!isProduct)
        throw new Error('Product not exist')
      const result = await this.productsRepository.delete({id})
      if(result.affected > 0)
        return 'Product deleted successfully'
      throw new Error('Undeleted product')
    }
    catch(error){
      throw new Error(error.message)
    }
  }
}