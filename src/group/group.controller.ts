import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBasicAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategie/jwt-auth.guard';
import { CreateGroupCommand } from './commands/impl/create-group.command/create-group.command';
import { UpdateGroupCommand } from './commands/impl/update-group.command/update-group.command';
import { DeleteGroupCommand } from './commands/impl/delete-group.command/delete-group.command';

@ApiBasicAuth('SECRET_KEY')
@Controller('group')
export class GroupController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create Group' })
  @Post('create-group')
  createGroup(@Body() command: CreateGroupCommand, @Request() req) {
    command.userId = req.user.id;
    return this.commandBus.execute(command);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update Group' })
  @Patch('update-group')
  update(@Request() req, @Body() command: UpdateGroupCommand) {
    command.userId = req.user.id;
    return this.commandBus.execute(command);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete Group' })
  @Delete('delete-group/:id')
  delete(@Param('id') id: string, @Request() req) {
    const command = new DeleteGroupCommand();
    command.id = id;
    command.userId = req.user.id;
    return this.commandBus.execute(command);
  }
}
