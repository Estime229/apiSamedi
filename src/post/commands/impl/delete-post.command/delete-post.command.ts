import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeletePostCommand {
  @ApiProperty({
    description: 'You postId',
    format: 'string',
    example: 'gjhgjkjhhjwd-wdwjdkgjwhd-wdnbm',
  })
  @IsNotEmpty()
  postId: string;

  userId: string;
}
