import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FindUserByGroupCommand } from '../../impl/find-user-by-group.command/find-user-by-group.command';
import { DataSource } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';
import { GroupModel } from 'src/group/models/group.model/group.model';

@CommandHandler(FindUserByGroupCommand)
export class FindUserByGroupCommandHandler
  implements ICommandHandler<FindUserByGroupCommand>
{
  constructor(private readonly dataSource: DataSource) {}
  private readonly logger = new Logger(FindUserByGroupCommand.name);

  async execute(command: FindUserByGroupCommand): Promise<any> {
    try {
      let { page, limit } = command;
      page = Number(page) || 1;
      limit = Number(limit) || 10;

      //check if group exist
      const group = this.dataSource
        .createQueryBuilder(GroupModel, 'group')
        .orderBy('group.created_at', 'DESC')
        .leftJoinAndSelect('group.members', 'members')
        .where('group.id = :id', { id: command.groupId })
        .leftJoinAndSelect('members.user', 'user')
        .select();

      if (!group) {
        throw new NotFoundException('group not found');
      }

      // Get total
      const total = await group.getCount();

      // Add pagination
      group.skip((page - 1) * limit);
      group.take(limit);

      // Return all group
      const result = await group.getMany();

      return {
        total,
        data: result,
        page: page,
        limit: limit,
      };
    } catch (error) {
      this.logger.error(`Erreur lors de .......`, error.stack);
      throw error;
    }
  }
}
