import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBasicAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategie/jwt-auth.guard';
import { CreatePostCommand } from './commands/impl/create-post.command/create-post.command';
import { GetAllPostQuery } from './queries/impl/get-all-post.query/get-all-post.query';
import { UpdatePostCommand } from './commands/impl/update-post.command/update-post.command';
import { DeletePostCommand } from './commands/impl/delete-post.command/delete-post.command';

@ApiBasicAuth('SECRET_KEY')
@Controller('post')
export class PostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create post' })
  @Post('create')
  async createPost(@Body() command: CreatePostCommand, @Request() req) {
    command.userId = req.user.id;
    return this.commandBus.execute(command);
  }

  //Get all posts
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'GetAll post' })
  @Get('all-post')
  async getAllPost(@Query() query: GetAllPostQuery) {
    return this.queryBus.execute(query);
  }

  //Update Post
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update post' })
  @Patch('update-post')
  async updatePost(@Body() command: UpdatePostCommand, @Request() req) {
    command.userId = req.user.id;
    return this.commandBus.execute(command);
  }

  //Delete post
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete post' })
  @Delete('delete-post/:id')
  async deletePost(@Param('id') id: string, @Request() req) {
    const command = new DeletePostCommand();
    command.postId = id;
    command.userId = req.user.id;
    return this.commandBus.execute(command);
  }
}
