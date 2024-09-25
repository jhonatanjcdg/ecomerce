// import { Order } from "src/modules/orders/entities/Orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Order } from "../orders/orders.entity";
@Entity({
    name: 'users'
})
export class User{
    /**
     * UUID del usuario que se genera automáticamente
     * @example 8eab36aa-398d-4a25-8dc0-63be3c5c633f
     */
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    /**
     * El nombre no debe estar vacío
     * @example nombre_cualquiera
     */
    @Column({
        type: 'varchar',
        length: '50',
        nullable: false
    })
    name: string

    /**
     * Debe ser un email valido
     * @example  nombre@dominio.com
     */
    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false
    })
    email: string

    /**
     * La contraseña debe ser mayor a 8 caracteres y debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*
     * @example Contra12@#.123
     */
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    password: string

    /**
     * Asigna por default al momento de creación del usuario, no se debe incluir en el cuerpo de la petición
     * @default false
     */
    @Column(
        {default: false}
    )
    isAdmin: boolean

    /**
     * Debe ser  un número entero
     * @example 5123744615123
     */
    @Column({
        type: "numeric",
    })
    phone: number

    /**
     * El país debe ser mayor a 5 y menor a 20 caracteres
     * @example Colombia
     */
    @Column({
        type: 'varchar',
        length: '50'
    })
    country: string

    /**
     * La dirección debe ser mayor a 3 y menor a 80 carácteres
     * @example calle 2 #5B - 3a
     */
    @Column('varchar')
    address: string

    /**
     * La ciudad debe ser mayor a 5 y menor a 20 carácteres
     * @example Pasto
     */
    @Column({
        type: 'varchar',
        length: 50
    })
    city: string

    @OneToMany(() => Order, order => order.user)
    orders: Order[]
}