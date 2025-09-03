import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { GetAllQuery } from './queries/impl/get-all.query/get-all.query';

@ApiBasicAuth('SECRET_KEY')
@Controller('group')
export class GroupController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}


  //Create Group
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create Group' })
  @Post('create-group')
  createGroup(@Body() command: CreateGroupCommand, @Request() req) {
    command.userId = req.user.id;
    return this.commandBus.execute(command);
  }

  //Update Group
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update Group' })
  @Patch('update-group')
  update(@Request() req, @Body() command: UpdateGroupCommand) {
    command.userId = req.user.id;
    return this.commandBus.execute(command);
  }


  //Delete Group
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete Group' })
  @Delete('delete-group/:id')
  delete(@Param('id') id: string, @Request() req) {
    const command = new DeleteGroupCommand();
    command.id = id;
    command.userId = req.user.id;
    return this.commandBus.execute(command);
  }

  //Get all groups
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all groups' })
  @Get('all-groups')
  getAllGroups(@Query() query: GetAllQuery) {
    return this.queryBus.execute(query);
  }
}
