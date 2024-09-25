import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { OrderDetail } from "./orderDetails.entity";
import { User } from "../users/users.entity";

@Entity({
    name: 'orders'
})
export class Order{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()
    
    @ManyToOne(() => User, user => user.orders)
    user: User

    @Column({
        type: 'date',
        nullable: false
    })
    date: Date

    @OneToOne(() => OrderDetail, orderDetail => orderDetail.order)
    @JoinColumn()
    orderDetail: OrderDetail
}