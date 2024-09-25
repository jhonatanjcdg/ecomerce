import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid} from 'uuid'
import { Product } from '../products/products.entity';
import { Order } from './orders.entity';

@Entity({
    name: 'ordersDetail'
})
export class OrderDetail{
    /**
     * UUID se genera automáticamente
     */
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    /**
     * Precio de la orden, puede ser decimal
     * @example 59.99
     */
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number

    /**
     * UUID de la orden a la que pertenece
     */
    @OneToOne(() => Order, order => order.orderDetail)
    order: Order

    @ManyToMany(() => Product, product => product.orderDetails)
    @JoinTable()
    products: Product[]
}