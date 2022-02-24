import {
  Body,
  ConflictException,
  Controller,
  forwardRef,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() body: CreateUserDto): Promise<void> {
    const duplicatedUser = await this.userService.findOneUser(
      null,
      body.username,
    );
    if (duplicatedUser) throw new ConflictException('User already exist');
    await this.userService.createUser(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto): Promise<{ token: string }> {
    const user = await this.userService.findOneUser(null, body.username);
    if (!user) throw new NotFoundException('User not found');
    if (user.password !== body.password)
      throw new NotFoundException('User not found');
    const token: string = await this.authService.login(user);
    return { token };
  }

  @Get('logout')
  async logout(@Req() req: Request): Promise<void> {
    this.authService.logout(req.res.locals.token);
  }
}
