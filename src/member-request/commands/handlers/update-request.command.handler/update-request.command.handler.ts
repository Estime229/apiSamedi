import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRequestCommand } from '../../impl/update-request.command/update-request.command';
import { DataSource } from 'typeorm';
import {
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MemberModel } from '../../../models/member.model/member.model';

@CommandHandler(UpdateRequestCommand)
export class UpdateRequestCommandHandler
  implements ICommandHandler<UpdateRequestCommand>
{
  constructor(private readonly dataSource: DataSource) {}
  private readonly logger = new Logger(UpdateRequestCommand.name);

  /**
   * Update Member request
   * 1 -check if request exist
   * 2 -check if userId === owner group user
   * 3 -update request
   */

  async execute(command: UpdateRequestCommand): Promise<any> {
    try {
      // check if request exist
      const request = await this.dataSource
        .createQueryBuilder(MemberModel, 'member')
        .where('member.id = :requestId', { requestId: command.requestId })
        .leftJoinAndSelect('member.group', 'group')
        .leftJoinAndSelect('group.user', 'groupUser')
        .leftJoinAndSelect('member.user', 'user')
        .getOne();

      if (!request) {
        throw new NotFoundException('request not foound');
      }

      // check if userId === owner group user
      if (request && command.userId !== request.group.user?.id) {
        throw new UnauthorizedException(
          'you are not authorize to effect this action',
        );
      }

      //update request
      request.requestState = command.requestState;

      const updatedRequest = await this.dataSource
        .getRepository(MemberModel)
        .save(request);

      return {
        data: updatedRequest,
        message: 'request updated successfuly',
      };
    } catch (error) {
      this.logger.error(
        `Erreur lors de la mise a jour de la requete`,
        error.stack,
      );
      throw error;
    }
  }
}
