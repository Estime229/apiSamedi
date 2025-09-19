import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBasicAuth, ApiOperation } from '@nestjs/swagger';
import { CreateRequestCommand } from './commands/impl/create-request.command/create-request.command';
import { JwtAuthGuard } from '../auth/strategie/jwt-auth.guard';
import { UpdateRequestCommand } from './commands/impl/update-request.command/update-request.command';
import { DeleteRequestCommand } from './commands/impl/delete-request.command/delete-request.command';
import { FindMemberQuery } from './queries/impl/find-member.query/find-member.query';

@ApiBasicAuth('SECRET_KEY')
@Controller('member-request')
export class MemberRequestController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  //Create Request
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create Request' })
  @Post('create-request')
  createRequest(@Body() command: CreateRequestCommand, @Request() req) {
    command.userId = req.user.id;
    return this.commandBus.execute(command);
  }

  //Update Request
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update Request' })
  @Patch('update-request')
  updateRequest(@Body() command: UpdateRequestCommand, @Request() req) {
    command.userId = req.user.id;
    return this.commandBus.execute(command);
  }

  //Delete Request
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete Request' })
  @Delete('delete-request/:id')
  deleteRequest(@Param('id') id: string) {
    const command = new DeleteRequestCommand();
    command.id = id;
    return this.commandBus.execute(command);
  }

  //find request by id
  @ApiOperation({ summary: 'Get user by id' })
  @Post('getById')
  findRequest(@Query() query: FindMemberQuery) {
    return this.queryBus.execute(query);
  }
}
