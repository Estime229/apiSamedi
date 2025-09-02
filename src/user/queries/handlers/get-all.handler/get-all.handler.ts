import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllQuery } from '../../impl/get-all.query/get-all.query';
import { DataSource } from 'typeorm';
import { UserModel } from '../../../../auth/models/user.model/user.model';

@QueryHandler(GetAllQuery)
export class GetAllHandler implements IQueryHandler<GetAllQuery> {
  constructor(private dataSource: DataSource) {}
  async execute(query: GetAllQuery): Promise<any> {
    /**
     * Get all users
     * 1 - Get all users
     * 2 - Add pagination
     * 3 - Return all users
     */

    // const { limit, page, search } = query;

    const users = this.dataSource
      .createQueryBuilder(UserModel, 'user')
      .orderBy('user.created_at', 'DESC')
      .select();

    // Add search
    if (query.search && query.search.split(' ').length == 1) {
      query.search = query.search.toLowerCase();
      // console.log('query.search', query.search);
      users.andWhere(
        'LOWER(user.username) LIKE LOWER(:search) OR LOWER(user.email) LIKE LOWER(:search) OR LOWER(user.username) LIKE LOWER(:search)',
        {
          search: `%${query.search}%`,
        },
      );
    }

    // Get total
    const total = await users.getCount();

    // Add pagination
    users.skip((query.page - 1) * query.limit);
    users.take(query.limit);

    // Return all users
    const result = await users.getMany();
    return {
      total,
      data: result,
      page: query.page,
      limit: query.limit,
    };
  }
}
