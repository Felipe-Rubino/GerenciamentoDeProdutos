  import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { ProductModule } from './produtos/produto.module';

  @Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'db',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true
      }),
      ProductModule
    ],
    controllers: [],
    providers: [],
  })
  export class AppModule {}
