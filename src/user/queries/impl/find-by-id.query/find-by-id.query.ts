import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FindByIdQuery {
  @ApiProperty({
    description: 'User Id',
    format: 'string',
    required: true,
  })
  @IsNotEmpty()
  id: string;
}
