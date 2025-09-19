import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindMemberQuery } from '../../impl/find-member.query/find-member.query';
import { DataSource } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';
import { MemberModel } from 'src/member-request/models/member.model/member.model';

@QueryHandler(FindMemberQuery)
export class FindMemberHandler implements IQueryHandler<FindMemberQuery> {
  constructor(private readonly dataSource: DataSource) {}
  private readonly logger = new Logger(FindMemberQuery.name);

  async execute(query: FindMemberQuery): Promise<any> {
    try {
      const { id } = query;
      const request = await this.dataSource
        .createQueryBuilder(MemberModel, 'member')
        .where({ id: query.id })
        .leftJoinAndSelect('member.user', 'user')
        .getOne();

      if (!request) {
        throw new NotFoundException(`member request ${id} not found`);
      }
      return {
        data: request,
      };
    } catch (error) {
      this.logger.error(
        `Erreur lors de la recuperation du request ${query.id}`,
        error.stack,
      );
      throw error;
    }
  }
}
