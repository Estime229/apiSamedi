import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { CommentModel } from './models/comment.model/comment.model';
import { CreateCommentCommandHandler } from './commands/handlers/create-comment.command.handler/create-comment.command.handler';
import { UpdateCommentCommandHandler } from './commands/handlers/update-comment.command.handler/update-comment.command.handler';
import { DeleteCommentCommandHandler } from './commands/handlers/delete-comment.command.handler/delete-comment.command.handler';
import { GetAllCommentHandler } from './queries/handlers/get-all-comment.handler/get-all-comment.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CommentModel]), // Initialise JWT module
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [CommentController],
  providers: [
    CreateCommentCommandHandler,
    UpdateCommentCommandHandler,
    DeleteCommentCommandHandler,
    GetAllCommentHandler,
  ],
})
export class CommentModule {}
