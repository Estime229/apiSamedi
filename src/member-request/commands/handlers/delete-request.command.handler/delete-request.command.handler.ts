import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRequestCommand } from '../../impl/delete-request.command/delete-request.command';
import { DataSource } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';
import { MemberModel } from '../../../models/member.model/member.model';

@CommandHandler(DeleteRequestCommand)
export class DeleteRequestCommandHandler
  implements ICommandHandler<DeleteRequestCommand>
{
  constructor(private readonly dataSource: DataSource) {}
  private readonly logger = new Logger(DeleteRequestCommand.name);

  /**
   * Delete request
   * 1 - //check if request exist
   * 2 - // delete request
   */

  async execute(command: DeleteRequestCommand): Promise<any> {
    try {
      //check if request exist
      const request = await this.dataSource
        .getRepository(MemberModel)
        .findOne({ where: { id: command.id } });

      if (!request) {
        throw new NotFoundException('request not found');
      }

      // delete request
      const deleteRequest = await this.dataSource
        .getRepository(MemberModel)
        .remove(request);

      return {
        data: deleteRequest,
        message: 'request delete successfuly',
      };
    } catch (error) {
      this.logger.error(`Erreur lors de .......`, error.stack);
      throw error;
    }
  }
}
