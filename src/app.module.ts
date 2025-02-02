  import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { ProductModule } from './produtos/produto.module';
import { StatusModule } from './app/status.module';
import { LogModule } from './logs/log.module';

  @Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'db',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true
      }),
      ProductModule,
      StatusModule,
      LogModule
    ],
    controllers: [],
    providers: [],
  })
  export class AppModule {}
