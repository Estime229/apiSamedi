import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { CreateUserCommandHandler } from './commands/handlers/create-user.command.handler/create-user.command.handler';
import { UserModel } from './models/user.model/user.model';
import { JwtService } from '@nestjs/jwt';
import { LoginCommandHandler } from './commands/handlers/login.command.handler/login.command.handler';
import { JwtStrategy } from './strategie/jwt.strategy';
import { AutMeHandler } from './queries/handlers/aut-me.handler/aut-me.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserModel]), // Initialise JWT module
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    CreateUserCommandHandler,
    JwtService,
    JwtStrategy,
    LoginCommandHandler,
    AutMeHandler,
  ],
})
export class AuthModule {}
