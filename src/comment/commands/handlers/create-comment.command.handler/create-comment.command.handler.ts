import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCommentCommand } from '../../impl/create-comment.command/create-comment.command';
import { DataSource } from 'typeorm';
import { ModerationService } from '../../../../moderation/moderation.service';
import { CommentModel } from '../../../models/comment.model/comment.model';
import { UserModel } from '../../../../auth/models/user.model/user.model';
import { NotFoundException } from '@nestjs/common';
import { PostModel } from '../../../../post/models/post.model/post.model';

@CommandHandler(CreateCommentCommand)
export class CreateCommentCommandHandler
  implements ICommandHandler<CreateCommentCommand>
{
  /**
   * Create comment
   * 1 - Verify if the user exists
   * 2 - Verify if the post exists
   * 3 - Create the comment
   */

  constructor(
    private readonly dataSource: DataSource,
    private readonly moderationService: ModerationService,
  ) {}

  async execute(command: CreateCommentCommand): Promise<any> {
    const { postId, content, userId } = command;

    try {
      let comment = await this.dataSource
        .createQueryBuilder(CommentModel, 'comment')
        .getOne();

      //verify if user && post exist
      comment = new CommentModel();
      comment.content = content;

      // verify if post exist
      const post = await this.dataSource
        .getRepository(PostModel)
        .findOne({ where: { id: postId } });
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      comment.post = post;

      //check user && save user
      const user = await this.dataSource
        .getRepository(UserModel)
        .findOne({ where: { id: userId } });

      comment.user = user;

      // save comment
      const savedComment = await this.dataSource
        .getRepository(CommentModel)
        .save(comment);

      // Fire-and-forget moderation scan to avoid blocking request path.
      // If high severity, ModerationService will ban the user.
      setImmediate(() => {
        try {
          this.moderationService.scanAndEnforce({
            text: savedComment.content,
            userId: user?.id,
            postId: post?.id,
          });
        } catch (e) {
          // Do not crash main flow on moderation errors
          console.error('Moderation background error:', e?.message || e);
        }
      });

      return {
        data: savedComment,
        message: 'Comment created successfully',
      };
    } catch (error) {
      console.error('Error creating comment:', error);
      throw new Error('Error creating comment');
    }
  }
}
