import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserCommand {
  @ApiProperty({
    description: 'You email',
    format: 'string',
    example: 'mohamed@gmail.com',
  })
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    description: 'You email',
    format: 'string',
    example: 'mohamed@gmail.com',
  })
  @IsNotEmpty()
  password: string;
  @ApiProperty({
    description: 'You email',
    format: 'string',
    example: 'mohamed@gmail.com',
  })
  @IsNotEmpty()
  username: string;
}
