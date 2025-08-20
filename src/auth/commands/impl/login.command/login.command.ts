import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginCommand {
  @ApiProperty({
    description: 'You email',
    format: 'string',
    example: 'mohamed@gmail.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'You pass',
    format: 'string',
    example: 'mohamed@123',
  })
  @IsNotEmpty()
  password: string;
}
