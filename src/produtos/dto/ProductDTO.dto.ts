import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { isatty } from 'tty';

export class ProductDTO {

  codProduto: number | null;

  @IsOptional()
  descricaoProduto?: string;

  @IsOptional()
  marca?: string;

  @IsOptional()
  valor?: number;

  @IsBoolean()
  isAtivo: boolean;

  constructor( 
    codProduto: number | null,
    descricaoProduto?: string,
    marca?: string,
    valor?: number,
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
