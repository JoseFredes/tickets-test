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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}
  @ApiResponse({
    status: 200,
    description: 'Get all tickets',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTickets(): Promise<Ticket[]> {
    return this.ticketsService.getAllTickets();
  }

  @ApiResponse({
    status: 200,
    description: 'Get ticket by id',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid id',
  })
  @ApiResponse({
    status: 404,
    description: 'Ticket not found',
  })
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getTicketById(@Param('id') id: number): Promise<Ticket> {
    return this.ticketsService.getTicketById(Number(id));
  }

  @ApiResponse({
    status: 200,
    description: 'Create ticket',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid email',
  })
  @ApiResponse({
    status: 404,
    description: 'Author not found',
  })
  @Post('/create')
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() dto: CreateTicketDto): Promise<Ticket | null> {
    return this.ticketsService.createTicket(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Update ticket',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid email',
  })
  @ApiResponse({
    status: 404,
    description: 'Ticket not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Nothing to update',
  })
  @Put('/update/:id')
  @HttpCode(HttpStatus.OK)
  async updateTicket(
    @Param('id') id: number,
    @Body() dto: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketsService.updateTicket(Number(id), dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete ticket',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid id',
  })
  @ApiResponse({
    status: 404,
    description: 'Ticket not found',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteTicketById(@Param('id') id: number): Promise<Ticket | null> {
    return this.ticketsService.deleteTicketById(Number(id));
  }
}
