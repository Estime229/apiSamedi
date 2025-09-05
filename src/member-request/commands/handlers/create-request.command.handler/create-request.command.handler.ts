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
      // Vérifier si une demande existe déjà pour ce user/groupe
      let existingRequest = await this.dataSource
        .getRepository(MemberModel)
        .findOne({
          where: {
            user: { id: command.userId },
            group: { id: command.groupId },
          },
        });

      if (existingRequest) {
        return {
          data: existingRequest,
          message:
            'Une demande existe déjà pour cet utilisateur dans ce groupe.',
        };
      }

      existingRequest = new MemberModel();
      existingRequest.message = command.message;
      // change requestState to waiting
      existingRequest.requestState = [RequestState.WAITING];

      //check if group exist
      const group = await this.dataSource
        .getRepository(GroupModel)
        .findOne({ where: { id: command.groupId } });

      if (!group) {
        throw new NotFoundException('group not found');
      }

      existingRequest.group = group;

      //check user
      const user = await this.dataSource
        .getRepository(UserModel)
        .findOne({ where: { id: command.userId } });

      existingRequest.user = user;

      //save Request
      const saveRequest = await this.dataSource
        .getRepository(MemberModel)
        .save(existingRequest);

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
