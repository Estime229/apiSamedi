import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteGroupCommand {
  @ApiProperty({
    description: 'You groupId',
    format: 'string',
    example: 'uuid',
  })
  @IsNotEmpty()
  id: string;

  userId: string;
}
