import { Injectable } from "@nestjs/common";
import { ProdutoEntity } from "./produto.entity";

@Injectable()
export class ProductRepository {
    private products: ProdutoEntity[] = []; 
}