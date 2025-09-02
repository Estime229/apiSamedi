import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { State } from '../../../enums/state.type';

export class CreateGroupCommand {
  @ApiProperty({
    description: 'You groupName',
    format: 'string',
    example: 'Tics Mood',
  })
  @IsNotEmpty()
  groupName: string;

  @ApiProperty({
    description: 'You groupDesc',
    format: 'string',
    example: 'Tics Mood',
  })
  @IsNotEmpty()
  groupDesc: string;

  @ApiProperty({
    description: 'You groupDesc',
    format: 'string',
    example: 'Tics Mood',
  })
  @IsOptional()
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
    description: 'You userId',
    format: 'string',
    example: 'uuid',
  })
  @IsNotEmpty()
  userId: string;
}
