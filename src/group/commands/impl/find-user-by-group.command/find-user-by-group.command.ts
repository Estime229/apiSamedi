import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class FindUserByGroupCommand {
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

  @ApiProperty({
    description: 'You groupId',
    format: 'string',
    example: 'gjhgjkjhhjwd-wdwjdkgjwhd-wdnbm',
  })
  @IsNotEmpty()
  groupId: string;
}
