import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../config/configuration';
import { LikeModel } from './models/like.model/like.model';
import { CreateLikeCommandHandler } from './commands/handlers/create-like.command.handler/create-like.command.handler';
import { DeleteLikeCommandHandler } from './commands/handlers/delete-like.command.handler/delete-like.command.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([LikeModel]), // Initialise JWT module
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [LikeController],
  providers: [CreateLikeCommandHandler, DeleteLikeCommandHandler],
})
export class LikeModule {}
