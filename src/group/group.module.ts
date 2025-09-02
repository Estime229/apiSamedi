import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../config/configuration';
import { GroupModel } from './models/group.model/group.model';
import { CreateGroupCommandHandler } from './commands/handlers/create-group.command.handler/create-group.command.handler';
import { UpdateCommentCommandHandler } from '../comment/commands/handlers/update-comment.command.handler/update-comment.command.handler';
import { UpdateGroupCommandHandler } from './commands/handlers/update-group.command.handler/update-group.command.handler';
import { DeleteGroupCommandHandler } from './commands/handlers/delete-group.command.handler/delete-group.command.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([GroupModel]), // Initialise JWT module
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [GroupController],
  providers: [
    CreateGroupCommandHandler,
    UpdateGroupCommandHandler,
    DeleteGroupCommandHandler,
  ],
})
export class GroupModule {}
