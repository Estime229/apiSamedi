import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AutMeQuery } from '../../impl/aut-me.query/aut-me.query';
import { DataSource } from 'typeorm';
import { UserModel } from '../../../models/user.model/user.model'; // chemin correct si la structure est src/auth/queries/handlers/aut-me.handler/aut-me.handler.ts

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
      .leftJoinAndSelect('user.following', 'follow')
      .leftJoinAndSelect('user.groups', 'group')
      .getOne();

    return user;
  }
}
