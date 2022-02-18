import {
  Body,
  ClassSerializerInterceptor,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @Post()
  @HttpCode(201)
  async addNewUser(@Body() body: CreateUserDto): Promise<void> {
    const duplicatedUser = await this.userService.findOneUser(
      null,
      body.username,
    );
    if (duplicatedUser) throw new ConflictException('User already exist');
    await this.userService.createUser(body);
  }
}
