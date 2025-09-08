import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateWordDto {
  @ApiProperty({
    example: 'Votre texte ici',
    description: 'Texte à insérer dans le fichier Word',
  })
  @IsNotEmpty()
  @IsString()
  text: string;
}
