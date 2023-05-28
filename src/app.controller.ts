import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

interface Status {
  service: string;
  status: string;
}
@Controller('')
export class AppController {
  @ApiResponse({
    status: 200,
    description: 'Get status',
  })
  @Get('')
  @HttpCode(HttpStatus.OK)
  status(): Status {
    return {
      service: 'G3 Backend',
      status: 'active',
    };
  }
}
