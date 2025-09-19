import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FindMemberQuery {
  @ApiProperty({
    description: 'memeber Id',
    format: 'string',
    required: true,
  })
  @IsNotEmpty()
  id: string;
}
