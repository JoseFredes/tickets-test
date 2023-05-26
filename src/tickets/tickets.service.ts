import { Injectable } from '@nestjs/common';
import { Ticket } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async getAllTickets(): Promise<Ticket[]> {
    return this.prisma.ticket.findMany();
  }

  async getTicketById(id: number): Promise<Ticket> {
    return this.prisma.ticket.findUnique({
      where: { id },
    });
  }
}
