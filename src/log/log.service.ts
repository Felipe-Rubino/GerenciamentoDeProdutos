import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { LogEntity } from './log.entity';
import { format } from 'date-fns';

@Injectable()
export class LogService {
  private _entityName: string;
  constructor(
    @InjectRepository(LogEntity)
    private readonly logRepository: Repository<LogEntity>,
  ) {}

  async log(entityId: number, description: string) {
    const log = new LogEntity();
    log.entityId = entityId;
    log.entityName = this._entityName;
    log.description = description;
    await this.logRepository.save(log);
  }

  async findAll(entityName?: string, page: number = 1, limit: number = 50) {
    const skip = (page - 1) * limit;

    let logs: LogEntity[];

    if (!entityName) {
        logs = await this.logRepository.find({
            skip,
            take: limit,
        });
    } else {
        logs = await this.logRepository.find({
            where: { entityName: Like(`%${entityName}%`) },
            skip,
            take: limit,
        });
    }

    const formattedLogs = logs.map(log => ({
        ...log,
        dtInc: format(new Date(log.dtInc), 'yyyy-MM-dd HH:mm:ss') 
    }));

    return formattedLogs;
  }

  setEntityName(entityName: string) {
    this._entityName = entityName;
  }
}
