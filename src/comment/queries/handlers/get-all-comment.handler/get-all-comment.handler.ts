import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllCommentQuery } from '../../impl/get-all-comment.query/get-all-comment.query';
import { DataSource } from 'typeorm';
import { CommentModel } from '../../../models/comment.model/comment.model';

@QueryHandler(GetAllCommentQuery)
export class GetAllCommentHandler implements IQueryHandler<GetAllCommentQuery> {
  constructor(private readonly dataSource: DataSource) {}

  async execute(query: GetAllCommentQuery): Promise<any> {
    const allcomments = this.dataSource
      .createQueryBuilder(CommentModel, 'comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.post', 'post')
      .orderBy('comment.created_at', 'DESC')
      .select();

    // Get total
    const total = await allcomments.getCount();

    // Add pagination
    allcomments.skip((query.page - 1) * query.limit);
    allcomments.take(query.limit);

    // Return all comments
    const comments = await allcomments.getMany();

    return { total, comments };
  }
}
