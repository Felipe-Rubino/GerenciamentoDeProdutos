import { ProdutoEntity } from "src/produtos/produto.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'logs' })
export class LogEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'dtinc' })
    dtInc: Date;

    @Column({ name: 'entity_id', nullable: false })
    entityId: number;

    @Column({ name: 'entity_name', nullable: false })
    entityName?: string

    @Column({ name: 'description', nullable: false })
    description: string;

    @ManyToOne(() => ProdutoEntity, produto => produto.logs)
    produto: ProdutoEntity;
}