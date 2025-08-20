import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBasicAuth, ApiOperation } from '@nestjs/swagger/dist/decorators';
import { JwtAuthGuard } from 'src/auth/strategie/jwt-auth.guard';
import { CreateCommentCommand } from './commands/impl/create-comment.command/create-comment.command';
import { UpdateCommentCommand } from './commands/impl/update-comment.command/update-comment.command';
import { DeleteCommentCommand } from './commands/impl/delete-comment.command/delete-comment.command';
// import { GetAllCommentHandler } from './queries/handlers/get-all-comment.handler/get-all-comment.handler';
import { GetAllCommentQuery } from './queries/impl/get-all-comment.query/get-all-comment.query';

@ApiBasicAuth('SECRET_KEY')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create comment' })
  @Post('create')
  async createComment(@Body() command: CreateCommentCommand, @Request() req) {
    command.userId = req.user.id;
    return this.commandBus.execute(command);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update comment' })
  @Patch('update')
  async updateComment(@Body() command: UpdateCommentCommand, @Request() req) {
    command.userId = req.user.id;
    // console.log('userId', command.userId);
    return this.commandBus.execute(command);
  }

  //Delete comment
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete comment' })
  @Delete('delete')
  async deleteComment(@Body() command: DeleteCommentCommand, @Request() req) {
    command.userId = req.user.id;
    return this.commandBus.execute(command);
  }

  //Get all comments
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all comments' })
  @Get('all')
  async getAllComments(@Query() query: GetAllCommentQuery) {
    return this.queryBus.execute(query);
  }
}
