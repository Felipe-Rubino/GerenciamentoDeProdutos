import { Injectable } from "@nestjs/common";
import { LogEntity } from "./log.entity";

@Injectable()
export class LogRepository {
    private logs: LogEntity[] = [];
}