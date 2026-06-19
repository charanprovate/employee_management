import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(private readonly dataSource: DataSource) {}

  @Get()
  async getHealth() {
    await this.dataSource.query('SELECT 1');

    return {
      status: 'UP',
      database: 'CONNECTED',
      timestamp: new Date(),
    };
  }
}
