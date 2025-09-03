import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { RequestState } from '../../../enums/requestState.type';

export class CreateRequestCommand {
  @ApiProperty({
    description: 'You groupName',
    format: 'string',
    example: 'Tics Mood',
  })
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'You groupId',
    format: 'string',
    example: 'uuid',
  })
  @IsNotEmpty()
  groupId: string;

  userId: string;

  // Group state
  @ApiProperty({
    enum: RequestState,
    isArray: true,
  })
  @IsEnum(RequestState, {
    each: true,
  })
  @IsNotEmpty()
  requestState: RequestState[];
}
