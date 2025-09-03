import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { RequestState } from 'src/member-request/enums/requestState.type';

export class UpdateRequestCommand {
  @ApiProperty({
    enum: RequestState,
    isArray: true,
  })
  @IsEnum(RequestState, {
    each: true,
  })
  @IsNotEmpty()
  requestState: RequestState[];

  @ApiProperty({
    description: 'You requestId',
    format: 'string',
    example: 'uuid',
  })
  @IsNotEmpty()
  requestId: string;

  userId: string;
}
