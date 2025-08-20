import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBasicAuth, ApiOperation } from '@nestjs/swagger';
import { CreateUserCommand } from './commands/impl/create-user.command/create-user.command';
import { LoginCommand } from './commands/impl/login.command/login.command';
import { JwtAuthGuard } from './strategie/jwt-auth.guard';
import { AutMeQuery } from './queries/impl/aut-me.query/aut-me.query';

@ApiBasicAuth('SECRET_KEY')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create user' })
  @Post('register')
  async createUser(@Body() body: CreateUserCommand) {
    return this.commandBus.execute(body);
  }

  @ApiOperation({ summary: 'login user' })
  @Post('login')
  async login(@Body() body: LoginCommand) {
    return this.commandBus.execute(body);
  }

  //auth me
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user' })
  @Get('me')
  async getMe(@Query() query: AutMeQuery, @Request() req) {
    query.userId = req.user.id;
    console.log('Query:', query.userId);
    return this.queryBus.execute(query);
  }
}
