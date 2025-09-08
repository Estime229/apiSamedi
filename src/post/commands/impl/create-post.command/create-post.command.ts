import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

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
    description: 'You userUrl',
    format: 'string',
    example: 'https://example.com/my-first-post',
  })
  @IsOptional()
  postUrl: string;

  userId: string;
}
