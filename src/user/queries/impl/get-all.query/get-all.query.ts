import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetAllQuery {
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

  @ApiProperty({
    description: 'Search',
    format: 'string',
    required: false,
  })
  @IsOptional()
  search: string;
}
