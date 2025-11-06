import { Module } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../auth/models/user.model/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [ModerationService],
  exports: [ModerationService],
})
export class ModerationModule {}
