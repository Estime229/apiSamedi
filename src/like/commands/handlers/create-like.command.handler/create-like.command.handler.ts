import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLikeCommand } from '../../impl/create-like.command/create-like.command';
import { DataSource } from 'typeorm';
import { LikeModel } from '../../../models/like.model/like.model';
import { UserModel } from '../../../../auth/models/user.model/user.model';
import { Logger, NotFoundException } from '@nestjs/common';
import { PostModel } from '../../../../post/models/post.model/post.model';

@CommandHandler(CreateLikeCommand)
export class CreateLikeCommandHandler
  implements ICommandHandler<CreateLikeCommand>
{
  private readonly logger = new Logger(CreateLikeCommand.name);

  constructor(private readonly dataSource: DataSource) {}

  async execute(command: CreateLikeCommand): Promise<any> {
    const { postId, userId } = command;
    try {
      let like = await this.dataSource
        .createQueryBuilder(LikeModel, 'like')
        .getOne();

      like = new LikeModel();
      like.isLiked = true;
      // verify if user exist
      const user = await this.dataSource
        .getRepository(UserModel)
        .findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('user not found');
      }
      like.user = user;

      //verify if post exist

      const post = await this.dataSource
        .getRepository(PostModel)
        .findOne({ where: { id: postId } });

      if (!post) {
        throw new NotFoundException('post not found');
      }

      like.post = post;

      //save like

      await this.dataSource.getRepository(LikeModel).save(like);

      return {
        message: 'like saved successfly',
      };
    } catch (error) {
      this.logger.error(`Erreur lors de .......`, error.stack);
      throw error;
    }
  }
}
