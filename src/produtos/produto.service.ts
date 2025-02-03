import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { ProductDTO } from './dto/ProductDTO.dto';
import { LogService } from 'src/log/log.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly productRepository: Repository<ProdutoEntity>,
    private readonly logService: LogService,
  ) {
    this.logService.setEntityName('products');
  }

  async createProduct(productData: ProductDTO) {
    const productEntity = new ProdutoEntity();
    productEntity.dtoToEntity(productData);
    await this.productRepository.save(productEntity);
    return productData;
  }

  async findAll() {
    const products = await this.productRepository.find();
    const productsList = products.map(
      (product) =>
        new ProductDTO(
          product.codProduto,
          product.descricaoProduto,
          product.marca,
          product.valor,
          product.isAtivo,
        ),
    );

    return productsList;
  }

  async updateProduct(id: number, productData: ProductDTO) {
    try {
        // Busca o produto existente no banco de dados
        const existingProduct = await this.productRepository.findOneBy({ codProduto: id });
        if (!existingProduct) {
            throw new Error('Product not found');
        }

        // Cria um objeto para armazenar apenas os campos que serão atualizados
        const updates: Partial<ProdutoEntity> = {};

        // Itera sobre as chaves do productData para verificar quais campos foram fornecidos
        for (const key in productData) {
            if (productData[key] !== undefined && productData[key] !== null) {
                updates[key] = productData[key];
            }
        }

        // Se não houver campos para atualizar, registra no log e retorna
        if (Object.keys(updates).length === 0) {
            await this.logService.log(id, `No changes detected for product ${id}`);
            return;
        }

        // Atualiza apenas os campos fornecidos
        await this.productRepository.update(id, updates);

        // Registra as mudanças no log
        const changes: string[] = [];
        for (const key in updates) {
            changes.push(`${key}: ${existingProduct[key]} -> ${updates[key]}`);
        }
        const changeDescription = `Product ${id} has been updated. Changes: ${changes.join(', ')}`;
        await this.logService.log(id, changeDescription);
    } catch (error) {
        throw new Error('Error updating Product');
    }
}

  async deleteProduct(id: number) {
    const existingProduct = await this.productRepository.findOneBy({ codProduto: id });
    if(!existingProduct) {
      throw new Error('Product not found');
    }
    await this.logService.log(id, `Product ${id} has been deleted successfully`);
    await this.productRepository.update(id, { isAtivo: false });
  }
}
