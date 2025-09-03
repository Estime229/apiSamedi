import { Module } from '@nestjs/common';
import { MemberRequestController } from './member-request.controller';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { MemberModel } from './models/member.model/member.model';
import { CreateRequestCommandHandler } from './commands/handlers/create-request.command.handler/create-request.command.handler';
import { UpdateRequestCommandHandler } from './commands/handlers/update-request.command.handler/update-request.command.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([MemberModel]), // Initialise JWT module
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [MemberRequestController],
  providers: [CreateRequestCommandHandler, UpdateRequestCommandHandler],
})
export class MemberRequestModule {}
