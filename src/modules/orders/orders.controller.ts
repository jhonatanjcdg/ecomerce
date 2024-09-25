import { UUID } from 'crypto';
import { OrdersService } from './orders.service';
import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, UseGuards } from "@nestjs/common";
import { CreateOrderDto } from './CreateOrder.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class OrdersController{
    constructor(private readonly ordersService: OrdersService){

    }

    @Get()
    async getOrders(@Query('id', ParseUUIDPipe) id: UUID){
        try{
            return await this.ordersService.getOrders(id)
        }
        catch(error){
            return error.message
        }
    }

    @Post()
    // @UseGuards(AuthGuard)
    async addOrder(@Body() data: CreateOrderDto){
        try{
            return await this.ordersService.addOrder(data)
        }
        catch(error){
            return error.message
        }
    }
}