import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostCommand {
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
    description: 'You postUrl',
    format: 'string',
    example: 'https://example.com/my-first-post',
  })
  @IsNotEmpty()
  postUrl: string;

  userId: string;
}
