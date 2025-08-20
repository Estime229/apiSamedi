import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AutMeQuery } from '../../impl/aut-me.query/aut-me.query';
import { DataSource } from 'typeorm';
import { UserModel } from 'src/auth/models/user.model/user.model';

@QueryHandler(AutMeQuery)
export class AutMeHandler implements IQueryHandler<AutMeQuery> {
  constructor(private readonly dataSource: DataSource) {}

  async execute(query: AutMeQuery): Promise<any> {
    const user = await this.dataSource
      .createQueryBuilder(UserModel, 'user')
      .where({ id: query.userId })
      .leftJoinAndSelect('user.posts', 'post')
      .leftJoinAndSelect('user.comments', 'comment')
      .leftJoinAndSelect('user.likes', 'like')
      .getOne();

    return user;
  }
}
