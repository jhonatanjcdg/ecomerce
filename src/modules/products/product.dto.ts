import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class ProductDto {
  /**
   * Nombre del producto
   * @example smartphone
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * Descripción del producto
   * @example  Smartphone de alta gama
   */
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   * Precio del producto, puede ser decimal
   * @example 599.99
   */
  @IsNotEmpty()
  @IsNumber()
  price: number;

  /**
   * Stock del producto, cuantos productos del mismo tipo existen
   * @example 3
   */
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  /**
   * Imagen del producto, puede ser una url de imagen o del equipo
   * @example https://pandorafms.com/blog/wp-content/uploads/2018/01/smartphone-pfms-blog.webp
   */
  @IsNotEmpty()
  @IsString()
  imgUrl: string;

  /**
   * uuid de la categoría a la que pertenece
   */
  @IsNotEmpty()
  @IsUUID()
  categoryId: string; // Cambiado a categoryId, que es el ID de la categoría
}
