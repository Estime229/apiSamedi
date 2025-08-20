import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePostCommand {
  @ApiProperty({
    description: 'You title',
    format: 'string',
    example: 'my first post',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'You body',
    format: 'string',
    example: 'this is my first body',
  })
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    description: 'You postId',
    format: 'string',
    example: 'gjhgjkjhhjwd-wdwjdkgjwhd-wdnbm',
  })
  @IsNotEmpty()
  postId: string;

  userId: string;
}
