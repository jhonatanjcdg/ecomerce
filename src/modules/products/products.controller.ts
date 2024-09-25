import { ProductDto } from './product.dto';
import { ProductsService } from './products.service';
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from '../auth/auth.guard';
import { preLoadData } from 'src/helpers/preLoadData';
import { UUID } from 'crypto';
import { Product } from './products.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Rol } from 'src/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getProducts(@Query('page') page:number=1, @Query('limit') limit:number=5) {
        try{
            return await this.productsService.getProducts(page, limit);
        }
        catch(error){
            return error.message
        }
    }

    @Get(':id')
    async getProductById(@Param('id', ParseUUIDPipe) id: UUID) {
        try{
            return await this.productsService.getProductById(id);
        }
        catch(error){
            return error.message
        }
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async createProduct(@Body() product: ProductDto) {
        try{
            return await this.productsService.createProduct(product);
        }
        catch(error){
            return error.message
        }
    }

    @Post('seeder')
    async addProducts(){
        try{
            await this.productsService.addProducts()
            return { message: 'Products pre cargados exitosamente'}
        }
        catch(error){
            return error.message
        }
    }

    @Put(':id')
    @Roles(Rol.ADMIN)
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    async ceditProduct(@Param('id') id: UUID, @Body() product: Product) {
        try{
            return await this.productsService.editProduct(id, product);
        }
        catch(error){
            return error.message
        }
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async deleteProduct(@Param('id') id: UUID) {
        try{
            return await this.productsService.deleteProduct(id);
        }
        catch(error){
            return error.message
        }
    }
}
