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

  @ApiProperty({
    description: 'You userUrl',
    format: 'string',
    example: 'https://example.com/my-first-post',
  })
  @IsNotEmpty()
  userUrl: string;

  id: string;
}
