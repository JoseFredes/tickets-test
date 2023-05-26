import { Controller, Get, Param } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from '@prisma/client';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Get()
  async getAllTickets(): Promise<Ticket[]> {
    return this.ticketsService.getAllTickets();
  }

  @Get('/:id')
  async getTicketById(@Param('id') id: number): Promise<Ticket> {
    return this.ticketsService.getTicketById(Number(id));
  }
}
