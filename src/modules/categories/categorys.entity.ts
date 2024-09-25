import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Product } from "../products/products.entity";

@Entity({
    name: 'categories'
})
export class Category{
    /**
     * UUID que se genera automaticamente
     */
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    /**
     * Nombre de la categoría
     * @example smartphone
     */
    @Column({
        type: 'varchar',
        length: '50',
        nullable: false
    })
    name: string

    /**
     * Relación que tiene la categoría con los productos
     */
    @OneToMany(() => Product, product => product.category)
    products: Product[]
}