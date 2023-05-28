/* This is a TypeScript class that defines two DTOs (CreateUserDto and UpdateUserDto) with properties
for email and name, validated using class-validator and documented using ApiProperty from NestJS
Swagger. */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;
}
