import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLikeCommand {
  @ApiProperty({
    description: 'Indicates whether the post is liked or not',
    format: 'boolean',
    example: true,
  })
  @IsNotEmpty()
  isLiked: boolean;

  @ApiProperty({
    description: 'You postId',
    format: 'string',
    example: 'uuid',
  })
  @IsNotEmpty()
  postId: string;

  userId?: string;
}
