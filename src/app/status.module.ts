import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatusController } from "./status.controller";
import { StatusService } from "./status.service";

@Module({
    imports: [TypeOrmModule.forFeature([])],
    controllers: [StatusController],
    providers: [StatusService]
})

export class StatusModule {}