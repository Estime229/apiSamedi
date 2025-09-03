import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRequestCommand } from '../../impl/create-request.command/create-request.command';
import { DataSource } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';
import { MemberModel } from '../../../models/member.model/member.model';
import { GroupModel } from '../../../../group/models/group.model/group.model';
import { RequestState } from '../../../enums/requestState.type';
import { UserModel } from '../../../../auth/models/user.model/user.model';

@CommandHandler(CreateRequestCommand)
export class CreateRequestCommandHandler
  implements ICommandHandler<CreateRequestCommand>
{
  constructor(private readonly dataSource: DataSource) {}
  private readonly logger = new Logger(CreateRequestCommand.name);

  /**
   * Create Request
   * 1 -check if group exist
   * 2 -change requestState to waiting
   * 3 -save Request
   */

  async execute(command: CreateRequestCommand): Promise<any> {
    try {
      let request = await this.dataSource
        .createQueryBuilder(MemberModel, 'member')
        .getOne();

      request = new MemberModel();
      request.message = command.message;
      // change requestState to waiting
      request.requestState = [RequestState.WAITING];

      //check if group exist
      const group = await this.dataSource
        .getRepository(GroupModel)
        .findOne({ where: { id: command.groupId } });

      if (!group) {
        throw new NotFoundException('group not found');
      }

      request.group = group;

      //check user
      const user = await this.dataSource
        .getRepository(UserModel)
        .findOne({ where: { id: command.userId } });

      request.user = user;

      //save Request
      const saveRequest = await this.dataSource
        .getRepository(MemberModel)
        .save(request);

      return {
        data: saveRequest,
        message: 'request saved successfuly',
      };
    } catch (error) {
      this.logger.error(
        `Erreur lors de la creation de la demande d'hadésion`,
        error.stack,
      );
      throw error;
    }
  }
}
