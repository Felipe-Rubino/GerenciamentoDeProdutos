import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LogEntity } from "./log.entity";
import { LogController } from "./log.controller";
import { LogRepository } from "./log.repository";
import { LogService } from "./log.service";

@Module({
    imports: [TypeOrmModule.forFeature([LogEntity])],
    controllers: [LogController],
    providers: [LogRepository, LogService],
    exports: [LogService, LogRepository]
})
export class LogModule {}