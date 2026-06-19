import {
  Controller,
  Post,
  Body,
  Get,
  Request as NestRequest,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './login-user.dto';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../user/entities/user.entities';

@Controller('auth')
export class AuthController {
  constructor(private Authservice: AuthService) {}

  @Post('login')
  async loginUser(@Body() userData: LoginUserDto) {
    return this.Authservice.loginUser(userData);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getProfile(@NestRequest() req: { user: User }) {
    return req.user;
  }
}
