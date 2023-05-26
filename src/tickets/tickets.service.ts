import { Injectable } from '@nestjs/common';
import { Ticket } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto, UpdateTicketDto } from './dto';
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

  async updateTicket(id: number, dto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) throw new Error('Ticket not found');

    if (!validateEmail(dto.email)) throw new Error('Invalid email');

    if (
      ticket.email === dto.email &&
      ticket.name === dto.name &&
      ticket.title == dto.title &&
      ticket.description == dto.description
    )
      throw new Error('Nothing to update');

    const ticketToEdit = {
      title: ticket.title === dto.name ? ticket.title : dto.title,
      description:
        ticket.description === dto.name ? ticket.description : dto.description,
      email: ticket.email === dto.email ? ticket.email : dto.email,
      name: ticket.name === dto.name ? ticket.name : dto.name,
    };

    return this.prisma.ticket.update({
      where: { id },
      data: {
        title: ticketToEdit.title,
        description: ticketToEdit.description,
        name: ticketToEdit.name,
        email: ticketToEdit.email,
      },
    });
  }

  async deleteTicketById(id: number): Promise<Ticket> {
    return this.prisma.ticket.delete({
      where: { id },
    });
  }
}
