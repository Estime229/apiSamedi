import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserCommand {
  @ApiProperty({
    description: 'You email',
    format: 'string',
    example: 'xxxxxx@gmail.com',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'You email',
    format: 'string',
    example: 'xxxxxx@gmail.com',
  })
  @IsNotEmpty()
  username: string;

  id: string;
}
