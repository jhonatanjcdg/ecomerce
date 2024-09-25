import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { UploadApiResponse, v2 } from "cloudinary";
import * as toStream from 'buffer-to-stream'
import { ProductsRepository } from "../products/products.repository";

@Injectable()
export class FilesRepository{
    constructor(
        private readonly productsRepository: ProductsRepository
    ){}

    async uploadImage(file: Express.Multer.File, id: UUID): Promise<UploadApiResponse>{
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream({
                resource_type: 'auto'
            },
            async (error, result) => {
                if(error){
                    reject(error)
                }else{
                    const product = await this.productsRepository.getProductById(id)
                    product.imgUrl = result.secure_url
                    const editProduct = await this.productsRepository.editProduct(id, product)
                    resolve(result)
                }
            }
        )
        toStream(file.buffer).pipe(upload)
        })
    }
}