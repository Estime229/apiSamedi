import {
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { UpdateGroupCommand } from '../../impl/update-group.command/update-group.command';
import { GroupModel } from 'src/group/models/group.model/group.model';

@CommandHandler(UpdateGroupCommand)
export class UpdateGroupCommandHandler
  implements ICommandHandler<UpdateGroupCommand>
{
  private readonly logger = new Logger(UpdateGroupCommand.name);

  /**
   * Update Group
   * 1 -check if group exist
   * 2 -check if userId is owner
   * 3 -save group
   */
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: UpdateGroupCommand): Promise<any> {
    try {
      //check if group exist
      const group = await this.dataSource
        .createQueryBuilder(GroupModel, 'group')
        .where('group.id = :id', { id: command.id })
        .leftJoinAndSelect('group.user', 'user')
        .getOne();

      if (!group) {
        throw new NotFoundException('group not found');
      }

      //check if userId is owner
      if (group && command.userId !== group.user.id) {
        throw new UnauthorizedException('user not autorized');
      }

      group.groupDesc = command.groupDesc;
      group.groupName = command.groupName;
      group.groupState = command.states;
      group.groupCategory = command.groupCategory;

      //save group
      const savedGroup = await this.dataSource
        .getRepository(GroupModel)
        .save(group);

      return {
        data: savedGroup,
        message: 'group updated successfly',
      };
    } catch (error) {
      this.logger.error(`Erreur lors de la creation`, error.stack);
      throw error;
    }
  }
}
