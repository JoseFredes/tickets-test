/* This is the main module of a NestJS application that imports and includes other modules such as
Prisma, Users, and Tickets. */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
