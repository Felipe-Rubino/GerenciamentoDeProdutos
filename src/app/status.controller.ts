import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { StatusService } from './status.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('/status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @ApiOperation({ summary: 'Check server status' })
  async serverStatus() {
    const status = await this.statusService.serverStatus();
    if (status.serverStatus === 'FALHA' || status.databaseStatus === 'FALHA') {
      throw new HttpException(status, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return status
  }
}
