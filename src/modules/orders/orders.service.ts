import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { UUID } from "crypto";
import { CreateOrderDto } from "./CreateOrder.dto";

@Injectable()
export class OrdersService{
    constructor(
        private ordersRepository: OrdersRepository
    ){}

    async getOrders(id: UUID){
        try{
            return await this.ordersRepository.getOrders(id)
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async addOrder(data: CreateOrderDto){
        try{
            return await this.ordersRepository.addOrder(data)
        }
        catch(error){
            throw new Error(error.message)
        }
    }
}