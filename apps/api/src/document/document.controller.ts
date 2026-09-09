import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../auth/guards';
import { DocumentService } from './document.service';
import type { AuthUser } from '../common/types';
import { CurrentUser } from '../common/decorators';
import { multerConfig } from './configs';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: AuthUser,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');

    return this.documentService.createDocument({
      filename: file.originalname,
      filePath: file.path,
      tenantId: user.tenantId,
    });
  }
}
