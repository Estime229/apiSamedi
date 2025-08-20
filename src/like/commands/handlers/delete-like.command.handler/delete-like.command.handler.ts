import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteLikeCommand } from '../../impl/delete-like.command/delete-like.command';
import { DataSource } from 'typeorm';
import {
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LikeModel } from 'src/like/models/like.model/like.model';

@CommandHandler(DeleteLikeCommand)
export class DeleteLikeCommandHandler
  implements ICommandHandler<DeleteLikeCommand>
{
  private readonly logger = new Logger(DeleteLikeCommand.name);

  constructor(private readonly dataSource: DataSource) {}
  /**
   * Delete like
   * 1 -verify is like exist
   * 2 -verify if user exist
   * 3 -delete like
   */
  async execute(command: DeleteLikeCommand): Promise<any> {
    const { userId, likeId } = command;
    try {
      const like = await this.dataSource
        .createQueryBuilder(LikeModel, 'like')
        .where('like.id = :likeId', { likeId: likeId })
        .leftJoinAndSelect('like.user', 'user')
        .getOne();

      console.log('likeId', likeId);

      //verify is like exist
      if (!like) {
        throw new NotFoundException('like not found');
      }

      //verify if user exist

      if (like && like.user.id !== userId) {
        throw new UnauthorizedException('user not authorize to this action');
      }

      //delete like
      await this.dataSource.getRepository(LikeModel).delete(likeId);

      return {
        data: like,
        message: 'like deleted successfly',
      };
    } catch (error) {
      this.logger.error(`Erreur lors de la suppression du like`, error.stack);
      throw error;
    }
  }
}
