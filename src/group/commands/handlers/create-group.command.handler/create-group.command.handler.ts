import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateGroupCommand } from '../../impl/create-group.command/create-group.command';
import { DataSource } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';
import { GroupModel } from 'src/group/models/group.model/group.model';
import { UserModel } from 'src/auth/models/user.model/user.model';

@CommandHandler(CreateGroupCommand)
export class CreateGroupCommandHandler
  implements ICommandHandler<CreateGroupCommand>
{
  private readonly logger = new Logger(CreateGroupCommand.name);

  constructor(private readonly dataSource: DataSource) {}

  /**
   * CreateGroup
   * 1 -create GroupModel object
   * 2 -check if user exist
   * 3 - save group
   */

  async execute(command: CreateGroupCommand): Promise<any> {
    try {
      let group = await this.dataSource
        .createQueryBuilder(GroupModel, 'group')
        .getOne();

      //new GroupModel object
      group = new GroupModel();
      group.groupName = command.groupName;
      group.groupDesc = command.groupDesc;
      group.groupState = command.states;

      const user = await this.dataSource
        .getRepository(UserModel)
        .findOne({ where: { id: command.userId } });

      if (!user) {
        throw new NotFoundException('user not found');
      }

      group.user = user;

      //save groupe
      const savedGroup = await this.dataSource
        .getRepository(GroupModel)
        .save(group);

      return {
        data: savedGroup,
        message: 'group saved successfly',
      };
    } catch (error) {
      this.logger.error(
        `Erreur lors de l'enregistrement du groupe`,
        error.stack,
      );
      throw error;
    }
  }
}
