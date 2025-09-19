import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePostCommand {
  @ApiProperty({
    description: 'You title',
    format: 'string',
    example: 'my first post',
  })
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'You body',
    format: 'string',
    example: 'this is my first body',
  })
  @IsOptional()
  body: string;

  @ApiProperty({
    description: 'You postUrl',
    format: 'string',
    example: 'https://example.com/my-first-post',
  })
  @IsOptional()
  postUrl: string;

  @ApiProperty({
    description: 'You postId',
    format: 'string',
    example: '83d355b5-3738-4b3f-a4ad-490a96cdd3ea',
  })
  @IsNotEmpty()
  postId: string;

  userId: string;
}
