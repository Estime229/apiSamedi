import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPostQuery } from '../../impl/get-all-post.query/get-all-post.query';
import { DataSource } from 'typeorm';
import { PostModel } from 'src/post/models/post.model/post.model';

@QueryHandler(GetAllPostQuery)
export class GetAllPostHandler implements IQueryHandler<GetAllPostQuery> {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * title
   * 1 - Get all posts
   * 2 - Get post by ID
   * 3 - Create a new post
   */

  async execute(query: GetAllPostQuery): Promise<any> {
    // Get all Post
    const request = this.dataSource
      .createQueryBuilder(PostModel, 'post')
      .orderBy('post.created_at', 'DESC')
      .leftJoinAndSelect('post.user', 'user')
      .select();

    // Get total
    const total = await request.getCount();

    // Add pagination
    request.skip((query.page - 1) * query.limit);
    request.take(query.limit);

    // Return all post
    const post = await request.getMany();

    return {
      total,
      data: post,
      page: query.page,
      limit: query.limit,
    };
  }
}
