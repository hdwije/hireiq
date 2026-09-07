import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateDocumentDto } from './dtos';

@Injectable()
export class DocumentService {
  constructor(private readonly prisma: PrismaService) {}

  async createDocument({ filename, filePath, tenantId }: CreateDocumentDto) {
    return this.prisma.db.document.create({
      data: { filename, filePath, tenantId },
    });
  }
}
