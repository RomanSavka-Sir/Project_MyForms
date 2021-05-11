import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local-strategy/local.strategy';
import { JwtStrategy } from './jwt-strategy/jwt.strategy';
import { UsersModule } from '../user/users.module';
import { UsersService } from '../user/users.service';
import { RolesGuard } from './roles-strategy/roles.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'secret_key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy,UsersService, LocalStrategy, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService,UsersService],
})
export class AuthModule {}
