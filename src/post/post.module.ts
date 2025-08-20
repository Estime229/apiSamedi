import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { PostModel } from './models/post.model/post.model';
import { CreatePostCommandHandler } from './commands/handlers/create-post.command.handler/create-post.command.handler';
import { GetAllPostHandler } from './queries/handlers/get-all-post.handler/get-all-post.handler';
import { UpdatePostCommandHandler } from './commands/handlers/update-post.command.handler/update-post.command.handler';
import { DeletePostCommandHandler } from './commands/handlers/delete-post.command.handler/delete-post.command.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([PostModel]), // Initialise JWT module
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [PostController],
  providers: [
    CreatePostCommandHandler,
    GetAllPostHandler,
    UpdatePostCommandHandler,
    DeletePostCommandHandler,
  ],
})
export class PostModule {}
