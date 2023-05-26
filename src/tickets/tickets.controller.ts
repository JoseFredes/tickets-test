import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from '@prisma/client';
import { CreateTicketDto, UpdateTicketDto } from './dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  //route example PUT localhost:3000/tickets/update/6
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTickets(): Promise<Ticket[]> {
    return this.ticketsService.getAllTickets();
  }

  //route example GET localhost:3000/tickets/1
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getTicketById(@Param('id') id: number): Promise<Ticket> {
    return this.ticketsService.getTicketById(Number(id));
  }

  //route example POST localhost:3000/tickets/create
  @Post('/create')
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() dto: CreateTicketDto): Promise<Ticket | null> {
    return this.ticketsService.createTicket(dto);
  }

  //route example POST localhost:3000/tickets/update/6
  @Put('/update/:id')
  @HttpCode(HttpStatus.OK)
  async updateTicket(
    @Param('id') id: number,
    @Body() dto: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketsService.updateTicket(Number(id), dto);
  }

  //route example DELETE  localhost:3000/tickets/1
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteTicketById(@Param('id') id: number): Promise<Ticket | null> {
    return this.ticketsService.deleteTicketById(Number(id));
  }
}
