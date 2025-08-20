import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteLikeCommand {
  @ApiProperty({
    description: 'You likeId',
    format: 'string',
    example: 'uuid',
  })
  @IsNotEmpty()
  likeId: string;

  userId?: string;
}
