import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetAllCommentQuery {
  @ApiProperty({
    description: 'Limit',
    type: 'number',
  })
  @IsNotEmpty()
  limit: number;

  @ApiProperty({
    description: 'Page',
    type: 'number',
  })
  @IsNotEmpty()
  page: number;
}
