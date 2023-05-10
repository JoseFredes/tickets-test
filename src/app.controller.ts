import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get('')
  @HttpCode(HttpStatus.OK)
  status(): any {
    return {
      service: 'G3 Backend',
      status: 'active',
    };
  }
}
