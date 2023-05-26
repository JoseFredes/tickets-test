import { Injectable } from '@nestjs/common';
import { Ticket } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './dto';
import { validateEmail } from 'src/utils/emailValidator';

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

  async createTicket(data: CreateTicketDto): Promise<Ticket> {
    // get author
    const author = await this.prisma.user.findUnique({
      where: { id: data.author },
    });
    if (!author) throw new Error('No author found');

    if (!validateEmail(data.email)) throw new Error('Invalid email');
    return this.prisma.ticket.create({
      data: {
        title: data.title,
        description: data.description,
        name: data.name,
        email: data.email,
        author: {
          connect: {
            id: author.id,
          },
        },
      },
    });
  }

  async deleteTicketById(id: number): Promise<Ticket> {
    return this.prisma.ticket.delete({
      where: { id },
    });
  }
}
