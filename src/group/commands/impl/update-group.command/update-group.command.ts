import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { State } from '../../../enums/state.type';

export class UpdateGroupCommand {
  @ApiProperty({
    description: 'You groupName',
    format: 'string',
    example: 'Tics Mood',
  })
  @IsOptional()
  groupName: string;

  @ApiProperty({
    description: 'You groupDesc',
    format: 'string',
    example: 'Tics Mood',
  })
  @IsOptional()
  groupDesc: string;

  @ApiProperty({
    description: 'You groupDesc',
    format: 'string',
    example: 'Tics Mood',
  })
  @IsNotEmpty()
  groupCategory: string;

  // Group state
  @ApiProperty({
    enum: State,
    isArray: true,
  })
  @IsEnum(State, {
    each: true,
  })
  @IsNotEmpty()
  states: State[];

  @ApiProperty({
    description: 'You groupId',
    format: 'string',
    example: 'uuid',
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'You groupUrl',
    format: 'string',
    example: 'https://example.com/my-first-post',
  })
  @IsNotEmpty()
  groupUrl: string;

  userId: string;
}
