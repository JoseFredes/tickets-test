/* This is the main module of a NestJS application that imports and includes other modules such as
Prisma, Users, and Tickets. */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [PrismaModule, UsersModule, TicketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
