import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentCommand {
  @ApiProperty({
    description: 'You comment content',
    format: 'string',
    example: 'This is a comment',
  })
  @IsNotEmpty()
  content: string;

  userId: string;

  @ApiProperty({
    description: 'You postId',
    format: 'string',
    example: 'uuid',
  })
  @IsNotEmpty()
  postId: string;
}
