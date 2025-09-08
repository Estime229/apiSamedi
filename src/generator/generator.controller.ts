import { Controller, Post, Body, Res } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GenerateWordDto } from './dto/generate-word.dto';

@Controller('generator')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {}

  @Post('word')
  async generateWord(@Body() dto: GenerateWordDto, @Res() res) {
    const buffer = await this.generatorService.generateWordFile(dto.text);
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=document.docx');
    res.end(buffer);
  }
}
