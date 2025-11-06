import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBasicAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategie/jwt-auth.guard';
import { FollowMeCommand } from './commands/impl/follow-me.command/follow-me.command';
import { UnfollowCommand } from './commands/impl/unfollow.command/unfollow.command';
import { FindFollowerQuery } from './queries/impl/find-follower.query/find-follower.query';
@ApiBasicAuth('SECRET_KEY')
@Controller('follow')
export class FollowController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Follow me' })
  @Post('follow')
  followMe(@Body() command: FollowMeCommand, @Request() req) {
    command.followerId = req.user.id;
    return this.commandBus.execute(command);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'UnFollow me' })
  @Patch('unfollow')
  unfollow(@Body('') command: UnfollowCommand, @Request() req) {
    command.userId = req.user.id;
    return this.commandBus.execute(command);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find follower by id' })
  @Get('follow-by-id')
  findFollow(@Query('') query: FindFollowerQuery) {
    return this.queryBus.execute(query);
  }
}
