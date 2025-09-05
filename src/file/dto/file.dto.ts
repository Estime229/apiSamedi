import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FileDto {
  @ApiProperty({
    type: File,
    required: true,
  })
  @IsNotEmpty()
  file: any;
}
