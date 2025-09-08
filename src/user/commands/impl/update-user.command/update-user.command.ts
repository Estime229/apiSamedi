import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty,IsOptional } from 'class-validator';

export class UpdateUserCommand {
  @ApiProperty({
    description: 'You email',
    format: 'string',
    example: 'xxxxxx@gmail.com',
  })
  @IsOptional()
  password: string;

  @ApiProperty({
    description: 'You email',
    format: 'string',
    example: 'xxxxxx@gmail.com',
  })
  @IsOptional()
  username: string;

  @ApiProperty({
    description: 'You userUrl',
    format: 'string',
    example: 'https://example.com/my-first-post',
  })
  @IsOptional()
  userUrl: string;

  id: string;
}
