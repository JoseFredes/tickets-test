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
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //route example GET localhost:3000/users
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  //route example GET localhost:3000/users/3
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.getUserById(Number(id));
  }
  //route example DELETE localhost:3000/users/3
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteUserById(@Param('id') id: number): Promise<User | null> {
    return this.usersService.deleteUserById(Number(id));
  }

  //route example POST  localhost:3000/users/create
  @Post('/create')
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(dto);
  }

  //route example PUT   localhost:3000/users/update/6
  @Put('/update/:id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(Number(id), dto);
  }
}
