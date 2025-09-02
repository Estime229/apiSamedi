import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnfollowCommand } from '../../impl/unfollow.command/unfollow.command';
import { DataSource } from 'typeorm';
import {
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { FollowModel } from '../../../models/follow.model/follow.model';

@CommandHandler(UnfollowCommand)
export class UnfollowCommandHandler
  implements ICommandHandler<UnfollowCommand>
{
  private readonly logger = new Logger(UnfollowCommand.name);

  /**
   * title
   * 1 -
   * 2 -
   * 3 -
   */

  constructor(private readonly dataSource: DataSource) {}

  async execute(command: UnfollowCommand): Promise<any> {
    try {
      // check if follow exist
      const follow = await this.dataSource
        .getRepository(FollowModel)
        .findOne({ where: { id: command.followId } });

      if (!follow) {
        throw new NotFoundException('ce follow nexiste pas');
      }

      console.log('followedId', command.followedId);
      console.log('userId', command.userId);

      //check if userId = followedId
      if (follow && command.followedId !== command.userId) {
        throw new UnauthorizedException(
          'vous netes pas autorisé a effectuer cette action',
        );
      }

      follow.isFollow = false;

      const existingFollow = await this.dataSource
        .getRepository(FollowModel)
        .save(follow);

      return {
        data: existingFollow,
        message: 'unfollow successfly',
      };
    } catch (error) {
      this.logger.error(`Erreur lors du unfollow`, error.stack);
      throw error;
    }
  }
}
