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

  @ApiProperty({
    description: 'You userId',
    format: 'string',
    example: 'uuid',
  })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'You postId',
    format: 'string',
    example: 'uuid',
  })
  @IsNotEmpty()
  postId: string;
}
