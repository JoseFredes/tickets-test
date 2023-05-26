import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from '@prisma/client';
import { CreateTicketDto } from './dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  async getAllTickets(): Promise<Ticket[]> {
    return this.ticketsService.getAllTickets();
  }

  @Get('/:id')
  async getTicketById(@Param('id') id: number): Promise<Ticket> {
    return this.ticketsService.getTicketById(Number(id));
  }
  //route example DELETE localhost:3000/tickets/3
  @Post('/create')
  async createUser(@Body() dto: CreateTicketDto): Promise<Ticket | null> {
    return this.ticketsService.createTicket(dto);
  }

  //route example POST  localhost:3000/users/create
  @Delete('/:id')
  async deleteTicketById(@Param('id') id: number): Promise<Ticket | null> {
    return this.ticketsService.deleteTicketById(Number(id));
  }
}
