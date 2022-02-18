import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneUser(
    id: number | null,
    username: string | undefined,
  ): Promise<User> {
    if (id) {
      return await this.userRepository.findOne({ where: { id } });
    } else if (username) {
      return await this.userRepository.findOne({ where: { username } });
    } else {
      return null;
    }
  }

  async createUser(body: CreateUserDto): Promise<void> {
    const newUser: User = await this.userRepository.create({
      username: body.username,
      password: body.password,
      email: body.email,
    });
    await this.userRepository.save(newUser);
  }
}
