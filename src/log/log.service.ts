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

    const searchName = entityName ? `%${entityName}%` : '%';
    const logs: LogEntity[] = await this.logRepository.query(
      `SELECT * FROM LOGS lg WHERE lg.entity_name LIKE ? LIMIT ? OFFSET ?`,
      [searchName, limit, skip]
    );

    const formattedLogs = logs.map(log => {
        const date = new Date(log.dtInc);
        if (isNaN(date.getTime())) {
            return {
                ...log,
            };
        }
        return {
            ...log
        };
    });

    return formattedLogs;
}

  setEntityName(entityName: string) {
    this._entityName = entityName;
  }
}
