import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCommentCommand } from '../../impl/delete-comment.command/delete-comment.command';
import { DataSource } from 'typeorm';
import { CommentModel } from '../../../models/comment.model/comment.model';
import { NotFoundException } from '@nestjs/common';

CommandHandler(DeleteCommentCommand);
export class DeleteCommentCommandHandler
  implements ICommandHandler<DeleteCommentCommand>
{
  /**
   * Delete a comment
   * 1 - Handle the deletion of a comment
   * 2 - Verify if the comment exists
   * 3 - Check if the user is authorized to delete the comment
   */

  constructor(private readonly dataSource: DataSource) {}

  async execute(command: DeleteCommentCommand): Promise<any> {
    const { commentId, userId } = command;
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

    await this.dataSource.getRepository(CommentModel).delete(commentId);

    return {
      data: 'comment delete successfly',
    };
  }
}
