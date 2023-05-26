import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User> {
    if (id === undefined) throw new BadRequestException('Invalid id');

    const user = this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
      },
    });
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    if (id === undefined) throw new BadRequestException('Invalid id');

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');

    if (user.email === dto.email && user.name === dto.name)
      throw new BadRequestException('Nothing to update');

    const userToEdit = {
      name: user.name === dto.name ? user.name : dto.name,
      email: user.email === dto.email ? user.email : dto.email,
    };

    return this.prisma.user.update({
      where: { id },
      data: {
        email: userToEdit.email,
        name: userToEdit.name,
      },
    });
  }

  async deleteUserById(id: number): Promise<User> {
    if (id === undefined) throw new BadRequestException('Invalid id');

    const userToDelete = this.prisma.user.delete({
      where: { id },
    });

    if (!userToDelete) throw new NotFoundException('User to delete not found');

    return userToDelete;
  }
}
