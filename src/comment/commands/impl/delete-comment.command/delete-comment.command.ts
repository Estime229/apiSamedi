import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteCommentCommand {
  userId: string;

  @ApiProperty({
    description: 'You postId',
    format: 'string',
    example: 'uuid',
  })
  @IsNotEmpty()
  commentId: string;
}
