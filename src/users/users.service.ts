import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
      },
    });
  }

  async deleteUserById(id: number): Promise<User | null> {
    console.log(id);
    if (id === undefined) throw new Error('Invalid id');

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
