import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entities';
import { LoginUserDto } from './login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async loginUser(userData: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        username: userData.username,
      },
    });

    if (!user) {
      return {
        message: 'Invalid credentials',
      };
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);

    if (!isMatch) {
      return {
        message: 'Invalid credentials',
      };
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }
}
