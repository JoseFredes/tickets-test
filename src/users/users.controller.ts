import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get('/userid')
  async getUserById(@Param('id') id: number): Promise<User> {
    console.log(id);
    return this.usersService.getUserById(id);
  }
  //route example localhost:3000/users/3
  @Delete('/:id')
  async deleteUserById(@Param('id') id: number): Promise<User | null> {
    return this.usersService.deleteUserById(Number(id));
  }
}
