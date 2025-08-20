import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from '../../impl/create-post.command/create-post.command';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { PostModel } from 'src/post/models/post.model/post.model';
import { UserModel } from 'src/auth/models/user.model/user.model';

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler
  implements ICommandHandler<CreatePostCommand>
{
  private readonly logger = new Logger(CreatePostCommandHandler.name);

  constructor(private readonly dataSource: DataSource) {}

  /**
   * Create a new post
   * 1 - Check if user exists
   * 2 - Create post
   * 3 - Save post
   */

  async execute(command: CreatePostCommand): Promise<any> {
    try {
      let post = await this.dataSource
        .getRepository(PostModel)
        .createQueryBuilder('post')
        .getOne();

      // save new Post
      post = new PostModel();
      post.title = command.title;
      post.body = command.body;

      //   check if userId exist
      const user = await this.dataSource.getRepository(UserModel).findOne({
        where: { id: command.userId },
      });

      if (!user) {
        this.logger.error(`Utilisateur non trouvé`);
      }
      post.user = user;

      //  Save post
      await this.dataSource.getRepository(PostModel).save(post);

      return {
        data: post,
        message: 'Post créé avec succès',
      };
    } catch (error) {
      this.logger.error(`Erreur lors de la création du post`, error.stack);
      throw error;
    }
  }
}
