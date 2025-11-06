import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FindFollowerQuery {
  @ApiProperty({
    description: 'You followId',
    format: 'string',
    example: 'uuid',
  })
  @IsNotEmpty()
  followId: number;
}
