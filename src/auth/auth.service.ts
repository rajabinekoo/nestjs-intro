import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as Keyv from 'keyv';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  keyv = new Keyv('mysql://root:13791379@localhost:3306/token');

  async login(user: User): Promise<string> {
    const token: string = uuidv4();
    await this.keyv.set(token, user.id, 60 * 60000);
    return token;
  }

  async logout(token: string): Promise<void> {
    await this.keyv.delete(token);
  }
}
