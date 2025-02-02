import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductDTO } from "./dto/ProductDTO.dto";
import { LogEntity } from "src/logs/log.entity";

@Entity({ name: 'produtos' })
export class ProdutoEntity {
    
    @PrimaryGeneratedColumn()
    codProduto: number;

    @Column({ name: 'marca', nullable: true })
    marca: string;

    @Column({ name: 'valor', nullable: true })
    valor: number;

    @Column({ name: 'descricao_produto', nullable: true })
    descricaoProduto: string;

    @Column({ name: 'ativo' })
    isAtivo: boolean;

    @OneToMany(() => LogEntity, log => log.produto)
    logs: LogEntity[];

    dtoToEntity(dto: ProductDTO): void {
        this.marca = dto.marca ?? '';
        this.valor = dto.valor ?? 0;
        this.descricaoProduto = dto.descricaoProduto ?? '';
        this.isAtivo = dto.isAtivo;
    }
}