import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    if (id === undefined) throw new BadRequestException('Invalid id');

    const ticket = this.prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) throw new NotFoundException('Ticket not found');

    return ticket;
  }

  async createTicket(data: CreateTicketDto): Promise<Ticket> {
    if (!data) throw new BadRequestException('Invalid data');

    const author = await this.prisma.user.findUnique({
      where: { id: data.author },
    });

    if (!author) throw new NotFoundException('Author not found');

    if (!validateEmail(data.email))
      throw new BadRequestException('Invalid email');
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
    if (id === undefined) throw new BadRequestException('Invalid id');

    if (!dto) throw new BadRequestException('Invalid data');

    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) throw new NotFoundException('Ticket not found');

    if (!validateEmail(dto.email))
      throw new BadRequestException('Invalid email');

    const validateChanges =
      ticket.title == dto.title &&
      ticket.description == dto.description &&
      ticket.email === dto.email &&
      ticket.name === dto.name;

    if (validateChanges) throw new BadRequestException('Nothing to update');

    const ticketToEdit = {
      title: ticket.title === dto.name ? ticket.title : dto.title,
      description:
        ticket.description === dto.name ? ticket.description : dto.description,
      name: ticket.name === dto.name ? ticket.name : dto.name,
      email: ticket.email === dto.email ? ticket.email : dto.email,
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
    if (id === undefined) throw new BadRequestException('Invalid id');

    const ticketToDelete = this.prisma.ticket.delete({
      where: { id },
    });

    if (!ticketToDelete) throw new NotFoundException('Ticket not found');

    return ticketToDelete;
  }
}
