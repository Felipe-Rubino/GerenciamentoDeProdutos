import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductDTO } from "./dto/ProductDTO.dto";
import { ProductService } from "./produto.service";

@Controller('/products')
export class ProdutoController {

    constructor(
        private readonly productService: ProductService
    ) {}

    @Post()
    async createProduct(@Body() product: ProductDTO) {
        return this.productService.createProduct(product);
    }

    @Get()
    async listProducts() {
        return this.productService.findAll();
    }

    @Put('/:id')
    async updateProduct(@Param('id') id: number, @Body() product: ProductDTO) {
        return this.productService.updateProduct(id, product);
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') id: number) {
        return this.productService.deleteProduct(id);
    }
}