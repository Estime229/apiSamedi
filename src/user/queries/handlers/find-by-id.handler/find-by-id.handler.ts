import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindByIdQuery } from '../../impl/find-by-id.query/find-by-id.query';
import { DataSource } from 'typeorm';
import { UserModel } from 'src/auth/models/user.model/user.model';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(FindByIdQuery)
export class FindByIdHandler implements IQueryHandler<FindByIdQuery> {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Get user by id
   * 1 - Find user by id
   * 2 - If not found, throw NotFoundException
   * 3 - Return user data
   */

  async execute(query: FindByIdQuery): Promise<any> {
    const user = await this.dataSource
      .createQueryBuilder(UserModel, 'user')
      .select()
      .where('user.id = :id', { id: query.id })
      .getOne();

    //check is user exist
    if (!user) {
      throw new NotFoundException('Id not found');
    }
    return { data: user };
  }
}
