import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ProductDTO } from './dto/ProductDTO.dto';
import { ProductService } from './produto.service';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/products')
export class ProdutoController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal error' })
  async createProduct(@Body() product: ProductDTO) {
    return this.productService.createProduct(product);
  }

  @Get()
  @ApiOperation({ summary: 'List all products' })
    @ApiResponse({
        status: 200,
        description: 'List of products returned successfully',
    })
  async listProducts() {
    return this.productService.findAll();
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a product' })
  async updateProduct(
    @Param('id') id: string,
    @Body() product: ProductDTO,
    @Res() res: Response,
  ) {
    try {
      const updatedProduct = await this.productService.updateProduct(
        Number(id),
        product,
      );
      return res.status(HttpStatus.OK).json(updatedProduct); 
    } catch (error) {
      if (error.message === 'Product not found') {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message }); 
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal error' }); 
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a product' })
  async deleteProduct(@Param('id') id: number,@Res() res: Response) {
    try {
        const updatedProduct = await this.productService.deleteProduct(id);
        return res.status(HttpStatus.OK).json(updatedProduct);
    } catch (error) {
        if (error.message === 'Product not found') {
          return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
        }
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal error' });
    }
  }
}
