import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { ProductDTO } from './dto/ProductDTO.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly productRepository: Repository<ProdutoEntity>,
  ) {}

  async createProduct(productData: ProductDTO) {
    const productEntity = new ProdutoEntity();
    productEntity.dtoToEntity(productData);
    await this.productRepository.save(productEntity);
    return productData;
  }

  async findAll() {
    const products = await this.productRepository.find();
    const productsList = products.map((product) => 
        new ProductDTO(product.descricaoProduto, product.marca, product.valor, product.codProduto, product.isAtivo));

    return productsList;
  }

  async updateProduct(id: number, productData: ProductDTO) {
    const productEntity = new ProdutoEntity();
    productEntity.dtoToEntity(productData);
    await this.productRepository.update(id, productEntity);
  }

  async deleteProduct(id: number) {
    await this.productRepository.update(id, { isAtivo: false });
}
  
}
