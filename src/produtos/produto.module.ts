import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller";
import { ProductRepository } from "./produto.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { ProductService } from "./produto.service";

@Module({
    imports: [TypeOrmModule.forFeature([ProdutoEntity])],
    controllers: [ProdutoController],
    providers: [ProductRepository, ProductService]
})
export class ProductModule {

}
