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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: 'Get all users',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiResponse({
    status: 200,
    description: 'Get user by id',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid id',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.getUserById(Number(id));
  }

  @ApiResponse({
    status: 200,
    description: 'Create user',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid email',
  })
  @Post('/create')
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Update user',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid id',
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
    description: 'User not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Nothing to update',
  })
  @Put('/update/:id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(Number(id), dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete user by id',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid id',
  })
  @ApiResponse({
    status: 404,
    description: 'User to delete not found',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteUserById(@Param('id') id: number): Promise<User | null> {
    return this.usersService.deleteUserById(Number(id));
  }
}
