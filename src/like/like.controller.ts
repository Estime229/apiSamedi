import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBasicAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategie/jwt-auth.guard';
import { CreateLikeCommand } from './commands/impl/create-like.command/create-like.command';
import { DeleteLikeCommand } from './commands/impl/delete-like.command/delete-like.command';

@ApiBasicAuth('SECRET_KEY')
@Controller('like')
export class LikeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create like' })
  @Post('create')
  async createLike(@Body() command: CreateLikeCommand, @Request() req) {
    command.userId = req.user.id;
    return this.commandBus.execute(command);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'delete like' })
  @Delete('delete-like/:id')
  async DeleteLikeCommand(@Param('id') id: string, @Request() req) {
    const command = new DeleteLikeCommand();
    command.likeId = id;
    command.userId = req.user.id;
    return this.commandBus.execute(command);
  }
}
