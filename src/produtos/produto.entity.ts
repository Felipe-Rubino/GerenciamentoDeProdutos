import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProductDTO } from "./dto/ProductDTO.dto";

@Entity({ name: 'produtos' })
export class ProdutoEntity {
    
    @PrimaryGeneratedColumn()
    codProduto: number;

    @Column({ name: 'marca', nullable: false })
    marca: string;

    @Column({ name: 'valor' })
    valor: number;

    @Column({ name: 'descricao_produto' })
    descricaoProduto: string;

    @Column({ name: 'ativo' })
    isAtivo: boolean;

    dtoToEntity(dto: ProductDTO): void {
        this.marca = dto.marca;
        this.valor = dto.valor;
        this.descricaoProduto = dto.descricaoProduto;
        this.isAtivo = dto.isAtivo;
    }
}