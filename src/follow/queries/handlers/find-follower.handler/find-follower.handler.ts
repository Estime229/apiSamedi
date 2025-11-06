import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindFollowerQuery } from '../../impl/find-follower.query/find-follower.query';
import { DataSource } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { FollowModel } from 'src/follow/models/follow.model/follow.model';

@QueryHandler(FindFollowerQuery)
export class FindFollowerHandler implements IQueryHandler<FindFollowerQuery> {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Get follower by follow id
   * 1 - check if follow exist
   * 2 - If not found, throw NotFoundException
   * 3 - Return user data
   */

  async execute(query: FindFollowerQuery): Promise<any> {
    //check if follow exist
    const follow = await this.dataSource
      .createQueryBuilder(FollowModel, 'follow')
      .select()
      .where('follow.id = :id', { id: query.followId })
      .leftJoinAndSelect('follow.follower', 'follower')
      //   .leftJoinAndSelect('follow.followed', 'followed')
      .getOne();

    if (!follow) {
      throw new NotFoundException('Follow not found');
    }
    return {
      data: follow,
    };
  }
}
