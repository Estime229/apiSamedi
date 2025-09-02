import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FollowMeCommand } from '../../impl/follow-me.command/follow-me.command';
import { DataSource } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';
import { UserModel } from 'src/auth/models/user.model/user.model';
import { FollowModel } from 'src/follow/models/follow.model/follow.model';
import { timeStamp } from 'console';

@CommandHandler(FollowMeCommand)
export class FollowMeCommandHandler
  implements ICommandHandler<FollowMeCommand>
{
  private readonly logger = new Logger(FollowMeCommand.name);
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Follow user
   * 1 -check if Followed exist
   * 2 -check if Follower exist
   * 3 -save follow
   */

  async execute(command: FollowMeCommand): Promise<any> {
    try {
      // check if Followed exist
      const existingUser = await this.dataSource
        .getRepository(UserModel)
        .findOne({ where: { id: command.followedId } });
      if (!existingUser) {
        throw new NotFoundException('followedId not found');
      }

      let follow = await this.dataSource
        .createQueryBuilder(FollowModel, 'follow')
        .getOne();

      follow = new FollowModel();
      follow.isFollow = true;
      follow.followed = existingUser;

      // check if Follower exist
      const existingFollower = await this.dataSource
        .getRepository(UserModel)
        .findOne({ where: { id: command.followerId } });
      if (!existingFollower) {
        throw new NotFoundException('followedId not found');
      }
      follow.follower = existingFollower;

      const followMe = await this.dataSource
        .getRepository(FollowModel)
        .save(follow);

      return {
        data: followMe,
        message: 'follow succesfly',
      };
    } catch (error) {
      this.logger.error(`Erreur lors du follow.`, error.stack);
      throw error;
    }
  }
}
