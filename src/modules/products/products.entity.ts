import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid} from 'uuid'
import { OrderDetail } from "../orders/orderDetails.entity";
import { Category } from "../categories/categorys.entity";
// import { Category } from "../orders/entities/Categorys.entity";
// import { OrderDetail } from "../orders/entities/OrderDetails.entitys";

@Entity({
    name: 'products'
})
export class Product{
    /**
     * UUId generado automáticamente
     */
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    /**
   * Nombre del producto
   * @example smartphone
   */
    @Column({
        type: 'varchar',
        length: '50',
        nullable: false
    })
    name: string

    /**
   * Descripción del producto
   * @example  Smartphone de alta gama
   */
    @Column({
        type: 'varchar',
        nullable: false
    })
    description: string

    /**
   * Precio del producto, puede ser decimal
   */
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number

    /**
   * Stock del producto, cuantos productos del mismo tipo existen
   * @example 3
   */
    @Column({
        type: 'numeric',
        nullable: false
    })
    stock: number=0

    /**
   * Imagen del producto, puede ser una url de imagen o del equipo
   * @example https://pandorafms.com/blog/wp-content/uploads/2018/01/smartphone-pfms-blog.webp
   */
    @Column({
        type: 'varchar',
        default: 'https://cibernovedades.com/wp-content/uploads/image-787-1024x576.png',
    })
    imgUrl: string

    /**
   * uuid de la categoría a la que pertenece
   * uuid
   */
    @ManyToOne(() => Category, category => category.products)
    category: Category

    /**
   * uuid de la OrderDetail
   */
    @ManyToMany(() => OrderDetail, orderDetail => orderDetail.products)
    @JoinTable()
    orderDetails: OrderDetail[]
}