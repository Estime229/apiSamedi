import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { State } from 'src/group/eums/state.type';

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
    description: 'You groupId',
    format: 'string',
    example: 'uuid',
  })
  @IsNotEmpty()
  id: string;

  userId: string;
}
