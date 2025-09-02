import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FollowMeCommand {
  @ApiProperty({
    description: 'Indicates whether the follow is liked or not',
    format: 'boolean',
    example: true,
  })
  @IsNotEmpty()
  isFollow: boolean;

  @ApiProperty({
    description: 'followedId',
    format: 'string',
    example: 'uuid',
  })
  @IsNotEmpty()
  followedId: string;

  followerId?: string;
}
