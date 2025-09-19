import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBasicAuth } from '@nestjs/swagger';
import { ApiKeyGuard } from './auth/strategie/api-key.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiBasicAuth('x-api-key')
  @UseGuards(ApiKeyGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
