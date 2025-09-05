import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBasicAuth, ApiOperation } from '@nestjs/swagger';
import { GetAllQuery } from './queries/impl/get-all.query/get-all.query';
import { FindByIdQuery } from './queries/impl/find-by-id.query/find-by-id.query';
import { UpdateUserCommand } from './commands/impl/update-user.command/update-user.command';
import { JwtAuthGuard } from '../auth/strategie/jwt-auth.guard';
import { DeleteUserCommand } from './commands/impl/delete-user.command/delete-user.command';

@ApiBasicAuth('SECRET_KEY')
@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  //Get all users
  @ApiOperation({ summary: 'GetAll user' })
  @Get('all-user')
  async createUser(@Query() query: GetAllQuery) {
    return this.queryBus.execute(query);
  }

  //Find user by id
  @ApiOperation({ summary: 'Get user by id' })
  @Post('getById')
  async getUserById(@Query() query: FindByIdQuery) {
    return this.queryBus.execute(query);
  }

  //Update user
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user' })
  @Post('update')
  async updateUser(@Body() command: UpdateUserCommand, @Request() req) {
    command.id = req.user.id;
    // console.log('User ID from request:', req.user.id);
    return this.commandBus.execute(command);
  }

  //Delete user
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user' })
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    const command = new DeleteUserCommand();
    command.id = id;
    return this.commandBus.execute(command);
  }
}
