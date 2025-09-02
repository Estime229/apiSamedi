import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../auth/models/user.model/user.model';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { GetAllHandler } from './queries/handlers/get-all.handler/get-all.handler';
import { FindByIdHandler } from './queries/handlers/find-by-id.handler/find-by-id.handler';
import { JwtStrategy } from '../auth/strategie/jwt.strategy';
import { UpdateUserCommandHandler } from './commands/handlers/update-user.command.handler/update-user.command.handler';
import { DeleteUserCommandHandler } from './commands/handlers/delete-user.command.handler/delete-user.command.handler';
// import { FindByIdCommand } from './commands/impl/find-by-id.command/find-by-id.command';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserModel]), // Initialise JWT module
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [UserController],
  providers: [
    GetAllHandler,
    FindByIdHandler,
    JwtStrategy,
    UpdateUserCommandHandler,
    DeleteUserCommandHandler,
  ],
})
export class UserModule {}
