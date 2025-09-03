import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllQuery } from '../../impl/get-all.query/get-all.query';
import { DataSource } from 'typeorm';
import { GroupModel } from 'src/group/models/group.model/group.model';

@QueryHandler(GetAllQuery)
export class GetAllHandler implements IQueryHandler<GetAllQuery> {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Get all users
   * 1 - Get all users
   * 2 - Add pagination
   * 3 - Return all users
   */

  async execute(query: GetAllQuery): Promise<any> {
    const group = this.dataSource
      .createQueryBuilder(GroupModel, 'group')
      .orderBy('group.created_at', 'DESC')
      .leftJoinAndSelect('group.user', 'user')
      .select();

    // Add search
    if (query.search && query.search.split(' ').length == 1) {
      query.search = query.search.toLowerCase();
      // console.log('query.search', query.search);
      group.andWhere(
        'LOWER(group.groupName) LIKE LOWER(:search) OR LOWER(group.groupCategory) LIKE LOWER(:search) OR LOWER(group.groupName) LIKE LOWER(:search)',
        {
          search: `%${query.search}%`,
        },
      );
    }

    // Get total
    const total = await group.getCount();

    // Add pagination
    group.skip((query.page - 1) * query.limit);
    group.take(query.limit);

    // Return all group
    const result = await group.getMany();
    return {
      total,
      data: result,
      page: query.page,
      limit: query.limit,
    };
  }
}
