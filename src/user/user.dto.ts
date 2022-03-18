import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Valid email.', default: 'test@test.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: '1234' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ default: 'user' })
  @IsNotEmpty()
  username: string;
}

export class UpdateProfileDto {
  @ApiProperty({ required: false, description: 'Valid email.' })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  username: string;
}
