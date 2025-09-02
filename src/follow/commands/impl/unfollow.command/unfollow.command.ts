import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UnfollowCommand {
  @ApiProperty({
    description: 'You followId',
    format: 'string',
    example: 'uuid',
  })
  @IsNotEmpty()
  followId: number;

  @ApiProperty({
    description: 'You Id',
    format: 'string',
    example: 'uuid',
  })
  @IsNotEmpty()
  followedId: string;
  userId: string;
}
