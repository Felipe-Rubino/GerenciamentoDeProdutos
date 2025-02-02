import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { ProductDTO } from './dto/ProductDTO.dto';
import { LogService } from 'src/logs/log.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly productRepository: Repository<ProdutoEntity>,
    private readonly logService: LogService
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
        new ProductDTO( product.codProduto, product.descricaoProduto, product.marca, product.valor, product.isAtivo));

    return productsList;
  }

  async updateProduct(id: number, productData: ProductDTO) {
    const productEntity = new ProdutoEntity();
    productEntity.dtoToEntity(productData);
    await this.logService.logProductUpdate(id, productData.descricaoProduto);
    await this.productRepository.update(id, productEntity);
  }

  async deleteProduct(id: number) {
    await this.productRepository.update(id, { isAtivo: false });
}
  
}
