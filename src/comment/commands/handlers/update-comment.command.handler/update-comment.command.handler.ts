import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCommentCommand } from '../../impl/update-comment.command/update-comment.command';
import { DataSource } from 'typeorm';
import { CommentModel } from '../../../models/comment.model/comment.model';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentCommandHandler
  implements ICommandHandler<UpdateCommentCommand>
{
  /**
   * Update comment
   * 1 - Update an existing comment
   * 2 - Verify if the comment exists
   * 3 - Check if the user is authorized to update the comment
   */

  constructor(private readonly dataSource: DataSource) {}

  async execute(command: UpdateCommentCommand): Promise<any> {
    const { userId, commentId, content } = command;
    //verify if comment exist
    const comment = await this.dataSource
      .createQueryBuilder(CommentModel, 'comment')
      .where('comment.id = :id', { id: commentId })
      .leftJoinAndSelect('comment.user', 'user')
      .getOne();

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    // verify if userId exist
    if (comment.user.id !== userId) {
      throw new NotFoundException(
        'You are not authorized to update this comment',
      );
    }

    // update comment
    comment.content = content;
    await this.dataSource.getRepository(CommentModel).save(comment);

    return {
      data: comment,
      message: 'Comment updated successfully',
    };
  }
}
