import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePostCommand } from '../../impl/delete-post.command/delete-post.command';
import { DataSource } from 'typeorm';
import { PostModel } from '../../../models/post.model/post.model';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

@CommandHandler(DeletePostCommand)
export class DeletePostCommandHandler
  implements ICommandHandler<DeletePostCommand>
{
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Delete post
   * 1 - Get post by ID
   * 2 - Delete post
   * 3 - Check authorization
   */

  async execute(command: DeletePostCommand): Promise<any> {
    const { postId, userId } = command;

    const post = await this.dataSource
      .createQueryBuilder(PostModel, 'post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.id = :postId', { postId })
      .getOne();

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (!post.user || post.user.id !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this post',
      );
    }

    // Save updated post
    await this.dataSource.getRepository(PostModel).delete(postId);

    return {
      data: post,
      message: 'Post deleted successfully',
    };
  }
}
