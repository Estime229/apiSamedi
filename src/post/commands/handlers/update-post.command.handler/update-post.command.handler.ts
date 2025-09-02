import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePostCommand } from '../../impl/update-post.command/update-post.command';
import { DataSource } from 'typeorm';
import { PostModel } from '../../../models/post.model/post.model';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(UpdatePostCommand)
export class UpdatePostCommandHandler
  implements ICommandHandler<UpdatePostCommand>
{
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Update post
   * 1 - Get post by ID
   * 2 - Check authorization
   * 3 - Update post
   *
   */

  async execute(command: UpdatePostCommand): Promise<any> {
    const { title, body, postId } = command;

    //    const post = await this.dataSource.getRepository(PostModel).findOne({
    //   where: { id: postId },
    //   relations: ['user'],
    // });

    const post = await this.dataSource
      .createQueryBuilder(PostModel, 'post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.id = :postId', { postId })
      .getOne();

    if (!post) {
      throw new Error('Post not found');
    }

    if (!post.user || post.user.id !== command.userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this post',
      );
    }

    // Update post properties
    post.title = title;
    post.body = body;

    // Save updated post
    await this.dataSource.getRepository(PostModel).save(post);

    return {
      data: post,
      message: 'Post updated successfully',
    };
  }
}
