import { Module } from '@nestjs/common';
import { MemberRequestController } from './member-request.controller';

@Module({
  controllers: [MemberRequestController]
})
export class MemberRequestModule {}
