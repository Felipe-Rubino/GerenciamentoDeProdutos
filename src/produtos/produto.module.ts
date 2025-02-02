import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller";
import { ProductRepository } from "./produto.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { ProductService } from "./produto.service";
import { LogService } from "src/logs/log.service";
import { LogRepository } from "src/logs/log.repository";
import { LogModule } from "src/logs/log.module";

@Module({
    imports: [TypeOrmModule.forFeature([ProdutoEntity])
    , LogModule],
    controllers: [ProdutoController],
    providers: [ProductRepository, ProductService]
})
export class ProductModule {

}
