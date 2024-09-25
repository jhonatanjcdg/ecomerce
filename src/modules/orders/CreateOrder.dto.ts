import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, MinLength, ValidateNested } from "class-validator";
import { Product } from "../products/products.entity";

export class CreateOrderDto{
    /**
     * Id de la orden, se genera automáticamente
     */
    @IsNotEmpty()
    @IsUUID()
    userId: string

    /**
     * Arreglo de los productos que tiene la orden, minimo tiene que haber 1
     */
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type(() => Product)
    products: Product[]
}