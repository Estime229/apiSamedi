import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiFile } from './utils/file-utility';
@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  // Read user notification
  @ApiOperation({
    summary: 'Upload file',
  })
  @ApiBearerAuth('SECRET_KEY')
  @Post('create')
  // @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiFile('file')
  async readNotification(@UploadedFile() file) {
    return this.fileService.uploadFile(file);
  }
}
