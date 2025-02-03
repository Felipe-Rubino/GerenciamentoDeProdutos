import { Controller, Get, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('/logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  @ApiOperation({ summary: 'Search logs by table name' })
  @ApiResponse({
    status: 200,
    description: 'Log list returned successfully',
  })
  @ApiResponse({ status: 404, description: 'No logs found' })
  @ApiQuery({ name: 'entityName', required: false})
  async listLogs(@Query('entityName') entityName?: string,
  @Query('page') page: number = 1
  ) {
    const limit = 50;
    return this.logService.findAll(entityName, page, limit);
  }
}
