import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../config/configuration';
import { FollowModel } from './models/follow.model/follow.model';
import { FollowMeCommandHandler } from './commands/handlers/follow-me.command.handler/follow-me.command.handler';
import { UnfollowCommandHandler } from './commands/handlers/unfollow.command.handler/unfollow.command.handler';
import { FindFollowerHandler } from './queries/handlers/find-follower.handler/find-follower.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([FollowModel]), // Initialise JWT module
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [FollowController],
  providers: [
    FollowMeCommandHandler,
    UnfollowCommandHandler,
    FindFollowerHandler,
  ],
})
export class FollowModule {}
