import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //route example GET localhost:3000/users
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  //route example GET localhost:3000/users/3
  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.getUserById(Number(id));
  }
  //route example DELETE localhost:3000/users/3
  @Delete('/:id')
  async deleteUserById(@Param('id') id: number): Promise<User | null> {
    return this.usersService.deleteUserById(Number(id));
  }

  @Post('/create')
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(dto);
  }
}
