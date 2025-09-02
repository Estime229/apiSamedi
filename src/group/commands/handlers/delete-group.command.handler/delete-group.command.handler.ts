import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteGroupCommand } from '../../impl/delete-group.command/delete-group.command';
import { DataSource } from 'typeorm';
import { GroupModel } from '../../../models/group.model/group.model';
import {
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@CommandHandler(DeleteGroupCommand)
export class DeleteGroupCommandHandler
  implements ICommandHandler<DeleteGroupCommand>
{
  private readonly logger = new Logger(DeleteGroupCommand.name);

  constructor(private readonly dataSource: DataSource) {}

  /**
   * title
   * 1 -
   * 2 -
   * 3 -
   */

  async execute(command: DeleteGroupCommand): Promise<any> {
    try {
      //check if Group exist
      const group = await this.dataSource.getRepository(GroupModel).findOne({
        where: { id: command.id },
        relations: ['user'],
      });

      if (!group) {
        throw new NotFoundException('group not found');
      }

      // check if userId is owner

      if (group && command.userId !== group.user.id) {
        throw new UnauthorizedException(
          'user not authorize to effect this action',
        );
      }

      // delete group
      await this.dataSource.getRepository(GroupModel).remove(group);
      return {
        message: 'group delected successfly',
      };
    } catch (error) {
      this.logger.error(`Erreur lors de le suppression`, error.stack);
      throw error;
    }
  }
}
