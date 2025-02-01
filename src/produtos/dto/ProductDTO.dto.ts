import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { isatty } from 'tty';

export class ProductDTO {

  codProduto: number | null;

  @IsString({ message: 'A descrição do produto não pode ser vazia' })
  descricaoProduto: string;

  @IsString({ message: 'A descrição da marca não pode ser vazia' })
  marca: string;

  @IsNumber({}, { message: 'O valor deve ser um número' })
  valor: number;

  @IsBoolean()
  isAtivo: boolean;

  constructor( 
    descricaoProduto: string,
    marca: string,
    valor: number,
    codProduto: number | null,
    isAtivo: boolean = true
  ) {
    if(codProduto) {
      this.codProduto = codProduto;
    }
    this.descricaoProduto = descricaoProduto;
    this.marca = marca;
    this.valor = valor;
    this.isAtivo = isAtivo;
  }
  
}
