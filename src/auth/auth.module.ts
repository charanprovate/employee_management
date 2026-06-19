import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entities';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'my-secret-key',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],
})
export class AuthModule {}
