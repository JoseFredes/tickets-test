import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  name: string;
}
