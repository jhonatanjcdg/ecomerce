import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./orders.entity";
import { Repository } from "typeorm";
import { User } from "../users/users.entity";
import { Product } from "../products/products.entity";
import { OrderDetail } from "./orderDetails.entity";
import { UUID } from "crypto";
import { CreateOrderDto } from "./CreateOrder.dto";

@Injectable()
export class OrdersRepository{
    constructor(
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Product) private productsRepository: Repository<Product>,
        @InjectRepository(OrderDetail) private ordersDetailRepository: Repository<OrderDetail>
    ){}

    // Busca una orden recibida por id.
    // Devuelve un objeto con la orden y los detalles de la orden 
    // (el detalle de la orden debe contener un array con todos los productos adquiridos).
    async getOrders(id: UUID){
        try{
            const order: Order = await this.ordersRepository.findOne({
                where: {id},
                relations: {orderDetail: {products: true}}
            })
            return order
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async addOrder(data: CreateOrderDto){
        try{
            const user: User = await this.usersRepository.findOne({
                where: {id: data.userId}
            })
            if(!user) throw Error('User not found')
            const date = new Date()
            const newOrder: Order = await this.ordersRepository.create({
                user: user,
                date
            })
            console.log("data",data)
            console.log("newOrder",newOrder)
            await this.ordersRepository.save(newOrder)
            const productsId = data.products
            let totalCompra = 0.0
            for(const productId of productsId){
                const product: Product = await this.productsRepository.findOne({
                    where: {id: productId.id}
                })
                console.log(productsId)
                if(product.stock < 1){
                    productsId.filter(product => product.id !== productId.id)
                    console.log("productid::",productsId)
                    console.log("Product::",product)
                    continue
                }
                totalCompra += Number(product.price)
                product.stock--
                // await this.productsRepository.save(product)
            }
            const newOrderDetail: OrderDetail = await this.ordersDetailRepository.create({
                price: totalCompra,
                order: newOrder,
                products: productsId
            })
            await this.ordersDetailRepository.save(newOrderDetail)
            newOrder.orderDetail = newOrderDetail
            await this.ordersRepository.save(newOrder)
            return {Orden: newOrder, precio: totalCompra, idDetalleCompra: newOrderDetail.id}
        }
        catch(error){
            throw new Error(error.message)
        }
    }
    //Devuelve la orden de compra con el precio y id del detalle de compra.
}